import React, { useEffect, useState } from "react";

import { UpdateForm } from "./UpdateForm";

import { getProfile } from "../../api/apiRegister";
import { UpdateProfileSceleton, isEmptyObject } from "../../utils";

const ProfileForm = () => {
  const [userProfile, setUserProfile] = useState({});

  const handleGetUser = async () => {
    const user = await getProfile();
    !isEmptyObject(user) && setUserProfile(user.Items)
  }

  useEffect(() => {
    handleGetUser();
  }, [])

  return (
    <div className="formik-conatiner">
      {!isEmptyObject(userProfile) ? <UpdateForm userProfile={userProfile} /> : <UpdateProfileSceleton />}
    </div >
  );
};

export { ProfileForm };