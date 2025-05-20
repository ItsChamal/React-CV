require('dotenv').config();
const express    = require('express');
const connectDB  = require('./config/db');
const authRoutes = require('./routes/auth');
const noteRoutes = require('./routes/notes');
const cors      = require('cors');
const app = express();

connectDB();


app.use(cors());
app.use(express.json());


app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server on port ${PORT}`));
