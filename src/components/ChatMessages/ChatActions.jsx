import React from "react";
import { IoMdSend } from "react-icons/io";

const ChatActions = ({ setMessage, message, handleSendMessage }) => {
  return (
    <div>
      <form
        className="flex items-center gap-4 p-6 w-full"
        onSubmit={handleSendMessage}
      >
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="bg-white text-[#495057] py-2 px-4 border border-[#eaeaf1] flex-1 outline-none min-h-10"
          placeholder="Type your message.."
        />
        <button
          type="submit"
          className="bg-[#6153cce6] size-11 flex items-center justify-center rounded-md"
        >
          <IoMdSend color="#fff" size={28} />
        </button>
      </form>
    </div>
  );
};

export default ChatActions;
