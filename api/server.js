const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
var cors = require('cors');
const app = express();
const Book = require('./model/Book')
const Author = require('./model/Author')
const mongoURI = 'mongodb://localhost:27017/infoxchange';

mongoose.connect(
   mongoURI, { 
      useNewUrlParser: true, 
      useUnifiedTopology: true
   }
).then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Returns a list of books in the database in JSON format
app.get('/books', async (req, res) => {
    try {
        Book.find()
         .populate('author')
         .exec(function(err, book){
              if (err)
                res.send(err);

            res.json({
                book: book
            });
        })
    } catch(error){
        res.json({ error: error });
    }
})


app.get('/books/:id', async (req, res) => {
    try {
        Book.findById(req.params.id, function(err, book) {
            if (err)
               res.send(err);
            res.json({
                book: book
            });
        });
    } catch(error){
        res.json({ error: error });
    }

})

//Returns a list of authors in the database in JSON format
app.get('/authors', async (req, res) => {
    try {
        Author.find(function(err, author) {
            if (err)
                res.send(err);
            res.json({
                author: author
            });
        });
    } catch(error){
        res.json({ error: error });
    }
})

//Returns a detail view of the specified author id
app.get('/authors/:id', async (req, res) => {
    try {
        Author.findById(req.params.id, function(err, author) {
            if (err)
               res.send(err);
            res.json({
                author: author
            });
        });
    } catch(error){
        res.json({ error: error });
    }
})

app.post('/book', async (req, res) => {
    try {
        var book = new Book();
        book.name = req.body.name;
        book.isbn = req.body.isbn;
        book.author = req.body.author;

        book.save(function(err) {
            if (err)
               res.send(err);

            res.json({ message: 'book created!' });
        });
    } catch(error){
        res.json({ error: error });
    }
})

app.post('/author', async (req, res) => {
    try {
        var author = new Author();
        author.first_name = req.body.first_name;
        author.last_name  = req.body.last_name;

        author.save(function(err) {
            if (err)
               res.send(err);

            res.json({ message: 'author created!' });
        });
    } catch(error){
        res.json({ error: error });
    }
})


//update Book 
app.put('/book/:id', async (req, res) => {
    try {
        Book.findById(req.params.id, function(err, book) {
            if (err)
                res.send(err);

            book.name = req.body.name;
            book.isbn = req.body.isbn;
            book.author = req.body.author;
            book.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Book updated!' });
            });
        });
    } catch(error){
        res.json({ error: error });
    }
})

//update Author
app.put('/author/:id', async (req, res) => {
    try {
        Author.findById(req.params.id, function(err, author) {
            if (err)
                res.send(err);

            author.first_name = req.body.first_name;
            author.last_name  = req.body.last_name;

            author.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Author updated!' });
            });
        });
    } catch(error){
        res.json({ error: error });
    }

})

app.listen(3300);