import prisma from "@prisma/client";
const client = new prisma.PrismaClient({});

export default defineEventHandler(async (event) => {
  const patients = await client.patient.findMany();
  if (patients) {
    return { success: true, patients };
  } else {
    return {
      success: false,
      error: "An error occured!",
    };
  }
});
