const errorMessages = require("../errorMessages/errorMessages");

const {
  getAllBooks,
  getBookByID,
  insertBook,
  editBook,
  deleteBookByID,
} = require("../services/book");

const getBooks = (req, res) => {
  try {
    const books = getAllBooks();
    res.send(books);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const getBook = (req, res) => {
  try {
    const id = req.params.id;

    if (id && getBookByID(id)) {
      const book = getBookByID(id);
      res.send(book);
    } else {
      res.status(422);
      res.send("id inválido");
    }
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const postBook = (req, res) => {
  try {
    const newBook = req.body;

    if (!newBook.name || newBook.name.length < 2) {
      res.status(400);
      return res.send(errorMessages.shortName);
    }

    if (!newBook.id) {
      res.status(400);
      return res.send(errorMessages.missingID);
    }

    if (!Number(newBook.id)) {
      res.status(422);
      res.send("ID inválido");
      return; 
    }

    insertBook(newBook);
    res.status(201);
    res.send(`Livro '${req.body.name}' inserido com sucesso.`);
    
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const patchBook = (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;

    console.log("ID recebido:", id);

    if (!body.name || body.name.length < 2) {
      res.status(400);
      return res.send(errorMessages.shortName);
    }

    if (!id || id.trim() === '') {
      res.status(422);
      res.send("O item precisa ter um ID válido");
      return;
    }

    if (!Number(id)) {
      res.status(422);
      res.send("ID inválido");
      return; 
    }

    editBook(body, id);
    res.send("Item modificado com sucesso");
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};


const deleteBook = (req, res) => {
  try {
    const id = req.params.id;

    if (id && Number(id)) {
      deleteBookByID(id);
      res.send("livro deletado com sucesso");
    } else {
      res.status(422);
      res.send("id inválido");
    }
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

module.exports = {
  getBooks,
  getBook,
  postBook,
  patchBook,
  deleteBook,
};
