import React, { Fragment, useState } from "react";
import { ChatLogo } from "../constant/icons";
import { FaRegCircleUser } from "react-icons/fa6";
import { BiChat } from "react-icons/bi";
import { useChat } from "../pages/Chat";
import { RiContactsLine, RiLogoutCircleLine } from "react-icons/ri";
import { MdOutlineBookmarks } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";

const Sidebar = () => {
  const { setActiveSideMenu, activeSideMenu } = useChat();

  const [openProfile, setOpenProfile] = useState(false);

  const menuItems = [
    {
      title: "profile",
      icon: <FaRegCircleUser size={24} color="#878a92" />,
    },
    {
      title: "chat",
      icon: <BiChat size={26} color="#878a92" />,
    },
    {
      title: "contact",
      icon: <RiContactsLine size={24} color="#878a92" />,
    },
    {
      title: "bookmark",
      icon: <MdOutlineBookmarks size={24} color="#878a92" />,
    },
    {
      title: "settings",
      icon: <IoSettingsOutline size={24} color="#878a92" />,
    },
  ];

  const menuActions = [
    {
      title: "profile",
      icon: <FaRegCircleUser size={14} color="#495057bf" />,
    },
    {
      title: "settings",
      icon: <IoSettingsOutline size={14} color="#495057bf" />,
    },
    {
      title: "logout",
      icon: <RiLogoutCircleLine size={15} color="#495057bf" />,
    },
  ];
  return (
    <div className="bg-[#2e2e2e] h-full min-h-lvh min-w-20 max-w-20 flex flex-col">
      <div className="flex flex-col gap-4 py-2 flex-1">
        <div className="w-full flex justify-center">
          <ChatLogo />
        </div>
        <div className="flex flex-col gap-2 items-center mt-2">
          {menuItems.map((item, index) => (
            <button
              className={`w-full h-14 flex justify-center items-center ${
                activeSideMenu === item.title && "active"
              }`}
              key={index}
              onClick={() => setActiveSideMenu(item?.title)}
            >
              {item?.icon}
            </button>
          ))}
        </div>

        <div className="flex-1 flex flex-col justify-end items-center mb-4">
          <div className="relative">
            <button type="button" onClick={() => setOpenProfile(!openProfile)}>
              <img
                src="https://themesbrand.com/doot/layouts/assets/images/users/avatar-3.jpg"
                alt="profileImage"
                className="size-9 rounded-full border-2 border-white"
              />
            </button>
            {openProfile && (
              <div className="absolute -top-36 -left-4 w-full bg-white shadow-md drop-shadow-md px-4 min-w-40 py-2">
                {menuActions.map((item, index) => (
                  <Fragment key={index}>
                    <button className="text-[#495057] capitalize font-medium text-sm flex items-center gap-2 justify-between w-full py-2">
                      {item.title} {item.icon}
                    </button>
                    {index === 1 && (
                      <hr className="border-b border-b-[#eaeaf1] my-2" />
                    )}
                  </Fragment>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
