"use server";

import { getAuthRequiredSession } from "@/lib/auth";
import { EditProfileFormType } from "./profile-form";

export const editProfile = async (values: EditProfileFormType) => {
  const { user } = await getAuthRequiredSession();

  const updatedUser = await prisma?.user.update({
    where: {
      id: user.id,
    },
    data: {
      ...values,
    },
    select: {
      id: true,
    },
  });

  return updatedUser?.id;
};
