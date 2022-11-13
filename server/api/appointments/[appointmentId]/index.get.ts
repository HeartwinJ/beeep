import prisma from "@prisma/client";
const client = new prisma.PrismaClient({});

export default defineEventHandler(async (event) => {
  const appointment = await client.appointment.findFirst({
    where: { id: event.context.params.appointmentId },
    include: { patient: true, doctor: true },
  });
  if (appointment) {
    return { success: true, appointment };
  } else {
    return {
      success: false,
      error: "An error occured!",
    };
  }
});
