import prisma from "@prisma/client";
const client = new prisma.PrismaClient({});

export default defineEventHandler(async (event) => {
  const appointments = await client.appointment.findMany({
    where: {
      OR: [
        { patientId: event.context.params.userId },
        { docId: event.context.params.userId },
      ],
    },
  });

  if (appointments) {
    return { success: true, appointments };
  } else {
    return {
      success: false,
      error: "An error occured!",
    };
  }
});
