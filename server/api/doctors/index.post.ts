import prisma from "@prisma/client";
const client = new prisma.PrismaClient({});

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const doctor = await client.doctor.create({
    data: {
      name: body.name,
      dob: body.dob,
      gender: body.gender,
      specialization: body.specialization,
      email: body.email,
      password: body.password,
    },
  });
  if (doctor) {
    return { success: true, doctor };
  } else {
    return {
      success: false,
      error: "An error occured!",
    };
  }
});
