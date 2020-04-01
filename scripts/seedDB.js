import mongoose from "mongoose";
import User from "../models/User";
import bcrypt from "bcrypt";

const seedDB = async () => {
  User.remove({}, err => {
    if (err) console.log(err);
  });

  const admin = new User({
    name: "admin",
    email: "admin@admin.ad",
    isActive: true,
    isAdmin: true
  });
  const user = new User({
    name: "user",
    email: "user@gmail.com",
    isActive: true
  });
  try {
    const salt = await bcrypt.genSalt(10);
    admin.password = await bcrypt.hash("loselose", salt);
    user.password = await bcrypt.hash("loselose", salt);
    await admin.save();
    await user.save();
    console.log("Finished seeding database.");
  } catch (error) {
    console.log(error);
  }
};

module.exports = seedDB;
