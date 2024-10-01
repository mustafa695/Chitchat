import React, { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { getChannels, getMe, getUser } from "../api";
import { useChat } from "../pages/Chat";
import { AiOutlinePlus } from "react-icons/ai";
import AddChannelModal from "./AddChannelModal";
import { authError } from "../helper";
import { useNavigate } from "react-router-dom";

const ChatList = () => {
  const {
    setSelectedUser,
    selectedUser,
    user,
    onlineUsers,
    setChatUserData,
    setMessagesData,
    channelData,
    setChannelData,
    selectedChannel,
    setSelectedChannel,
  } = useChat();

  const [users, setUsers] = useState([]);
  const [openChannelModal, setOpenChannelModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchUsersChatList();
    fetchChannels();
    fetchMe();
  }, []);

  const fetchMe = async () => {
    try {
      const response = await getMe();
      if (typeof localStorage !== "undefined") {
        localStorage.setItem("userData", JSON.stringify(response.data?.data));
      }
    } catch (error) {
      authError(error, navigate);
    }
  };

  // Fetch Users for Chat....
  const fetchUsersChatList = async () => {
    try {
      const response = await getUser();
      setUsers(response.data);
      const chatUser = response.data?.filter((x) => x?._id !== user?._id)[0];
      setSelectedUser(chatUser?._id);
      setChatUserData(chatUser);
    } catch (error) {
      authError(error, navigate);
      console.log(error);
    }
  };

  // Fetch Channels

  const fetchChannels = async () => {
    try {
      const response = await getChannels();
      setChannelData(response.data?.data);
    } catch (error) {
      authError(error, navigate);
      console.log(error);
    }
  };

  const handleSelectUserChat = (item) => {
    setSelectedUser(item?._id);
    setChatUserData(item);
    setMessagesData([]);
    setSelectedChannel(null);
  };

  return (
    <div
      className="min-w-80 max-w-80 h-svh bg-white flex flex-col"
      style={{
        boxShadow: "0 2px 4px rgba(15,34,58,.12)",
      }}
    >
      <div className="px-5 pt-2">
        <h3 className="text-[#495057] font-medium text-[22px] mb-5">Chats</h3>
        <div className="flex items-center gap-2 bg-[#f6f6f9] py-2.5 px-4 min-h-10 rounded-md">
          <input
            type="text"
            className="flex-1 outline-none text-sm text-black bg-transparent"
            placeholder="Search here.."
          />
          <BiSearch size={16} className="text-black/70" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* =========== Direct Messages ========= */}
        <p className="uppercase text-[#495057bf] text-xs font-semibold px-4 mt-12 mb-4">
          Direct Messages
        </p>
        {users
          ?.filter((x) => x?._id !== user?._id)
          .map((item, index) => (
            <div
              className={`py-2 px-6 ${
                item?._id === selectedUser ? "bg-[#6153cc]" : "bg-white"
              }`}
              key={index}
              onClick={() => handleSelectUserChat(item)}
            >
              <div className="flex items-center gap-2 w-full cursor-pointer">
                <div className="relative">
                  <img
                    src={item?.profileImage}
                    alt="profile"
                    className="size-7 rounded-full"
                  />
                  {/*  ======= Active status =========  */}
                  <div
                    className={`size-2 border-2 border-white rounded-full absolute bottom-0 -right-0.5 ${
                      onlineUsers && onlineUsers[item?._id]
                        ? "bg-[#06d6a0]"
                        : "bg-gray-300"
                    }`}
                  ></div>
                </div>
                <p
                  className={`${
                    item?._id === selectedUser
                      ? "text-white font-medium"
                      : "text-[#495057]"
                  } text-sm`}
                >
                  {item?.name}
                </p>
              </div>
            </div>
          ))}

        {/* ============ Channels ============ */}
        <div className="mt-14 w-full">
          <div className="flex items-center gap-2 justify-between px-4 mb-2">
            <p className="uppercase text-[#495057bf] text-xs font-semibold">
              Channels
            </p>
            <button
              type="button"
              onClick={() => setOpenChannelModal(true)}
              className="py-1 px-2 bg-[#6153cc1a] size-8 flex items-center justify-center rounded-sm"
            >
              <AiOutlinePlus size={14} color="#6153cc" />
            </button>
          </div>

          {channelData?.length
            ? channelData?.map((item) => (
                <div
                  className={`flex items-center gap-4 px-4 py-2.5 cursor-pointer ${
                    item?._id === selectedChannel ? "bg-[#6153cc]" : "bg-white"
                  }`}
                  key={item?._id}
                  onClick={() => {
                    setSelectedChannel(item?._id);
                    setSelectedUser(null);
                  }}
                >
                  <p
                    className={`text-[#495057] font-medium text-sm ${
                      item?._id === selectedChannel && "text-white"
                    }`}
                  >
                    #
                  </p>
                  <p
                    className={`text-[#495057] font-medium text-sm ${
                      item?._id === selectedChannel && "text-white"
                    }`}
                  >
                    {item?.name}
                  </p>
                </div>
              ))
            : null}
        </div>
      </div>

      <AddChannelModal
        isOpen={openChannelModal}
        handleSuccess={() => setOpenChannelModal(false)}
        onClose={() => setOpenChannelModal(false)}
      />
    </div>
  );
};

export default ChatList;
