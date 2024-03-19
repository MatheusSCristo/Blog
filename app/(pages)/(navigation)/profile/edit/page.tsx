"use client";
import { storage } from "@/app/api/firebase/storage";
import { UserContext } from "@/app/context/userSession";
import { profileUserType } from "@/types/types";
import getUserInfo from "@/utils/getUserInformation";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { IoPersonCircle } from "react-icons/io5";
import { updateUserInfo } from "./utils/updateUser";
import { CircularProgress } from "@mui/material";

type values = {
  username: string | undefined;
  bio?: string | undefined;
  displayName?: string | undefined;
  imgUrl?: string | undefined;
};
const initialState: values = {
  username: "",
  bio: "",
  displayName: "",
  imgUrl: "",
};

type messageType = {
  error: boolean;
  message: string;
};

const EditProfile = () => {
  const [values, setValues] = useState<values>(initialState);
  const [message, setMessage] = useState<messageType | undefined>(
    {} as messageType
  );
  const [userInfos, setUserInfos] = useState<profileUserType>(
    {} as profileUserType
  );
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [backgroundImageUrl, setBackgroundImageUrl] = useState("");
  const { currentUser } = useContext(UserContext);
  const [loadingProfileImage, setLoadingProfileImage] = useState(true);
  const [loadingBackgroundImage, setLoadingBackgroundImage] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const getUserInfos = async () => {
      const res = await getUserInfo(currentUser.id);
      setUserInfos(res.data);
      setLoadingProfileImage(false);
      setLoadingBackgroundImage(false);
    };
    if (currentUser?.id) {
      getUserInfos();
    }
  }, [currentUser]);

  const handleChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((prevState: values) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const editProfileImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoadingProfileImage(true);
    if (!e.target.files) return;
    const id = currentUser.id;
    const path = `/UserImages/${id}/profileImage.png`;
    const reference = ref(storage, path);
    const uploadTask = uploadBytesResumable(reference, e.target.files[0]);
    getDownloadURL(uploadTask.snapshot.ref).then((url) => {
      setProfileImageUrl(url);
      setUserInfos((prevState) => ({
        ...prevState,
        profileImg: url,
      }));
      setLoadingProfileImage(false);
    });
  };

  const editBackgroundImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoadingBackgroundImage(true);
    if (!e.target.files) return;
    const id = currentUser.id;
    const path = `/UserImages/${id}/backgroundImage.png`;
    const reference = ref(storage, path);
    const uploadTask = uploadBytesResumable(reference, e.target.files[0]);
    getDownloadURL(uploadTask.snapshot.ref).then((url) => {
      setBackgroundImageUrl(url);
      setUserInfos((prevState) => ({
        ...prevState,
        bgImg: url,
      }));
      setLoadingBackgroundImage(false);
    });
  };

  const handleUpdateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    const res = await updateUserInfo({
      e,
      values,
      currentUser,
      profileImageUrl,
      backgroundImageUrl,
    });
    setMessage(res);
    if (!res.error) {
      setTimeout(() => {
        router.push("/profile");
      }, 1500);
    }
  };

  return (
    <section className="w-full mx-16 min-h-max bg-white relative">
      <div className="h-1/5  w-full relative">
        {loadingBackgroundImage && (
          <div className="w-full h-full flex items-center justify-center bg-slate-500 absolute">
            <CircularProgress />
          </div>
        )}
        {userInfos.bgImg && !loadingBackgroundImage && (
          <Image
            src={userInfos.bgImg}
            fill={true}
            alt="Imagem de fundo do usuário"
          />
        )}
        {!userInfos.bgImg && !loadingBackgroundImage && (
          <div className="h-full w-full bg-slate-500 absolute" />
        )}

        <div className="absolute z-[10] right-0 m-5 p-2 flex items-center gap-2 rounded-lg cursor-pointer">
          <label
            htmlFor="bgFile"
            className="bg-lightBlue rounded text-white hover:scale-105  p-3 "
          >
            Trocar foto de fundo
          </label>
          <input
            type="file"
            id="bgFile"
            accept="image/png, image/jpeg"
            multiple
            className="hidden"
            onChange={editBackgroundImage}
          />
        </div>
      </div>
      <div className="  p-0 absolute z-10 top-32 left-10 flex items-center justify-center rounded gap-2">
        {loadingProfileImage && (
          <div className="p-2 w-[100px] h-[100px] rounded-full bg-white flex items-center justify-center">
            <CircularProgress />
          </div>
        )}
        {userInfos?.profileImg && !loadingProfileImage && (
          <div className="w-[100px] h-[100px] relative ">
            <Image
              src={userInfos.profileImg}
              alt="Imagem de perfil"
              className="object-cover rounded-full"
              fill
            />
          </div>
        )}
        {!loadingProfileImage && !userInfos.profileImg && (
          <IoPersonCircle size={100} />
        )}
        <label
          htmlFor="profileFile"
          className="bg-lightBlue rounded text-white hover:scale-105 self-end p-3 "
        >
          Trocar foto de perfil
        </label>
        <input
          type="file"
          id="profileFile"
          accept="image/png, image/jpeg"
          multiple
          className="hidden"
          onChange={editProfileImage}
        />
      </div>
      <div className="my-16 p-10">
        <form
          className="grid grid-cols-2 gap-5 grid-rows-3"
          onSubmit={handleUpdateUser}
        >
          <div className="flex flex-col w-4/5">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              className="p-3 bg-gray-100 border border-slay-500 rounded "
              onChange={handleChanges}
              placeholder={userInfos?.username}
            />
          </div>
          <div className="flex flex-col w-4/5">
            <label htmlFor="displayName">Display Name </label>
            <input
              type="text"
              name="displayName"
              className="p-3 bg-gray-100 border border-slay-500 rounded "
              onChange={handleChanges}
              placeholder={userInfos.displayName}
            />
          </div>
          <div className="flex flex-col w-4/5">
            <label htmlFor="bio">Bio</label>
            <input
              type="text"
              name="bio"
              className="p-3 bg-gray-100 border border-slay-500 rounded "
              onChange={handleChanges}
              placeholder={userInfos.bio}
            />
          </div>
          <div className="flex row-start-3 gap-2 mx-5 flex-col">
            <div className="flex gap-5">
              <button
                type="submit"
                className="bg-lightBlue p-2 rounded-lg text-white hover:scale-105 hover:bg-lime-400 hover:text-white"
              >
                Salvar mudanças
              </button>
              <Link
                href={"/profile"}
                className="bg-white p-2 border border-lightBlue text-lightBlue rounded-lg hover:bg-red-600 hover:scale-105 hover:text-white"
              >
                Cancelar
              </Link>
            </div>
            {message?.message && (
              <span
                className={`text-md ${
                  message?.error ? "text-red" : "text-emerald-400"
                }`}
              >
                {message?.message}
              </span>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};

export default EditProfile;
