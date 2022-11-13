import prisma from "@prisma/client";
const client = new prisma.PrismaClient({});

export default defineEventHandler(async (event) => {
  const body = await useBody(event);
  const appoinment = await client.appointment.create({
    data: {
      startTime: body.startTime,
      endTime: body.endTime,
      status: body.status,
      docId: body.docId,
      patientId: body.patientId,
    },
  });
  if (appoinment) {
    return { success: true, appoinment };
  } else {
    return {
      success: false,
      error: "An error occured!",
    };
  }
});
