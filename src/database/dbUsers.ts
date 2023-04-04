import bcrypt from "bcryptjs";
import { prisma } from "./db";

export const checkUserEmailPassword = async (
  correo: string,
  password: string
) => {
  await prisma.$connect();
  let user = await prisma.usuario.findUnique({
    where: {
      correo,
    },
  });
  await prisma.$disconnect();

  if (!user) {
    return null;
  }

  if (!bcrypt.compareSync(password, user.password)) {
    return null;
  }

  let { id, id_rol } = user;

  return {
    id,
    id_rol,
    correo,
  };
};
