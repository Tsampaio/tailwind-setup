const express = require('express');
const dotenv = require('dotenv');

const path = require('path');

const app = express();

//init middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ extended: false }));


dotenv.config({ path: './.env' });

const mongoose = require('mongoose');
const db = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@mongodb-test-4d191b39.mongo.ondigitalocean.com/telmo_academy?authSource=admin&replicaSet=mongodb-test&tls=true&tlsCAFile=./ca-certificate.crt`
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