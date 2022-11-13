import prisma from "@prisma/client";
const client = new prisma.PrismaClient({});

export default defineEventHandler(async (event) => {
  const body = await useBody(event);
  const diagnosis = await client.diagnosis.create({
    data: {
      docId: body.docId,
      patientId: body.patientId,
      appointmentId: body.appointmentId,
      symptoms: body.symptoms,
      prescription: body.prescription,
      ailment: body.ailment,
      report: body.report,
    },
  });
  await client.appointment.update({
    where: { id: body.appointmentId },
    data: {
      status: "COMPLETE",
    },
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
