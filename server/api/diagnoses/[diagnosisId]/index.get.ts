import prisma from "@prisma/client";
const client = new prisma.PrismaClient({});

export default defineEventHandler(async (event) => {
  const diagnosis = await client.diagnosis.findFirst({
    where: { id: event.context.params.diagnosisId },
  });
  if (diagnosis) {
    return { success: true, diagnosis };
  } else {
    return {
      success: false,
      error: "An error occured!",
    };
  }
});
