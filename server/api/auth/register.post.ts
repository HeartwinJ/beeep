import prisma from "@prisma/client";
import bcrypt from "bcrypt";
const client = new prisma.PrismaClient({});

export default defineEventHandler(async (event) => {
  const body = await useBody(event);

  const encPass = await bcrypt.hash(body.password, 10);
  const user = await client.patient.create({
    data: {
      name: body.name,
      dob: body.dob,
      gender: body.gender,
      mobileNum: body.mobileNum,
      email: body.email,
      password: encPass,
    },
  });
  if (user) {
    return { success: true, user };
  } else {
    return {
      success: false,
      error: "An error occured!",
    };
  }
});
