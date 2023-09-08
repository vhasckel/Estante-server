const fs = require("fs");

//guardar a rota que se repete no código ajuda nas manutenções futuras
const FAVORITES_FILE = "favorites.json";

const getAllFavorites = () => {
  try {
    return JSON.parse(fs.readFileSync(FAVORITES_FILE));
  } catch (error) {
    throw new Error("Erro ao buscar livros favoritos: " + error.message);
  }
};

const deleteFavoriteBookByID = (id) => {
  try {
    const books = JSON.parse(fs.readFileSync(FAVORITES_FILE));

    //cria uma nova array contendo todos os livros exceto aquele com o id que fornecemos
    const filteredBooks = books.filter((book) => book.id !== id);

    //sobrescreve o arquivo antigo pelo atualizado
    fs.writeFileSync(FAVORITES_FILE, JSON.stringify(filteredBooks));

  } catch (error) {
    throw new Error("Erro ao deletar favorito por ID: " + error.message);
  }
};

const insertFavorite = (id) => {
  try {
    const books = JSON.parse(fs.readFileSync("books.json"));
    const favorites = JSON.parse(fs.readFileSync(FAVORITES_FILE));

    //percorre a array e retorna o primeiro valor que satisfazer o id que fornacemos
    const newInsertBook = books.find((book) => book.id === id);

    //cria um array com os favoritos existentes mais o que acabamos de inserir
    const newFavoriteList = [...favorites, newInsertBook];

    //sobrescrevemos o arquivo com os dados atualizados
    fs.writeFileSync(FAVORITES_FILE, JSON.stringify(newFavoriteList));

  } catch (error) {
    throw new Error("Erro ao inserir livro como favorito: " + error.message);
  }
};

module.exports = {
  getAllFavorites,
  deleteFavoriteBookByID,
  insertFavorite,
};
