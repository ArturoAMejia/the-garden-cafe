import NextAuth, { Session, DefaultSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "database";

import bcrypt from "bcryptjs";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      id_rol: number;
    } & DefaultSession["user"];
  }
}

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const user = await prisma.usuario.findUnique({
          where: {
            usuario: credentials.username,
          },
        });

        if (!user) {
          return null;
        }

        const valid = await bcrypt.compare(credentials.password, user.password);

        if (!valid) {
          return null;
        }

        const modulos = await prisma.rol_modulo.findMany({
          select: {
            modulo: {
              select: {
                nombre: true,
                icono: true,
                sub_modulo: true,
              },
            },
          },
          where: {
            id_rol: user.id_rol,
          },
        });

        if (user) {
          return {
            id: user.id.toString(),
            email: user.usuario,
            id_rol: user.id_rol,
            modulos,
          };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/auth" || "/admin/auth",
  },
  session: {
    maxAge: 1296000, /// 15d
    strategy: "jwt",
    updateAge: 86400, // cada día
  },
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token;

        switch (account.type) {
          case "credentials":
            token.user = user;
            break;
        }
      }

      return token;
    },

    async session({ session, token, user }) {
      // session.accessToken = token.accessToken

      session.user = token.user as any;
      return session;
    },
  },
});
