import NextAuth from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials'
import { signJwtToken } from "@/lib/jwt";
import bcrypt from 'bcrypt'
import User from "@models/user";
import connectMongoDB from "@lib/mongodb";

export const authOptions = {
  providers: [
    CredentialsProvider({
      type: 'credentials',
      credentials: {
        username: {
          label: 'E-mail',
          type: 'text',
          placeholder: 'john@doe.com'
        },
        password: {
          label: 'Password',
          type: 'password'
        }
      },
      async authorize(credentials, req) {
        const { email, password } = credentials;

        await connectMongoDB();

        const user = await User.findOne({ email });

        if(!user){
            throw new Error("Invalid input");
        }

        const comparePass = await bcrypt.compare(password, user.password);

        if(!comparePass) {
          throw new Error("Invalid input");
        } else {
          const { role, ...currentUser } = user._doc

          const accessToken = signJwtToken({ role, ...currentUser }, { expiresIn: '7d' });

          return {
            ...currentUser,
            role,
            accessToken
          }
        }

      }
    })
  ],
  pages: {
    signIn: '/login'
  },
  secret: process.env.NEXT_AUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token._id = user._id
        token.role = user.role
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user._id = token._id;
        session.user.accessToken = token.accessToken;
        session.user.role = token.role
      }
      return session;
    }
  }
}

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST}