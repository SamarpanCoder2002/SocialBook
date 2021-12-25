import { API } from "../../main-helper/backend";
import {
  errorMessage,
  infoMessage,
  successMessage,
} from "../../main-helper/desktop-notification";
import { getDataFromLocalStorage } from "../../main-helper/local-storage-management";

export const fetchAllNotifications = async () => {
  try {
    const storedData = getDataFromLocalStorage();

    const res = await fetch(`${API}/getAllNotifications/${storedData?.user}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${storedData?.token}`,
      },
    });

    const response = await res.json();

    if (response?.code === 200) return response.data;
    if (response?.code === 403) return errorMessage(response?.message);
    errorMessage(response?.message);

    return [];
  } catch (err) {
    console.log(err);
    errorMessage(
      "Some error happened... Make sure your internet connection is stable",
      10000
    );
    return [];
  }
};

export const deleteParticularNotification = async (id) => {
  try {
    const storedData = getDataFromLocalStorage();

    const res = await fetch(
      `${API}/deleteNotification/${storedData?.user}/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedData?.token}`,
        },
      }
    );

    const response = await res.json();

    if (response?.code === 200) {
      successMessage(response?.message, 1500);
      return true;
    }
    response?.code === 403
      ? infoMessage(response?.message, 1500)
      : errorMessage(response?.message, 1500);

    return false;
  } catch (err) {
    console.log(err);
    errorMessage(
      "Some error happened... Make sure your internet connection is stable",
      10000
    );
    return false;
  }
};
