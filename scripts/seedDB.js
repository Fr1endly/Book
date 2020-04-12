import mongoose from "mongoose";
import User from "../models/User";
import Chapter from "../models/Chapter";
import bcrypt from "bcrypt";

const seedDB = async (password) => {
  User.remove({}, (err) => {
    if (err) console.log(err);
  });
  Chapter.remove({}, (err) => {
    if (err) console.log(err);
  });

  const admin = new User({
    name: "admin",
    email: "admin@gmail.com",
    isActive: true,
    isAdmin: true,
  });
  const user = new User({
    name: "user",
    email: "user@gmail.com",
    isActive: true,
  });

  const chapter1 = new Chapter({
    title: "Introduction",
    index: 0,
    sections: JSON.stringify([
      {
        type: "paragraph",
        children: [
          {
            text: "Hello and weclome ",
          },
        ],
      },
    ]),
  });

  const chapter2 = new Chapter({
    title: "Attributes",
    index: 1,
    sections: JSON.stringify([
      {
        type: "paragraph",
        children: [
          {
            text:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse commodo ultrices tincidunt. Etiam quis ipsum in ligula mattis consequat sit amet quis lectus. Ut eu interdum lacus. Phasellus ultricies egestas eros, eu luctus quam elementum eu. Aliquam aliquam non purus et eleifend. Cras gravida purus in orci finibus imperdiet. Nulla facilisi. Maecenas pulvinar, mi quis interdum molestie, enim sapien euismod urna, sit amet placerat ante odio non arcu. Morbi fringilla sodales lorem, eu ultrices arcu feugiat sit amet. Orci varius natoque penatibus et magnis dis parturient montes, na",
          },
        ],
      },
    ]),
  });

  try {
    const salt = await bcrypt.genSalt(10);
    admin.password = await bcrypt.hash(password, salt);
    user.password = await bcrypt.hash(password, salt);
    await admin.save();
    console.log(admin);
    await user.save();
    console.log(user);
    await chapter1.save();
    console.log(chapter1);
    await chapter2.save();
    console.log(chapter2);
    console.log("Finished seeding database.");
  } catch (error) {
    console.log(error);
  }
};

module.exports = seedDB;
