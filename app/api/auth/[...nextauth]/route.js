import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

import User from "@models/user";
import { connectToDB } from "@utils/database";

// console.log({
//     clientId: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     mongodb_uri: process.env.MONGODB_URI,
// });
const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        async session({ session }) {
            // store the user id from MongoDB to session
            const sessionUser = await User.findOne({ email: session.user.email });
            session.user.id = sessionUser._id.toString();

            return session;
        },
        async signIn({ profile }) {
            try {
                const db = await connectToDB();

                const userExists = await User.findOne({ email: profile.email });
                console.log("profile", profile);
                // if not, create a new document and save user in MongoDB
                if (!userExists) {
                    const newUser = new User({
                        username: profile.name.replace(" ", "").toLowerCase(),
                        email: profile.email,
                        image: profile.picture,
                    });
                    await newUser.save({ validateBeforeSave: false });

                }

                return true
            } catch (error) {
                console.log("Error checking if user exists: ", error);
                return false
            }
        },
    }

});
export { handler as POST, handler as GET };