import prisma from "@prisma/client";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";

dayjs.extend(isBetween);

const client = new prisma.PrismaClient({});

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const _appointments = await client.appointment.findMany({
    where: { docId: body.docId },
  });

  const isBusy = _appointments.some(
    (el) =>
      dayjs(body.startTime).isBetween(
        el.startTime,
        el.endTime,
        "minute",
        "[]"
      ) ||
      dayjs(body.endTime).isBetween(el.startTime, el.endTime, "minute", "[]")
  );

  if (isBusy) {
    return { success: false, error: "Doctor is busy!" };
  }

  const appoinment = await client.appointment.create({
    data: {
      startTime: body.startTime,
      endTime: body.endTime,
      status: body.status,
      title: body.title,
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
