import prisma from "@prisma/client";
const client = new prisma.PrismaClient({});

export default defineEventHandler(async (event) => {
  const diagnosis = await client.diagnosis.findFirst({
    where: { appointmentId: event.context.params.appointmentId },
    include: { doctor: true, patient: true, appointment: true },
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
