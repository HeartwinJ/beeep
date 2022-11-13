import prisma from "@prisma/client";
const client = new prisma.PrismaClient({});

export default defineEventHandler(async (event) => {
  const body = await useBody(event);
  const appointment = await client.appointment.update({
    where: { id: event.context.params.appointmentId },
    data: {
      startTime: body.startTime,
      endTime: body.endTime,
      status: body.status,
      title: body.title,
    },
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
