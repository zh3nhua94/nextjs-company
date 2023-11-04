import mongoose from "mongoose";

const connect = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URL).then(console.log("Connection to mongoDB successfully."));
	} catch (error) {
		throw new Error("Connection to MongoDB failed: " + error);
	}
};

export default connect;
