import nodemailer from "nodemailer";

export const enviarOrdenCompra = async (email: string, nombre: string, pdf: any) => {
  
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
    subject: "The Garden Café - Orden de Compra",
    text: "Orden de Compra",
    html: `
    <p>Hola ${nombre}, confirma tu cuenta de The Garden Café</p>


    <p>Si no creaste esta cuenta ignora este mensaje</p>
    `

  })
};
