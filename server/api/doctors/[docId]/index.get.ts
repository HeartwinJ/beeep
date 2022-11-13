import prisma from "@prisma/client";
const client = new prisma.PrismaClient({});

export default defineEventHandler(async (event) => {
  const doctor = await client.doctor.findFirst({
    where: { id: event.context.params.docId },
  });
  if (doctor) {
    return { success: true, doctor };
  } else {
    return {
      success: false,
      error: "An error occured!",
    };
  }
});
