import prisma from "@prisma/client";
const client = new prisma.PrismaClient({});

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  let appointments;
  if (query.status) {
    appointments = await client.appointment.findMany({
      where: { status: query.status as string },
    });
  } else {
    appointments = await client.appointment.findMany();
  }
  if (appointments) {
    return { success: true, appointments };
  } else {
    return {
      success: false,
      error: "An error occured!",
    };
  }
});
