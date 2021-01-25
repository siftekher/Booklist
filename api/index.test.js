const mongoose = require('mongoose');
const mongoURI = 'mongodb://localhost:27017/test_infoxchange';

mongoose.connect(
   mongoURI, { 
      useNewUrlParser: true, 
      useUnifiedTopology: true
   }
).then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

const Book   = require("./model/Book");
const Author = require("./model/Author");

describe('Book model test', () => {

  beforeAll(async () => {
      await Book.remove({});
      await Author.remove({});
  });
  
  afterEach(async () => {
      await Book.remove({});
      await Author.remove({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('Book has a module', async () => {
       expect(Book).toBeDefined();
  });
  
  it('Author has a module', async () => {
       expect(Author).toBeDefined();
  });
  
  describe('get Book', () =>{
      it('get a book', async () => {
           const book = new Book();
           book.name = 'Martin';
           book.isbn = '55555';

           await book.save();
           
           const foundBook = await Book.findOne({name: 'Martin'});
           const expectedName = 'Martin';
           const actualName = foundBook.name;
           expect(actualName).toEqual(expectedName);
      });
  });
  
  describe('get Author', () =>{
      it('get a author', async () => {
           const author = new Author();
           author.first_name = 'Martin';
           author.last_name = 'Luther';

           await author.save();
           
           const foundAuthor = await Author.findOne({first_name: 'Martin'});
           const expectedName = 'Martin';
           const actualName = foundAuthor.first_name;
           expect(actualName).toEqual(expectedName);
      });
  });
  
});