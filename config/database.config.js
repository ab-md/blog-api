const { default: mongoose } = require("mongoose");

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.DB_URI);
        console.log(`MongoDB connected to ${conn.connection.host}`)
    } catch (error) {
        console.error(`Error ${error.message}`);
        process.exit(1);
    }
}

mongoose.connection.on("disconnect", () => console.warn("MongoDB disconnected"));

module.exports = connectDB;