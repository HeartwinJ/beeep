import prisma from "@prisma/client";
const client = new prisma.PrismaClient({});

export default defineEventHandler(async (event) => {
  const doctors = await client.doctor.findMany();
  if (doctors) {
    return { success: true, doctors };
  } else {
    return {
      success: false,
      error: "An error occured!",
    };
  }
});