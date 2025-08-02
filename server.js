const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const counterRoutes = require('./routes/counterRoutes');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const MONGO_URI = `mongodb+srv://${process.env.DBUSER}:${process.env.DBPASSWORD}@cluster-0.luxkyci.mongodb.net/?retryWrites=true&w=majority&appName=Cluster-0`;

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use('/api/visits', counterRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ Visit Counter Server running at http://localhost:${PORT}`);
});
