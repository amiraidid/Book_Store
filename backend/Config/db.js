const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_KEY).then(() => {
    console.log("Database is Connected....")
}).catch(() => console.log("unable to connect...."))