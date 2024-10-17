const book = require("../Model/bookModel");
const cartList = require('../Model/cartListModel');

const addtoCartList = async (req, res) => {
    const { id } = req.params;

    try {
        const selectedBook = await book.findById(id);
        
        if (!selectedBook) {
            return res.status(404).json({ message: "Book not found" });
        }

        const existingItem = await cartList.findOne({ user: req.user.id, bookId: id });
        if (existingItem) {
            return res.status(400).json({ message: "Item already exists in cart" });
        }

        const cartItem = new cartList({
            name: selectedBook.name,
            author: selectedBook.author,
            description: selectedBook.description,
            image: selectedBook.image,
            price: selectedBook.price,
            category: selectedBook.category,
            user: req.user.id,
            bookId: id 
        });

        await cartItem.save();

        res.status(201).json({ message: "Book added to cart successfully", cartItem });
    } catch (error) {
        console.error("Error fetching cart item:", error.message);
        res.status(500).json({ message: error.message });
    }
};

const getDataFromCartList = async(req, res) => {
    try {
        const cartListData = await cartList.find({});
        res.status(200).json({cartListData: cartListData})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const deleteFromCartList = async(req, res) => {
    const { id } = req.params

    try {
        const deletedItem = await cartList.findByIdAndDelete(id)
        res.status(200).json({message: "successfully deleted from the cart", deletedItem})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports = { addtoCartList, getDataFromCartList, deleteFromCartList };
