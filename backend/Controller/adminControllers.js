const Book = require("../Model/bookModel")
const User = require("../Model/userModel")

const getUsers = async(req, res) => {
    const { role } = req.body
    try {
        const users = await User.find({role: "user"})
        res.status(200).json({users: users })
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const addBook = async(req, res) => {
    try {
        const user = await User.findById(req.user.id)
        if(!user) {
            return res.status(400).json({message: "not found the user"})
        }

        req.body.user = req.user.id
        await Book.create(req.body)
        res.status(200).json({message: "Created a new Book..."})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const updateBook = async (req, res) => {
    const { id } = req.params;
    const newContent = req.body;
    try {
        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        await Book.findByIdAndUpdate(id, newContent, { new: true });
        res.status(200).json({ message: "Updated successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteBook = async (req, res) => {
    const { id } = req.params;
    try {
        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        await Book.findByIdAndDelete(id);
        res.status(200).json({ message: "Deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = { addBook, updateBook, deleteBook, getUsers }
