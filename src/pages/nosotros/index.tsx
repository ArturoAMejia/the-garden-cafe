import Image from "next/image";
import React from "react";
import Layout from "../../components/Layout/Layout";

const Nosotros = () => {
  return (
    <Layout
      title="Nosotros de The Garden Cafe"
      pageDescription="Página de Nosotros de"
    >
      <div className="relative bg-[#FFF9EA]">
        <div className="lg:absolute lg:inset-0">
          <div className="lg:absolute lg:inset-y-0 lg:left-0 lg:w-1/2">
            <img
              className="h-96 w-full object-cover sm:object-containt lg:absolute lg:h-full"
              src="/img/acerca.jpeg"
              alt=""
            />
          </div>
        </div>
        <div className="relative pt-12 pb-16 px-4 sm:pt-16 sm:px-6 lg:px-8 lg:max-w-7xl lg:mx-auto lg:grid lg:grid-cols-2">
          <div className="lg:col-start-2 lg:pl-8">
            <div className="text-base max-w-prose mx-auto lg:max-w-lg lg:ml-auto lg:mr-0">
              <h1 className="mt-2 text-xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Nuestra Historia
              </h1>
              <p className="mt-8 text-md text-gray-500">
                {`The Garden Cafe es la creación de Damien Hopkins, de California,
                y Xiomara Díaz, de Managua, que en 2007, como jóvenes soñadores,
                vieron la necesidad de una alimentación sana, así como de la
                generación de empleo sostenible en Granada, Nicaragua. "Después
                de graduarnos en Relaciones Internacionales, decidimos emprender
                el negocio. Con mucho trabajo y determinación pudimos remodelar
                una hermosa y antigua casa colonial española y convertirla en la
                encantadora cafetería que habíamos soñado." La ardua tarea de
                remodelación de la casa se completó y el restaurante abrió sus
                puertas por primera vez el 13 de agosto de 2007 con 4 personas
                en el equipo. En la actualidad, The Garden Cafe genera 30
                puestos de trabajo a tiempo completo durante todo el año, lo que
                repercute positivamente en más de 100 miembros de la familia.
                Además, TGC es capaz de dinamizar la economía de más de 80
                proveedores locales clave y añadir valor a la comunidad local a
                través de los diferentes programas de impacto social que apoya.
                "En The Garden Cafe nos esforzamos por ofrecer una experiencia
                significativa para todos: nuestros clientes, nuestro personal,
                nuestros proveedores y nuestra comunidad".`}
              </p>
              <div className="mt-5 prose prose-indigo text-gray-500">
                <h3 className="mt-2 text-xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-2xl">
                  Nuestra Misión
                </h3>
                <p>
                  The Garden Cafe está en el negocio para servir comida fresca y
                  honesta y para interrumpir el ciclo de la pobreza generando
                  oportunidades que ayuden a nuestro equipo y a la comunidad a
                  crecer. Lo hacemos creando alimentos nutritivos, relaciones,
                  espacios creativos y ejecutando acciones impactantes que
                  promueven y apoyan intencionadamente el desarrollo sostenible
                  de nuestro país.
                </p>
                <h3 className="mt-2 text-xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-2xl">
                  Nuestros Valores
                </h3>
                <ul className="pl-4" role="list">
                  <li className="list-disc">Dignidad</li>
                  <li className="list-disc">Integridad</li>
                  <li className="list-disc">Respeto</li>
                  <li className="list-disc">Calidad</li>
                  <li className="list-disc">Pasión</li>
                  <li className="list-disc">Disruptividad</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Nosotros;
