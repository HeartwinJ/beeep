import prisma from "@prisma/client";
const client = new prisma.PrismaClient({});

export default defineEventHandler(async (event) => {
  const recordings = await client.recording.findMany({
    where: { patientId: event.context.params.patientId },
  });
  if (recordings) {
    return { success: true, recordings };
  } else {
    return {
      success: false,
      error: "An error occured!",
    };
  }
});
