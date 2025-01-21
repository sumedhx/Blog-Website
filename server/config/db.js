const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, { // mongodb+srv://admin:pass@cluster0.en36s.mongodb.net/blog?retryWrites=true&w=majority
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (err) {
        console.error(`Error: ${err.message}`);
        process.exit(1); // Exit process with failure
    }
};

// Ensure this exports the connectDB function
module.exports = connectDB;



mongoose.set('strictQuery', false);

