const {
  getAllToRead,
  insertBookToRead,
  deleteToReadByID,
} = require("../services/to_read");

const getToRead = (req, res) => {
  try {
    const books = getAllToRead();
    res.send(books);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const postToRead = (req, res) => {
  try {
    const id = req.params.id;
    insertBookToRead(id);
    res.status(201);
    res.send(`livro ${req.body.name} inserido com sucesso`);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const deleteToRead = (req, res) => {
  try {
    const id = req.params.id;

    if (id && Number(id)) {
      deleteToReadByID(id);
      res.send("livro removido de 'quero ler'");
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
  getToRead,
  postToRead,
  deleteToRead,
};
