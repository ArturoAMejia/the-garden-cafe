# The Garden Café

## Para poder arrancar el proyecto se debe de realizar los siguientes comandos

Para instalar las dependecias ejecutar el comando

```node
yarn 
```

Una vez instaladas las dependencias, crear un archivo .env para ingresar las claves secretas y sustituir los valores

``` env
DATABASE_URL="postgresql://user:password@localhost:5432/the-garden-cafe?schema=public"
NEXT_PUBLIC_TAX_RATE=
JWT_SECRET_SEED=
NEXT_PUBLIC_STRIPE_KEY=
STRIPE_SECRET_KEY=
```

Para realizar todas las migraciones, se debe de ejecutar el siguiente comando:

```yarn
yarn prisma migrate dev
```

Para realizar un seed y llenar ciertos datos en la base de datos para realizar pruebas se debe de ejecutar el comando:

```yarn
yarn prisma db seed
```

Una vez ejecutado todos los comandos con éxito, realizar el comando:

```yarn
yarn dev
```

Para ejecutar el servidor de desarrollo
