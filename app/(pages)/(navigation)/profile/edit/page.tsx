"use client";
import { storage } from "@/app/api/firebase/storage";
import { UserContext } from "@/app/context/userSession";
import { profileUserType } from "@/types/types";
import getUserInfo from "@/utils/getUserInformation";
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";
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
  const { currentUser } = useContext(UserContext);
  const [loadingProfileImage, setLoadingProfileImage] = useState(true);
  const [loadingBackgroundImage, setLoadingBackgroundImage] = useState(true);
  const [profileImageFile, setProfileImageFile] = useState<File>();
  const [backgroundImageFile, setBackgroundImageFile] = useState<File>();
  const [uploadLoading, setUploadLoading] = useState(false);

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

  const handleUploadProfileImage = async (file: File) => {
    setLoadingProfileImage(true);
    if (!file) return;
    setProfileImageFile(file);
    setUserInfos((prevState) => ({
      ...prevState,
      profileImg: URL.createObjectURL(file),
    }));

    setLoadingProfileImage(false);
  };

  const editBackgroundImage = async (file: File) => {
    setLoadingBackgroundImage(true);
    if (!file) return;
    setBackgroundImageFile(file);
    setUserInfos((prevState) => ({
      ...prevState,
      bgImg: URL.createObjectURL(file),
    }));
    setLoadingBackgroundImage(false);
  };

  const handleUploadImages = async (file: File | undefined, path: string) => {
    if (file) {
      const reference = ref(storage, path);
      const uploadTask = await uploadBytesResumable(reference, file);
      const url = await getDownloadURL(uploadTask.ref);
      return url;
    } else {
      return undefined;
    }
  };

  const handleUpdateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUploadLoading(true);
    let profileImageUrl: string;
    let backgroundImageUrl: string;
    const uploadPromises = [];

    uploadPromises.push(
      handleUploadImages(
        profileImageFile,
        `/UserImages/${currentUser.id}/profileImage.png`
      )
    );
    uploadPromises.push(
      handleUploadImages(
        backgroundImageFile,
        `/UserImages/${currentUser.id}/backgroundImage.png`
      )
    );

    Promise.all(uploadPromises).then(async (data) => {
      if (data[0]) profileImageUrl = data[0];
      if (data[1]) backgroundImageUrl = data[1];
      const res = await updateUserInfo({
        e,
        values,
        currentUser,
        profileImageUrl,
        backgroundImageUrl,
      });
      setMessage(res);
      setUploadLoading(false);
      if (!res.error) {
        setTimeout(() => {
          router.push("/profile");
        }, 1500);
      }
    });
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
            className="bg-darkBlue rounded text-white hover:scale-105  p-3 "
          >
            Trocar foto de fundo
          </label>
          <input
            type="file"
            id="bgFile"
            accept="image/png, image/jpeg"
            multiple
            className="hidden"
            onChange={(event) => {
              if (event.target.files)
                editBackgroundImage(event.target.files[0]);
            }}
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
          <IoPersonCircle size={100} className="bg-white rounded-full" />
        )}
        <label
          htmlFor="profileFile"
          className="bg-darkBlue rounded text-white hover:scale-105 self-end p-3 "
        >
          Trocar foto de perfil
        </label>
        <input
          type="file"
          id="profileFile"
          accept="image/png, image/jpeg"
          multiple
          className="hidden"
          onChange={(event) => {
            if (event.target.files)
              handleUploadProfileImage(event.target.files[0]);
          }}
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
                className="bg-darkBlue p-2 rounded-lg text-white hover:scale-105 hover:bg-lime-400 hover:text-white"
              >
                Salvar mudanças
              </button>
              <Link
                href={"/profile"}
                className="bg-white p-2 border border-darkBlue text-darkBlue rounded-lg hover:bg-red-600 hover:scale-105 hover:text-white"
              >
                Cancelar
              </Link>
              {uploadLoading && (
                <CircularProgress className="w-[50px] h-[50px]" />
              )}
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
