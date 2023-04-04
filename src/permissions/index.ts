import { usuario, Prisma, compra } from "@prisma/client";
import { PureAbility, AbilityBuilder, subject } from "@casl/ability";
import { createPrismaAbility, PrismaQuery, Subjects } from "@casl/prisma";


type AppAbility = PureAbility<
  [
    string,
    Subjects<{
      User: usuario;
      Compra: compra;
    }>
  ],
  PrismaQuery
>;

const { can, cannot, build } = new AbilityBuilder<AppAbility>(
  createPrismaAbility
);

can("read", "Compra", { id_rol: 1 });
cannot("read", "Compra", { id_rol: 2 });

const ability = build();
ability.can("read", "Compra");
ability.can("read", subject("Compra", { id_rol: 2 }));
