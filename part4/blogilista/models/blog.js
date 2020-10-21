const mongoose = require('mongoose');

const url = process.env.MONGODB_URI;

console.log('connecting to', url);

mongoose
  .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
  })
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message);
  });

const blogSchema = mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number,
});

module.exports = mongoose.model('Blog', blogSchema);