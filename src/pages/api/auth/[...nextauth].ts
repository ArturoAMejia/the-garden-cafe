import NextAuth, { User, DefaultSession, NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "database";

import bcrypt from "bcryptjs";
import { IModulo } from "@/interfaces/administracion/modulo";
import { IRol } from "@/interfaces/seguridad/rol-modulo";
import { AdapterUser } from "next-auth/adapters";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    id_rol: number;
    id_trabajador: number;
    user: {
      id: number;
      id_rol: number;
      modulos: IModulo[];
      nombre: string;
      apellido: string;
      roles: IRol[];
      id_trabajador: number;
      id_cliente: number;
    } & DefaultSession["user"] &
      AdapterUser;
    /** The user's postal address. */
  }
  interface User {
    id_rol: number;
  }
  interface DefaultJWT {
    id_rol: number;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        await prisma.$connect();

        const user = await prisma.usuario.findUnique({
          where: {
            usuario: credentials.username,
          },
          select: {
            id: true,
            usuario: true,
            password: true,
            id_rol: true,
            persona: true,
            id_estado: true,
          },
        });

        if (!user) {
          return null;
        }

        if (user.id_estado === 11) {
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

        const roles = await prisma.rol.findMany({
          where: {
            NOT: {
              id: 6,
            },
          },
        });

        const trabajador = await prisma.trabajador.findFirst({
          where: {
            id_persona: user.persona.id,
          },
        });

        const cliente = await prisma.cliente.findFirst({
          where: {
            id_persona: user.persona.id,
          },
        });

        if (user) {
          return {
            id: user.id.toString(),
            email: user.usuario,
            id_rol: user.id_rol,
            nombre: user.persona.nombre,
            apellido: user.persona.apellido_razon_social,
            modulos,
            roles,
            id_trabajador: trabajador?.id,
            id_cliente: cliente?.id,
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
            // token.id_rol = user.id_rol;
            if (user.id_rol) {
              token.id_rol = user.id_rol;
            }
            break;
        }
      }

      return token;
    },

    async session({ session, token, user }) {
      session.user = token.user as any;

      return session;
    },
  },
};

export default NextAuth(authOptions);
