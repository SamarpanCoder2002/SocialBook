import { API } from "../../common/backend";
import { getDataFromLocalStorage } from "../../common/local-storage-management";

import { errorMessage } from "../../common/desktop-notification";

export const getChatBoxId = async (
  partnerId,
  partnerName,
  partnerDescription,
  partnerProfilePic
) => {
  const { user, token, name, description, profilePic } =
    getDataFromLocalStorage();

  const res = await fetch(`${API}/messaging/getChatBoxId/${user}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      partnerId,
      partnerName,
      partnerDescription,
      partnerProfilePic,
      currentName: name,
      currentDescription: description,
      currentProfilePic: profilePic,
    }),
  });

  const data = await res.json();

  if (data.code !== 200) {
    errorMessage(data.message);
    return;
  }

  return data.chatBoxId;
};

export const getAllChatConnections = async () => {
  const { token, user } = getDataFromLocalStorage();

  const res = await fetch(`${API}/messaging/getAllChatConnections/${user}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  if (data.code !== 200) {
    errorMessage(data.message);
    return;
  }

  return data.chatConnections;
};

export const sendMessageToSpecificConnection = async (
  partnerId,
  message,
  chatBoxId,
  type
) => {
  const { token, user } = getDataFromLocalStorage();

  const postData = new FormData();
  postData.append("senderId", user);
  postData.append("receiverId", partnerId);
  postData.append("message", message);
  postData.append("chatBoxId", chatBoxId);
  postData.append("type", type);

  const res = await fetch(`${API}/messaging/addChatBoxMessage/${user}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: postData,
  });

  const data = await res.json();

  if (data.code !== 200) {
    errorMessage(data.message, 10000);
    return;
  }

  return data.data;
};

export const getAllChatHistoryMessages = async (chatBoxId) => {
  const { token, user } = getDataFromLocalStorage();

  const res = await fetch(
    `${API}/messaging/getAllChatMessages/${user}/${chatBoxId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await res.json();

  if (data.code !== 200) {
    errorMessage(data.message);
    return;
  }

  return data.data;
};

export const getPendingChatMessages = async () => {
  const { token, user } = getDataFromLocalStorage();

  const res = await fetch(`${API}/messaging/getPendingChatMessages/${user}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  if (data.code === 500) {
    errorMessage(data.message);
    return;
  }

  return data.pendingMessages;
};

export const removePendingChatMessages = async (chatBoxId) => {
  const { token, user } = getDataFromLocalStorage();

  const res = await fetch(
    `${API}/messaging/deletePendingMessage/${user}/${chatBoxId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await res.json();

  if (data.code !== 200) {
    errorMessage(data.message);
    return;
  }

  return data.code;
};
