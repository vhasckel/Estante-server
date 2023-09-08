const {
  getAllFavorites,
  insertFavorite,
  deleteFavoriteBookByID,
} = require("../services/favorite");

const getFavorites = (req, res) => {
  try {
    const books = getAllFavorites();
    res.send(books);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const postFavorite = (req, res) => {
  try {
    const id = req.params.id;
    insertFavorite(id);
    res.status(201);
    res.send(`livro ${req.body.name} inserido com sucesso`);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const deleteFavorite = (req, res) => {
  try {
    const id = req.params.id;

    if (id && Number(id)) {
      deleteFavoriteBookByID(id);
      res.send("favorito deletado com sucesso");
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
  getFavorites,
  postFavorite,
  deleteFavorite,
};
