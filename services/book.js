const fs = require("fs");

//guardar a rota que se repete no código ajuda nas manutenções futuras
const ALL_BOOKS_FILE = "books.json";

const getAllBooks = () => {
  try {
    //leio o conteúdo do arquivo especificado e converto a string para um objeto JSON com o JSON.parse
    return JSON.parse(fs.readFileSync(ALL_BOOKS_FILE));
  } catch (error) {
    throw new Error("Erro ao obter livros: " + error.message);
  }
};

const getBookByID = (id) => {
  try {
    const books = JSON.parse(fs.readFileSync(ALL_BOOKS_FILE));

    //com o método filter eu capturo todos os itens que satisfazem o id que forneci, gerando uma nova array com esses itens. [0] pega o primeiro item dessa lista
    const filteredBook = books.filter((book) => book.id === id)[0];
    return filteredBook;

  } catch (error) {
    throw new Error("Erro ao obter livro por ID: " + error.message);
  }
};

const insertBook = (newBook) => {
  try {
    const books = JSON.parse(fs.readFileSync(ALL_BOOKS_FILE));

    //aqui o spread espalha os livros já existentes em 'books' e adiciona o novo livro 'newBook' que foi passado como parâmetro da função ao final dessa lista
    const newBookList = [...books, newBook];

    //substituímos a lista anterior com a atualizada com o novo livro usando o fs.writeFileSync
    fs.writeFileSync(ALL_BOOKS_FILE, JSON.stringify(newBookList));

  } catch (error) {
    throw new Error("Erro ao inserir livro: " + error.message);
  }
};

const editBook = (modifications, id) => {
  try {
    let currentBooks = JSON.parse(fs.readFileSync(ALL_BOOKS_FILE));

    //percorremos a lista para encontrar um item que corresponda ao id fornecido
    const modifiedIndex = currentBooks.findIndex((book) => book.id === id);

    //se não houver nenhum item que corresponda com o id fornecido, retornamos uma mensagem ao usuário
    if (modifiedIndex === -1) {
      throw new Error("Livro não encontrado");
    }

    //criação de um novo objeto que combina as informações do livro existente no índice 'modifiedIndex' da lista de livros com os modificações fornecidas em 'modifications', permitindo atualizar seletivamente os campos do livro 
    const modifiedContent = {
      ...currentBooks[modifiedIndex],
      ...modifications,
    };

    //atualiza o 'currentBooks' com as modificações fornecidas em modifiedContent
    currentBooks[modifiedIndex] = modifiedContent;

    //sobrescrevemos a lista de livros para atualizar as modificações
    fs.writeFileSync(ALL_BOOKS_FILE, JSON.stringify(currentBooks));

  } catch (error) {
    throw new Error("Erro ao editar livro: " + error.message);
  }
};

const deleteBookByID = (id) => {
  try {
    const books = JSON.parse(fs.readFileSync(ALL_BOOKS_FILE));

    //uma nova array é criada contendo todos os livros atuais exceto aquele com o id que fornecemos
    const filteredBooks = books.filter((book) => book.id !== id);

    //novamente sobrescrevemos o arquivo com a lista atualizada
    fs.writeFileSync(ALL_BOOKS_FILE, JSON.stringify(filteredBooks));

  } catch (error) {
    throw new Error("Erro ao deletar livro: " + error.message);
  }
};

module.exports = {
  getAllBooks,
  getBookByID,
  insertBook,
  editBook,
  deleteBookByID,
};
