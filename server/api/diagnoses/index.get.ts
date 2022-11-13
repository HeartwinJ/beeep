import prisma from "@prisma/client";
const client = new prisma.PrismaClient({});

export default defineEventHandler(async (event) => {
  const diagnoses = await client.diagnosis.findMany();
  if (diagnoses) {
    return { success: true, diagnoses };
  } else {
    return {
      success: false,
      error: "An error occured!",
    };
  }
});
