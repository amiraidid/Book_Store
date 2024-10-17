const Book = require("../Model/bookModel");
const User = require("../Model/userModel")

const getBooks = async(req, res) => {
    try {
        const books = await Book.find({})
        res.status(200).json({books: books})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const getOneBook = async (req, res) => {
    const { name } = req.params;
    try {
        const formattedName = name.charAt(0).toUpperCase() + name.slice(1);
        const book = await Book.findOne({ name: formattedName });
        if (!book) {
            return res.status(404).json({ message: "That book is not in the database..." });
        }
        res.status(200).json({ book: book });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
 
const singleBook = async(req, res) => {
    const { id } = req.params
    try {
        const book = await Book.findById(id)
        res.status(200).json({book})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
const checkOut = async(req, res) => {
    const { id } = req.params
    try {
        const book = await Book.findById(id)
        res.status(200).json({book})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const suggestions = async(req, res) => {
    const { query } = req.query
    if (!query) {
        return res.json([])
    }

    try {
        const suggest = await Book.find({ name: { $regex: query, $options: 'i' } }).limit(5).select('name');
        res.json(suggest.map(book => book.name));
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports = { getBooks, getOneBook,suggestions, singleBook, checkOut }