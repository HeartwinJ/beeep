import prisma from "@prisma/client";
const client = new prisma.PrismaClient({});

export default defineEventHandler(async (event) => {
  const patient = await client.patient.findFirst({
    where: { id: event.context.params.patientId },
  });
  if (patient) {
    return { success: true, patient };
  } else {
    return {
      success: false,
      error: "An error occured!",
    };
  }
});
