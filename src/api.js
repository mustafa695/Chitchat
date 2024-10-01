import axios from "axios";

// const endpoint = "https://chitchat-server-nine.vercel.app/api";
const endpoint = "https://chitchat-server-qb9e.onrender.com/api";

export const login = (data) => {
  return axios.post(`${endpoint}/auth/login`, data, {
    withCredentials: true,
  });
};

export const logout = (data) => {
  return axios.post(`${endpoint}/auth/logout`, data, {
    withCredentials: true,
  });
};

export const getMe = () => {
  return axios.get(`${endpoint}/me`, { withCredentials: true });
};

export const addUser = (data) => {
  return axios.post(`${endpoint}/users`, data, { withCredentials: true });
};

export const sendMessage = (data) => {
  return axios.post(`${endpoint}/chat/send`, data, { withCredentials: true });
};

export const getMessages = (recieverId, params) => {
  return axios.get(
    `${endpoint}/chat/messages/${recieverId}?limit=${params?.limit}&skip=${params?.skip}`,
    {
      withCredentials: true,
    }
  );
};

export const getUser = () => {
  return axios.get(`${endpoint}/users`, { withCredentials: true });
};

export const updateMessage = (id, data) => {
  return axios.put(`${endpoint}/chat/message/${id}`, data, {
    withCredentials: true,
  });
};

export const deleteMessage = (id) => {
  return axios.delete(`${endpoint}/chat/message/${id}`, {
    withCredentials: true,
  });
};

export const createChannel = (data) => {
  return axios.post(`${endpoint}/channel/create`, data, {
    withCredentials: true,
  });
};

export const createChannelMessage = (data) => {
  return axios.post(`${endpoint}/channel/message`, data, {
    withCredentials: true,
  });
};

export const getChannels = () => {
  return axios.get(`${endpoint}/channel`, {
    withCredentials: true,
  });
};

export const getChannelMessages = (channelId) => {
  return axios.get(
    `${endpoint}/channel/channelMessages?channelId=${channelId}`,
    { withCredentials: true }
  );
};
