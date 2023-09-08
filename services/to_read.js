const fs = require("fs");

//guardar o caminho do arquivo evita que se repita e será de fácil manutenção posteriormente
const TO_READ_FILE = "to_read.json";

const getAllToRead = () => {
  try {
    return JSON.parse(fs.readFileSync(TO_READ_FILE));
  } catch (error) {
    throw new Error(
      "Erro ao buscar livros marcados como 'quero ler': " +
      error.message
    );
  }
};

const deleteToReadByID = (id) => {
  try {
    const books = JSON.parse(fs.readFileSync(TO_READ_FILE));
    const filteredBooks = books.filter((book) => book.id !== id);

    fs.writeFileSync(TO_READ_FILE, JSON.stringify(filteredBooks));

  } catch (error) {
    throw new Error(
      "Erro ao deletar livro 'quero ler' por ID: " +
      error.message
    );
  }
};

const insertBookToRead = (id) => {
  try {
    const books = JSON.parse(fs.readFileSync("books.json"));
    const toRead = JSON.parse(fs.readFileSync(TO_READ_FILE));

    const newInsertBook = books.find((book) => book.id === id);
    const newToReadList = [...toRead, newInsertBook];

    fs.writeFileSync(TO_READ_FILE, JSON.stringify(newToReadList));

  } catch (error) {
    throw new Error("Erro ao inserir 'quero ler' livro: " + error.message);
  }
};

module.exports = {
  getAllToRead,
  deleteToReadByID,
  insertBookToRead,
};
