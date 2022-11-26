import prisma from "@prisma/client";
import * as jose from "jose";
import bcrypt from "bcrypt";
const client = new prisma.PrismaClient({});

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
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
  const token = await new jose.SignJWT({
    id: user!.id,
    name: user!.name,
    email: user!.email,
    createdAt: user!.createdAt,
    updatedAt: user!.updatedAt,
  })
    .setProtectedHeader({
      alg: "HS256",
      typ: "JWT",
    })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(new TextEncoder().encode(process.env.JWT_TOKEN_SECRET));

  if (user) {
    const success = await bcrypt.compare(body.password, user.password);
    return {
      success,
      user: success ? { accountType: body.accountType, ...user, token } : null,
    };
  } else {
    return {
      success: false,
      error: "An error occured!",
    };
  }
});
