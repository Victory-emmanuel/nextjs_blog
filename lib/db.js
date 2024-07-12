// import mongoose from "mongoose";

// export async function connect() {
//   try {
//     mongoose.connect(process.env.MONGODB_URL);
//     const connection = mongoose.connection();

//     connection.on("connected", () => {
//       console.log("MongoDB connected successfully");
//     });

//     connection.on("error", (err) => {
//       console.log(
//         "MongoDB connection error. Please make sure MongoDB is running. " + err
//       );
//       process.exit();
//     });
//   } catch (error) {
//     console.log("Something goes wrong!");
//     console.log(error);
//   }
// }

import mongoose from "mongoose";

export async function connect() {
  const mongoUri = process.env.MONGODB_URL;

  if (!mongoUri) {
    console.error(
      "MongoDB connection error. The MONGODB_URL environment variable is not set."
    );
    process.exit(1);
  }

  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDB connected successfully");
    });

    connection.on("error", (err) => {
      console.error(
        "MongoDB connection error. Please make sure MongoDB is running. " + err
      );
      process.exit(1);
    });
  } catch (error) {
    console.error("Something went wrong!");
    console.error(error);
    process.exit(1);
  }
}
