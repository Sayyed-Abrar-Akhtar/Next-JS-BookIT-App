import mongoose from 'mongoose';

const dbConnect = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_LOCAL_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB connected`);
  } catch (err) {
    console.error(`Error: ${err}`);
    process.exit(1); // <-- no more async operations are pending and exit with failure code.
  }
};

export default dbConnect;
