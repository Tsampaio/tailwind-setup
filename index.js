const express = require('express');
const dotenv = require('dotenv');

const path = require('path');

const app = express();

//init middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ extended: false }));


dotenv.config({ path: './.env' });

const mongoose = require('mongoose');
const db = process.env.DATABASE;
console.log(db);
const connectDB = async () => {
    try {
        console.log("trying");
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log("MongoDB connected");
    } catch(error) {
        console.log("failed");
        console.error(error.message);
        //Exit process with failure
        process.exit(1);
    }
}

connectDB()

app.use(express.static(path.join(__dirname, '/client/build')));

app.get('/*', function (req, res) {
   res.sendFile(path.join(__dirname, './client/build/index.html'));
 });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));