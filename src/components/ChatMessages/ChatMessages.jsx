import React, { useEffect, useRef, useState } from "react";
import { IoMdSend } from "react-icons/io";
import {
  createChannelMessage,
  deleteMessage,
  getChannelMessages,
  getMessages,
  sendMessage,
  updateMessage,
} from "../../api";
import { useChat } from "../../pages/Chat";
import { Loading } from "../../constant/icons";
import Messages from "./Messages";
import ChatActions from "./ChatActions";

const ChatMessages = () => {
  const {
    selectedUser,
    user,
    messagesData,
    setMessagesData,
    onlineUsers,
    chatUserData,
    selectedChannel,
    setSelectedChannel,
  } = useChat();
  const [skip, setSkip] = useState(0);
  const [message, setMessage] = useState("");
  const [editMessage, setEditMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [noMoreFetch, setNoMoreFetch] = useState(false);

  useEffect(() => {
    if (selectedUser) {
      fetchMessages();
    }
  }, [selectedUser, skip]);

  useEffect(() => {
    if (selectedChannel) {
      fetchChannelMessages();
    }
  }, [selectedChannel]);

  const chatEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom of the chat container
    if (chatEndRef.current && skip === 0) {
      chatEndRef?.current?.scrollIntoView();
    }
  }, [messagesData, skip]);

  useEffect(() => {
    const chatContainer = chatContainerRef?.current;

    const handleScroll = () => {
      if (chatContainer?.scrollTop === 0 && !loading && !noMoreFetch) {
        loadMoreMessages();
      }
    };

    if (chatContainer) {
      chatContainer?.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (chatContainer) {
        chatContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, [loading, noMoreFetch]);

  const loadMoreMessages = () => {
    setSkip((prevSkip) => prevSkip + 10); // Increment skip to load more messages
  };

  // Get all messages between two users, current user and the user which is selected to chat
  const fetchMessages = async () => {
    try {
      setLoading(true);
      if (!messagesData?.length) {
        setSkip(0);
      }
      const response = await getMessages(user, selectedUser, {
        limit: 10,
        skip,
      });
      // setMessagesData(response.data);
      if (response.data?.length < 1) {
        setNoMoreFetch(true);
      } else {
        setNoMoreFetch(false);
      }
      const messagesMerge = [...messagesData, ...response?.data];
      const sortMessages = messagesMerge?.sort(
        (a, b) => new Date(a?.createdAt) - new Date(b?.createdAt)
      );
      setMessagesData(sortMessages);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //Fetch Channe; Messages

  const fetchChannelMessages = async () => {
    try {
      setLoading(true);
      const response = await getChannelMessages(selectedChannel);
      setMessagesData(response.data?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Send Message to User.
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!editMessage) {
      if (selectedUser) {
        handleCreateMessage();
      } else {
        handleCreateChannelMessage();
      }
    } else {
      handleEditMessage();
    }
  };

  // Add new message
  const handleCreateMessage = async () => {
    try {
      if (!message) return;
      const data = {
        receiverId: selectedUser, //reciver id
        senderId: user, // userId
        content: message,
      };
      const response = await sendMessage(data);
      chatEndRef?.current?.scrollIntoView();
      setMessagesData((prevMessages) => [...prevMessages, response.data]);
      setMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  // Create Channel Message
  const handleCreateChannelMessage = async () => {
    if (selectedChannel) {
      try {
        const data = {
          chatRoom: selectedChannel,
          type: "text",
          sender: user,
          content: message,
        };
        const response = await createChannelMessage(data);
        setMessagesData((prevMessages) => [
          ...prevMessages,
          response.data?.data,
        ]);
        setMessage("");
      } catch (error) {
        console.log(error);
      }
    }
  };

  // Edit Message content
  const handleEditMessage = async () => {
    try {
      const { _id } = editMessage;
      const response = await updateMessage(_id, {
        content: message,
      });
      setEditMessage(null);
      setMessage("");
      const dupMessages = [...messagesData];
      const messageIndex = messagesData?.findIndex((x) => x?._id == _id);
      dupMessages[messageIndex].content = message;
      setMessagesData(dupMessages);
    } catch (error) {
      console.log(error);
    }
  };

  // Delete Message
  const handleDeleteMessage = async (id) => {
    try {
      await deleteMessage(id);
      const messages = messagesData?.filter((x) => x?._id != id);
      setMessagesData(messages);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-lvh flex-1 bg-[#f2f2f2] flex flex-col">
      {/* header  */}
      <div className="p-6 bg-[#ffffff0d] border-b border-b-[#eaeaf1]">
        {!selectedChannel ? (
          <div className="flex items-end gap-4 w-full cursor-pointer">
            <img
              src="https://themesbrand.com/doot/layouts/assets/images/users/avatar-3.jpg"
              alt="profile"
              className="size-10 rounded-full"
            />
            <div>
              <p className="text-[#495057] text-lg font-medium">
                {chatUserData?.name}
              </p>
              <p className="text-sm text-[#495057bf] pt-0.5">
                {onlineUsers && onlineUsers[selectedUser]
                  ? "Online"
                  : "Offline"}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-1">
            <p className="font-medium text-sm text-[#495057]">
              Channel # {selectedChannel}
            </p>
            <button type="button" className="text-[#6153cc] font-medium w-max text-sm">Add Members</button>
          </div>
        )}
      </div>

      {/* Loading  */}

      {loading && (
        <div className="flex items-center justify-center w-full bg-transparent my-2">
          <Loading />
        </div>
      )}

      {/* Messages  */}

      <div
        className="flex-1 overflow-y-auto chat-bg flex flex-col"
        ref={chatContainerRef}
      >
        <Messages
          loading={loading}
          handleDeleteMessage={handleDeleteMessage}
          handleEditMessage={(data) => {
            setEditMessage(data);
            setMessage(data?.content);
          }}
        />

        {/* Use to chat scroll to bottom  */}
        <div ref={chatEndRef} />
      </div>
      {/* Send Message Input  */}
      <ChatActions
        message={message}
        setMessage={setMessage}
        handleSendMessage={handleSendMessage}
      />
    </div>
  );
};

export default ChatMessages;
