import NextAuth, { Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "database";

import bcrypt from "bcryptjs";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        console.log(req);

        const user = await prisma.usuario.findUnique({
          where: {
            usuario: credentials.username,
          },
        });

        console.log(`${user.usuario} user`);

        if (!user) {
          return null;
        }

        const valid = await bcrypt.compare(credentials.password, user.password);

        if (!valid) {
          console.log(`Credentials not valid`);
          return null;
        }

        if (user) {
          return { id: user.id.toString(), email: user.usuario };
        }
        return null;
      },
    }),
  ],

  jwt: {},
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token;

        switch (account.type) {
          case "oauth":
            // TODO Verificar si existe en la bd
            break;
          case "credentials":
            token.user = user;
            break;
          default:
            break;
        }
      }
      return token;
    },

    async session({ session, token, user }) {
      console.log({ session, token, user });

      // session.accessToken = token.accessToken

      session.user = token.user as any;
      return session;
    },
  },
});
