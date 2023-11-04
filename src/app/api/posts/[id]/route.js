import Post from "@/models/Post";
import connect from "@/utils/db";
import { NextResponse } from "next/server";

//GET SINGLE POST
export const GET = async (request, { params }) => {
	const { id } = params;
	try {
		await connect(); //from @/utils/db
		const post = await Post.findById(id);
		return NextResponse.json(post, { status: 200 });
	} catch (err) {
		return new NextResponse("Database Error: " + err, { status: 500 });
	}
};

//DELETE SINGLE POST
export const DELETE = async (request, { params }) => {
	const { id } = params;
	try {
		await connect(); //from @/utils/db
		const post = await Post.findByIdAndDelete(id);
		return new NextResponse("Post has been deleted.", { status: 200 });
	} catch (err) {
		return new NextResponse("Database Error: " + err, { status: 500 });
	}
};
