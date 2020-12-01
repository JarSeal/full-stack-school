require('dotenv').config();
const { ApolloServer, UserInputError, gql } = require('apollo-server');
const mongoose = require('mongoose');
const Book = require('./models/book');
const Author = require('./models/author');

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
  type Query {
    authorCount: Int!
    bookCount: Int!
    allBooks(author: String, genre: String): [Book!]
    allAuthors: [Author]
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
  }
`;

const { v1: uuid } = require('uuid');
const book = require('./models/book');

const resolvers = {
  Query: {
    authorCount: async () => await Author.collection.countDocuments(),
    bookCount: async () => await Book.collection.countDocuments(),
    allBooks: async (root, args) => {
      // const argAuthor = args.author;
      // const argGenre = args.genre;
      // if(argAuthor || argGenre) {
      //   if(argAuthor && argGenre) {
      //     return books.filter(b => b.author === argAuthor && b.genres.includes(argGenre));
      //   } else if(argAuthor) {
      //     return books.filter(b => b.author === argAuthor);
      //   } else if(argGenre) {
      //     return books.filter(b => b.genres.includes(argGenre));
      //   }
      // }
      // return books;
      const result = await Book.find({}).populate('author', {
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
    }
  },
  Mutation: {
    addBook: async (root, args) => {
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
    editAuthor: async (root, args) => {
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
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
});