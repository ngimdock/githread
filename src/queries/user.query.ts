import { getAuthRequiredSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const finduser = async () => {
  const { user } = await getAuthRequiredSession();

  const userDatabase = await prisma.user.findUniqueOrThrow({
    where: {
      id: user.id,
    },
  });

  return userDatabase;
};
