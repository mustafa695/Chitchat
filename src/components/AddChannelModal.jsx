// Modal.js
import React, { useState } from "react";
import { IoIosClose } from "react-icons/io";
import { createChannel } from "../api";
import { Loading } from "../constant/icons";
import { useChat } from "../pages/Chat";

const AddChannelModal = ({ isOpen, onClose, handleSuccess }) => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const { setChannelData } = useChat();

  if (!isOpen) return null;

  const handleCreateChannel = async () => {
    try {
      setLoading(true);
      const data = {
        name,
        users: ["66f586515255d9a8e8b8ff13"],
      };
      const response = await createChannel(data);
      setChannelData(response.data?.data);
      handleSuccess();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose} />
      <div className="bg-white rounded-lg shadow-lg z-10 max-w-md w-4/5">
        <div className="bg-[#6153cc] px-4 py-4 flex items-center gap-4 justify-between">
          <h2 className="text-base font-medium text-white">
            Create New Channel
          </h2>
          <button onClick={onClose}>
            <IoIosClose size={24} className="text-gray-300" />
          </button>
        </div>

        <div className="p-4">
          <p className="mt-2 text-black">
            Invite members to your group by entering their email addresses
            below.
          </p>
          <div className="mt-4">
            <label className="block font-medium text-[#495057] mb-3">
              Group Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-white border border-[#eaeaf1] py-2 px-4 outline-none"
            />
          </div>
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleCreateChannel}
              disabled={loading}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center gap-2 disabled:opacity-45"
            >
              {loading && <Loading className={"!size-4"} />} Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddChannelModal;
