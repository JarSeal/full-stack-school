require('dotenv').config();
const { ApolloServer, UserInputError, AuthenticationError, gql } = require('apollo-server');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.TOKEN_SECRET;
const Book = require('./models/book');
const Author = require('./models/author');
const User = require('./models/user');

const mongoUrl = process.env.MONGODB_URI;
console.log('connecting to', mongoUrl)

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(() => {
  console.log('connected to MongoDB')
}).catch((error) => {
  console.log('error connection to MongoDB:', error.message)
});

const typeDefs = gql`
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]
  }
  type User {
    username: String!
    favGenre: String
    id: ID!
  }
  type Token {
    value: String!
  }
  type Query {
    authorCount: Int!
    bookCount: Int!
    allBooks(author: String, genre: String): [Book!]
    allAuthors: [Author]
    me: User
  }
  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
    createUser(
      username: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
    newFavorite(
      newFavorite: String!
    ): User
  }
`;

const { v1: uuid } = require('uuid');
const book = require('./models/book');

const resolvers = {
  Query: {
    authorCount: async () => await Author.collection.countDocuments(),
    bookCount: async () => await Book.collection.countDocuments(),
    allBooks: async (root, args) => {
      let findThese = {};
      const argAuthor = args.author;
      const argGenre = args.genre;
      if(argAuthor || argGenre) {
        if(argAuthor) {
          const authorData = await Author.findOne({ name: argAuthor });
          if(authorData) {
            findThese.author = authorData._id;
          } else {
            return [];
          }
        }
        if(argGenre) {
          findThese.genres = { $in: [argGenre] };
        }
      }
      const result = await Book.find(findThese).populate('author', {
        name: 1, born: 1, id: 1
      });
      return result;
    },
    allAuthors: async () => {
      const allOfTheAuthors = await Author.find({});
      const allBooks = await Book.find({});
      return allOfTheAuthors.map(
        a => {
          return {
            name: a.name,
            born: a.born,
            bookCount: allBooks.filter(b => a._id.equals(b.author)).length
          };
        }
      );
    },
    me: (root, args, context) => {
      return context.currentUser;
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser;
      if(!currentUser) {
        throw new AuthenticationError("User needs to be authenticated to add a new book.");
      }
      let bookAuthor = await Author.findOne({ name: args.author }),
        result;
      if(!bookAuthor) {
        const newAuthor = new Author({ name: args.author });
        try {
          bookAuthor = await newAuthor.save();
        } catch (error) {
          let errorMsg = 'Error, could not create new book.';
          if(error.errors && error.errors.name && error.errors.name.kind === 'minlength') {
            errorMsg = `Author name has to be at least ${error.errors.name.properties.minlength} characters in length.`;  
          }
          throw new UserInputError(errorMsg, {
            invalidArgs: args
          });
        }
      }
      try {
        const newBook = new Book({ ...args, author: bookAuthor._id });
        result = await newBook.save();
      } catch (error) {
        let errorMsg = 'Error, could not create new book.';
        if(error.code === 11000) {
          errorMsg = `The book '${args.title}' already exists. The title has to be unique.`;
        } else if(error.errors && error.errors.title && error.errors.title.kind === 'minlength') {
          errorMsg = `Book title has to be at least ${error.errors.title.properties.minlength} characters in length.`;  
        }
        throw new UserInputError(errorMsg, {
          invalidArgs: args
        });
      }
      const fullBook = { ...result._doc, author: {
        name: bookAuthor.name,
        id: bookAuthor._id,
        born: bookAuthor.born
      }};
      return fullBook;
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser;
      if(!currentUser) {
        throw new AuthenticationError("User needs to be authenticated to update author\'s birth year.");
      }
      const author = await Author.findOne({ name: args.name });
      author.born = args.setBornTo;
      try {
        await author.save();
      } catch (error) {
        let errorMsg = 'Could not update author\'s birth year.';
        throw new UserInputError(errorMsg, {
          invalidArgs: args
        });
      }
      return author;
    },
    createUser: (root, args) => {
      const user = new User({ username: args.username });
  
      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          });
        });
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });
  
      if(!user || args.password !== 'secret') {
        throw new UserInputError("Wrong username and/or password.");
      }
  
      const userForToken = {
        username: user.username,
        id: user._id,
      };
  
      return { value: jwt.sign(userForToken, JWT_SECRET) };
    },
    newFavorite: async (root, args, context) => {
      const currentUser = context.currentUser;
      if(!currentUser) {
        throw new AuthenticationError("User needs to be authenticated to set new favorite genre.");
      }
      const user = await User.findById(currentUser._id);
      user.favGenre = args.newFavorite;
      try {
        await user.save();
      } catch (error) {
        let errorMsg = 'Could not update your favorite genre.';
        throw new UserInputError(errorMsg, {
          invalidArgs: args
        });
      }
      return user;
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if(auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      );
      const currentUser = await User
        .findById(decodedToken.id);
      return { currentUser };
    }
  }
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});