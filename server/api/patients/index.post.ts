import prisma from "@prisma/client";
const client = new prisma.PrismaClient({});

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const patient = await client.patient.create({
    data: {
      name: body.name,
      dob: body.dob,
      gender: body.gender,
      mobileNum: body.mobileNum,
      email: body.email,
      password: body.password,
    },
  });
  if (patient) {
    return { success: true, patient };
  } else {
    return {
      success: false,
      error: "An error occured!",
    };
  }
});
