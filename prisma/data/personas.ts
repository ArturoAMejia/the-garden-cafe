export const personas = [
  {
    nombre: "Arturo",
    apellido_razon_social: "Mejía",
    cedula_ruc: "001-160802-1039X",
    telefono: "7885-3855",
    direccion_domicilio: "Km 12,7 carretera sur",
    correo: "armejia02@gmail.com",
    genero: "Masculino",
    fecha_nacimiento_constitucion: "2002-08-16T23:50:21.817Z",
    tipo_persona: "Natural",
  },
  {
    nombre: "Abel",
    apellido_razon_social: "Cruz",
    cedula_ruc: "001-250203-1191X",
    telefono: "77482785",
    direccion_domicilio: "Barrio Miguel Bonilla",
    correo: "abel@gmail.com",
    genero: "Masculino",
    fecha_nacimiento_constitucion: "2003-02-25T23:50:21.817Z",
    tipo_persona: "Natural",
  },
  {
    nombre: "Ivan",
    apellido_razon_social: "Martinez",
    cedula_ruc: "001-130202-1159X",
    telefono: "77659249",
    direccion_domicilio: "Puente el Edén",
    correo: "ivan@gmail.com",
    genero: "Masculino",
    fecha_nacimiento_constitucion: "2002-02-13T23:50:21.817Z",
    tipo_persona: "Natural",
  },
  {
    nombre: "Katherine",
    apellido_razon_social: "Cerda",
    cedula_ruc: "001-230102-1039X",
    telefono: "86798206",
    direccion_domicilio: "Masaya",
    correo: "katherine@gmail.com",
    genero: "Femenino",
    fecha_nacimiento_constitucion: "2002-01-23T23:50:21.817Z",
    tipo_persona: "Natural",
  },
  {
    nombre: "Fernanda",
    apellido_razon_social: "López",
    cedula_ruc: "001-110200-1039X",
    telefono: "84893079",
    direccion_domicilio: "Granada",
    correo: "fernanda@gmail.com",
    genero: "Femenino",
    fecha_nacimiento_constitucion: "2000-02-11T23:50:21.817Z",
    tipo_persona: "Natural",
  },
  {
    nombre: "La Colonia",
    apellido_razon_social: "Casa Mantica S.A.",
    cedula_ruc: "001-160102-1039X",
    telefono: "22991100",
    direccion_domicilio: "Km 12,7 carretera sur",
    correo: "lacolonia@gmail.com",
    genero: "-",
    fecha_nacimiento_constitucion: "1980-08-16T23:50:21.817Z",
    tipo_persona: "Juridica",
  },
];

export const proveedor = [
  {
    id_persona: 6,
    id_estado: 1,
    sector_comercial: "Primario",
    nacionalidad: "Nicaraguense",
  },
];
export const cargos = [
  {
    id_estado: 1,
    nombre: "Administrador",
    descripcion: "Administrador del sistema",
    salario: 1000.0,
    vigencia: new Date(),
  },
  {
    id_estado: 1,
    nombre: "Gerente",
    descripcion: "Gerente del restaurante",
    salario: 800.0,
    vigencia: new Date(),
  },
];
export const estado_civil = [
  {
    nombre: "Soltero",
  },
  {
    nombre: "Casado",
  },
  {
    nombre: "Divorciado",
  },
];
export const trabajador = [
  {
    id_persona: 1,
    id_estado_civil: 1,
    id_estado: 1,
    codigo_inss: "2022-0201-3120-V",
  },
  {
    id_persona: 2,
    id_estado_civil: 1,
    id_estado: 1,
    codigo_inss: "2022-0204-3120-V",
  },
  {
    id_persona: 3,
    id_estado_civil: 1,
    id_estado: 1,
    codigo_inss: "2022-0202-3120-V",
  },
  {
    id_persona: 4,
    id_estado_civil: 1,
    id_estado: 1,
    codigo_inss: "2022-0203-3120-V",
  },
  {
    id_persona: 5,
    id_estado_civil: 1,
    id_estado: 1,
    codigo_inss: "2022-0205-3120-V",
  },
];
export const grupos_usuarios = [
  {
    id_estado: 1,
    nombre: "Administración",
    descripcion: "Administradores del sistema",
  },
  {
    id_estado: 1,
    nombre: "Gerente",
    descripcion: "Gerente del restaurante",
  },
  {
    id_estado: 1,
    nombre: "Cliente",
    descripcion: "Cliente del restaurante",
  },
];
export const perfiles = [
  {
    id_grupo_usuario: 1,
    nombre: "Administrador",
    descripcion: "Administrador del sistema",
  },
  {
    id_grupo_usuario: 3,
    nombre: "Cliente",
    descripcion: "Administrador del sistema",
  },
];
export const usuarios = [
  {
    id_perfil: 1,
    id_estado: 1,
    usuario: "ArturoAMejia",
    id_persona: 1,
    correo: "arturo@gmail.com",
    password: "$2y$10$5GV7mc8fYfP33xtcdf7.b../IpuVpElyLb1eAt1O.vch8jM4mylaq",
    id_rol: 1,
  },
  {
    id_perfil: 1,
    id_estado: 1,
    usuario: "abel@gmail.com",
    id_persona: 2,
    correo: "abel@gmail.com",
    password: "$2y$10$5GV7mc8fYfP33xtcdf7.b../IpuVpElyLb1eAt1O.vch8jM4mylaq",
    id_rol: 2,
  },
  {
    id_perfil: 1,
    id_estado: 1,
    usuario: "ivan@gmail.com",
    id_persona: 3,
    correo: "ivan@gmail.com",
    password: "$2y$10$5GV7mc8fYfP33xtcdf7.b../IpuVpElyLb1eAt1O.vch8jM4mylaq",
    id_rol: 3,
  },
  {
    id_perfil: 1,
    id_estado: 1,
    usuario: "katherine@gmail.com",
    id_persona: 4,
    correo: "katherine@gmail.com",
    password: "$2y$10$5GV7mc8fYfP33xtcdf7.b../IpuVpElyLb1eAt1O.vch8jM4mylaq",
    id_rol: 4,
  },
  {
    id_perfil: 1,
    id_estado: 1,
    usuario: "fernanda@gmail.com",
    id_persona: 5,
    correo: "fernanda@gmail.com",
    password: "$2y$10$5GV7mc8fYfP33xtcdf7.b../IpuVpElyLb1eAt1O.vch8jM4mylaq",
    id_rol: 5,
  },
];
