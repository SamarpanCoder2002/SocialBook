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
