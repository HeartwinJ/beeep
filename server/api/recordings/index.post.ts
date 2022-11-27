import prisma from "@prisma/client";
const client = new prisma.PrismaClient({});

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const recording = await client.recording.create({
    data: {
     patientId: body.patientId,
     url:body.url
    },
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
