import React, { useEffect, useState } from "react";
import { useChat } from "../../pages/Chat";
import { PiHandWavingLight } from "react-icons/pi";
import { formatIsoDateTo12Hour } from "../../helper";
import Dropdown from "../Dropdown";

const Messages = ({ loading, handleDeleteMessage, handleEditMessage }) => {
  const { user, messagesData, socket, setMessagesData } = useChat();
  const [socketRemoveMessage, setSocketRemoveMessage] = useState([]);

  useEffect(() => {
    // Listen for delete messages
    socket.on("deleteMessage", (messageId) => {
      setSocketRemoveMessage((preveData) => [...preveData, messageId]);
    });

    // Listen for update message
    socket.on("updateMessage", (updateMessage) => {
      const findMessage = messagesData?.findIndex(
        (x) => x?._id == updateMessage?._id
      );

      if (findMessage !== -1) {
        const messages = [...messagesData];
        messages[findMessage].content = updateMessage?.content;
        setMessagesData(messages);
      }
    });

    return () => {
      socket.off("deleteMessage");
      socket.off("updateMessage");
    };
  }, [socket, messagesData]);

  // Chat action three dot icons: Edit or Delete Messages
  const handleActionDropdown = (action, message) => {
    if (action === "Delete") {
      handleDeleteMessage(message?._id);
    } else {
      handleEditMessage({
        _id: message?._id,
        content: message?.content,
      });
    }
  };

  return (
    <div className="flex flex-col gap-8 p-6 flex-1">
      {messagesData.length
        ? messagesData?.map((item) =>
            (item?.sender?._id || item?.sender) != user?._id ? (
              //   ===== Reciver End Message ====
              <div
                className={`flex items-end gap-2 w-3/4 ${
                  socketRemoveMessage.includes(item?._id) && "hidden"
                }`}
                key={item?._id}
              >
                <img
                  src="https://themesbrand.com/doot/layouts/assets/images/users/avatar-3.jpg"
                  alt="profile"
                  className="size-7 rounded-full mr-3"
                />
                <div>
                  <div
                    className="py-3 px-5 bg-white rounded mb-3.5"
                    style={{
                      boxShadow: "0 2px 4px rgba(15,34,58,.12)",
                    }}
                  >
                    <p className="text-[#495057] text-sm">{item?.content}</p>
                  </div>
                  <p className="text-[#495057bf] text-xs font-medium">
                    {formatIsoDateTo12Hour(item?.createdAt)}
                  </p>
                </div>
              </div>
            ) : (
              // Sender Message
              <div className="flex justify-end" key={item?._id}>
                <div className="max-w-[75%] flex items-stretch gap-2">
                  <Dropdown
                    options={["Edit", "Delete"]}
                    handleSelectOption={(option) =>
                      handleActionDropdown(option, item)
                    }
                  />
                  <div>
                    <div className="bg-[#6153cc3b] py-3 px-5 w-full rounded-md">
                      <p className="text-[#495057] text-sm">{item?.content}</p>
                    </div>
                    <p className="text-[#495057bf] text-xs font-medium text-right mt-2">
                      {formatIsoDateTo12Hour(item?.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
            )
          )
        : //NO Messages
          !loading && (
            <div className="flex-1 flex flex-col justify-end w-full items-center">
              <div className="flex items-center gap-2 w-full justify-center">
                <p className="text-[#495057] font-medium text-sm text-center">{`Looks like you haven’t sent any messages. Say hello!`}</p>
                <PiHandWavingLight size={30} color="##efbf08" />
              </div>
              <p className="text-[#495057bf] text-xs mt-2">
                Connect, share, and discover by sending your first message.
              </p>
            </div>
          )}
    </div>
  );
};

export default Messages;
