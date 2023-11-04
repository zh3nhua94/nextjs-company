import User from "@/models/User";
import NextAuth from "next-auth";
import connect from "@/utils/db";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/google";
import bcrypt from "bcrypt";

const handler = NextAuth({
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
		CredentialsProvider({
			//id is use for login form provider
			id: "credentials",
			// The name to display on the sign in form (e.g. "Sign in with Credentials")
			name: "Credentials",
			type: "credentials",
			//dont need to define credentials: {} options as we will use custom login page
			async authorize(credentials) {
				await connect(); //from "@/utils/db"
				try {
					const user = await User.findOne({ email: credentials.email });
					if (user) {
						//check password
						const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
						if (isPasswordCorrect) {
							return user;
						} else {
							throw new Error("Wrong Credentials!");
						}
					} else {
						throw new Error("User not found!");
					}
				} catch (err) {
					throw new Error(err);
				}
			},
		}),
	],
	pages: {
		signIn: "/dashboard/login", //to send error need to declare signin page
		error: "/dashboard/login", //redirect page if fail login or error login
	},
});

export { handler as GET, handler as POST };
