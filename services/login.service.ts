"use server";
import { PrismaClient } from "@prisma/client";

export const login = async (username: string, password: string) => {
  const prismaClient = new PrismaClient();
  // Verifica que el username y el password no sean vacíos
  if (!username || !password) {
    throw new Error("Username and password are required");
  }

  // Busca el usuario en la base de datos
  const user = await prismaClient.usuario.findUnique({
    where: { username: username },
  });

  // Verifica si el usuario existe
  if (!user) {
    throw new Error("Usuario no encontrado");
  }

  // Compara la contraseña proporcionada con la almacenada en la base de datos
  const isMatch = password == user.password;

  // Si la contraseña no coincide, lanza un error
  if (!isMatch) {
    throw new Error("Contraseña incorrecta");
  }

  // Aquí puedes devolver el usuario o cualquier información que necesites
  return user;
};