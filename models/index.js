import mongoose from "mongoose";

const connectDB = () => {
  mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  mongoose.set("useCreateIndex", true);
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "MongoDB connection error"));
  db.once("open", () => {
    console.log("MongoDB connected");
  });
  return db;
};
export { connectDB };
