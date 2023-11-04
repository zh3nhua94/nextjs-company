import Post from "@/models/Post";
import connect from "@/utils/db";
import { NextResponse } from "next/server";

//GET ALL POST or USER's POST
export const GET = async (request) => {
	const url = new URL(request.url);
	const username = url.searchParams.get("username");
	try {
		await connect(); //from @/utils/db
		const posts = await Post.find(username && { username }); //if there is username then use it,else fetch all posts
		return NextResponse.json(posts, { status: 200 });
	} catch (err) {
		return new NextResponse("Database Error: " + err, { status: 500 });
	}
};

//CREATE POST
export const POST = async (request) => {
	const body = await request.json();
	const newPost = await new Post(body);
	try {
		await connect(); //from @/utils/db
		await newPost.save();
		console.log(newPost);
		return new NextResponse("Post has been created!", { status: 201 });
	} catch (err) {
		return new NextResponse("Database Error: " + err, { status: 500 });
	}
};
