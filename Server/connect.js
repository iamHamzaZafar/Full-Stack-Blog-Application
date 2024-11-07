const mongoose = require("mongoose");

const connectToDb = async () => {
  try {
    const connectionIstance = await mongoose.connect(
      `${process.env.MONGO_DB_URI}/${process.env.DB_NAME}`
    );
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectToDb;
