import { API } from "../../common/backend";
import { getDataFromLocalStorage } from "../../common/local-storage-management";

export const addPendingMessages = async (
  chatBoxId,
  message,
  type,
  partnerId,
  time
) => {
  const { token, user } = getDataFromLocalStorage();

  await fetch(`${API}/messaging/addPendingChatMessages/${user}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      chatBoxId,
      message,
      type,
      partnerId,
      time,
    }),
  });

  return;
};
