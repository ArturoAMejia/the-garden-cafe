import nodemailer from "nodemailer";

export const emailRegistro = async (email: string, nombre: string, token: string) => {
  
  const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.MAILTRAP_USER,
      pass: process.env.MAILTRAP_PASSWORD,
    },
  });

  const info = await transport.sendMail({
    from: '"The Garden Café" <admin@thegardencafe.com>',
    to: email,
    subject: "The Garden Café - Confirmación de cuenta",
    text: "Confirmación de cuenta",
    html: `
    <p>Hola ${nombre}, confirma tu cuenta de The Garden Café</p>
    <a href="${process.env.NEXTAUTH_URL}/auth/${token}">Confirmar cuenta</a>

    <p>Si no creaste esta cuenta ignora este mensaje</p>
    `

  })
};
