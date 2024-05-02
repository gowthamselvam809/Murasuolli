import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { pageRoutes } from "../../helper";

// import AvatarIcon from "../../assets/defaultAvatar.jpg";
import BellIocn from "../../assets/bell.png";
import NotificationRedAlertIcon from "../../assets/NotificationRedAlertIcon.png";
import profile from '../../assets/profile.png'
// import { profileImageUrl } from "../../api/apiRegister";

const TopNavBar = () => {
  const navigate = useNavigate();
  const count = useSelector((state) => state.notification.value)
  const [alert, setAlert] = useState(true);
  // const [imageUrl, setImageUrl] = useState("");

  // const fetchImageUrl = async () => {
  //   try {
  //     // const Imageresponse = await profileImageUrl();
  //     console.log({ Imageresponse });
  //     setImageUrl(Imageresponse.Items.fileUploadUrl[0].uploadUrl.split("?")[0]);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchImageUrl();
  // }, []);

  return (
    <div className="top-nav__container">
      <div className="notification" onClick={() => setAlert(!alert)}>
        {/* {count.length > 0 && <span className="notification_count"></span>}
        <img alt="profile" className="bell-img" src={BellIocn} /> */}
        {/* {alert && <img src={NotificationRedAlertIcon} alt="" className="notification__alert" />} */}
      </div>
      {/* <img alt="profileIcon" className="profile-img" src={profile} onClick={() => { navigate(pageRoutes.profile) }} /> */}
      <img alt="profileIcon" className="profile-img" src={profile} />
    </div>
  )
}

export { TopNavBar };