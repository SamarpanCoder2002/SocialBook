import { API } from "../../common/backend";
import { getDataFromLocalStorage } from "../../common/local-storage-management";

import { errorMessage } from "../../common/desktop-notification";

export const getChatBoxId = async (partnerId) => {
  const { user, token } = getDataFromLocalStorage();

  const res = await fetch(`${API}/messaging/getChatBoxId/${user}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      partnerId,
    }),
  });

  const data = await res.json();

  if (data.code !== 200) {
    errorMessage(data.message);
    return;
  }

  return data.chatBoxId;
};


// TODO: Do it  //
export const getAllChatConnections = async () => {

}
