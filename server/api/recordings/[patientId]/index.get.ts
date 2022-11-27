import prisma from "@prisma/client";
const client = new prisma.PrismaClient({});

export default defineEventHandler(async (event) => {
  const recording = await client.recording.findFirst({
    where: { patientId: event.context.params.patientId },
  });
  if (recording) {
    return { success: true, recording };
  } else {
    return {
      success: false,
      error: "An error occured!",
    };
  }
});
