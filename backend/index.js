const express = require("express");
const dotenv = require("dotenv");
const path = require('path')
const cors = require('cors')


const server = express();
server.use(express.json())
server.use(cors())

dotenv.config({path:'./.env'})

require('./Config/db.js')
const _dirname = path.resolve();

const authRoute = require("./Routes/authRoutes.js");
const adminRoute = require('./Routes/adminRoutes.js')
const bookRoute = require("./Routes/bookRoutes.js");
const cartListRoute = require('./Routes/cartListRoutes.js')
server.use('/auth', authRoute)
server.use('/admin', adminRoute)
server.use('/books', bookRoute)
server.use('/cartlist', cartListRoute)

if (process.env.NODE_ENV === "production") {
    server.use(express.static(path.join(_dirname, "/frontend/dist")));

    server.get("*", (req, res) => {
        res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
    });
}


const PORT = 5000 || process.env.PORT

server.listen(PORT, () => {
    console.log(`Server is listening the Port no ${PORT}`)
})