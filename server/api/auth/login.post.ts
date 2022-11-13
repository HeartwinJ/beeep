import prisma from "@prisma/client";
import bcrypt from "bcrypt";
const client = new prisma.PrismaClient({});

export default defineEventHandler(async (event) => {
  const body = await useBody(event);
  let user;
  if (body.accountType === "DOCTOR") {
    user = await client.doctor.findUnique({
      where: { email: body.email },
      include: { appointments: true, diagnoses: true },
    });
  } else {
    user = await client.patient.findUnique({
      where: { email: body.email },
      include: { appointments: true },
    });
  }
  if (user) {
    const success = await bcrypt.compare(body.password, user.password);
    return {
      success,
      user: success ? { accountType: body.accountType, ...user } : null,
    };
  } else {
    return {
      success: false,
      error: "An error occured!",
    };
  }
});
