import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { pageRoutes } from "../../helper";

// import AvatarIcon from "../../assets/defaultAvatar.jpg";
import BellIcon from "../../assets/bell.png";
import NotificationRedAlertIcon from "../../assets/NotificationRedAlertIcon.png";
import profile from '../../assets/profile.png';
// import { profileImageUrl } from "../../api/apiRegister";

const TopNavBar = () => {
  const navigate = useNavigate();
  const count = useSelector((state) => state.notification.value);
  const [alert, setAlert] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (date) => {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <div className="top-nav__container">
      {/* <div className="notification"> */}
      {/* {count.length > 0 && <span className="notification_count"></span>}
        <img alt="profile" className="bell-i  mg" src={BellIcon} /> */}
      {/* {alert && <img src={NotificationRedAlertIcon} alt="" className="notification__alert" />} */}
      {/* </div> */}
      <div style={{ fontWeight: 'bold', fontSize: 20 }}>Magazine Circulation</div>
      <div style={{ fontWeight: 'bold' }}>{sessionStorage.getItem('financialName')}</div>
      <div style={{ fontWeight: 'bold', fontSize: 20, color: "red" }}>{formatTime(currentTime)}</div>
      {/* <img alt="profileIcon" className="profile-img" src={profile} onClick={() => { navigate(pageRoutes.profile) }} /> */}
      <div className="d-flex flex-direction-row gap-2 align-items-center">
        <div className="d-flex flex-column ">
          <span className="" style={{ fontWeight: 'bold' }}>{sessionStorage.getItem('userName')}</span>
          <span className="" style={{ fontWeight: 'bold', color: "blueviolet" }}>{currentTime.toLocaleDateString()}</span>
        </div>
        <img alt="profileIcon" className="profile-img" src={profile} />
      </div>
    </div>
  );
};

export { TopNavBar };
