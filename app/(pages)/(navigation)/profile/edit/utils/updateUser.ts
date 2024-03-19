
import revalidateAllData from "@/utils/revalidateData";

type updateUserInfoParams = {
  e: React.FormEvent<HTMLFormElement>;
  values: {
    username: string | undefined;
    bio?: string | undefined;
    displayName?: string | undefined;
    imgUrl?: string | undefined;
  };
  currentUser: {
    id: string;
  };
  profileImageUrl: string;
  backgroundImageUrl?: string | undefined;
};

export const updateUserInfo = async ({
  e,
  values,
  currentUser,
  profileImageUrl,
  backgroundImageUrl,
}: updateUserInfoParams) => {
  e.preventDefault();
  if (!values) {
    return { error: true, message: "É preciso alterar algum campo!" };
  }

  const res = await fetch("/api/updateUser", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: currentUser.id,
      ...values,
      profileImg: profileImageUrl,
      bgImg:backgroundImageUrl
    }),
  });
  if (!res.ok) {
    if (res.status == 409) {
      return {
        error: true,
        message:
          "O nome de usuário já está em uso, escolha outro e tente novamente.",
      };
    } else {
      return {
        error: true,
        message:
          "Ocorreu um erro ao atualizar as informações, tente novamente mais tarde.",
      };
    }
  }
  revalidateAllData();
  return {
    error: false,
    message: "Informações alteradas com sucesso!",
  };
};
