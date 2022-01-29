import { API } from "../../common/backend";
import { errorMessage, infoMessage } from "../../common/desktop-notification";
import { getDataFromLocalStorage } from "../../common/local-storage-management";

export const fetchAllAvailableUsers = async (page) => {
  try {
    const storedData = getDataFromLocalStorage();

    const res = await fetch(
      `${API}/getAllAvailableUsers/${storedData?.user}?page=${page}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedData?.token}`,
        },
      }
    );

    const response = await res.json();

    if (response?.code === 200) return response.data;
    if (response?.code === 403) return errorMessage(response?.message);
    errorMessage(response?.message);

    return [];
  } catch (err) {
    errorMessage(
      "Some error happened... Make sure your internet connection is stable",
      10000
    );
    return [];
  }
};

export const fetchAllSpecificRequestedUsers = async (page, connectionType) => {
  try {
    const storedData = getDataFromLocalStorage();

    const res = await fetch(
      `${API}/getConnections/${connectionType}/${storedData?.user}?page=${page}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedData?.token}`,
        },
      }
    );

    const response = await res.json();

    if (response?.code === 200) return response.data;
    if (response?.code === 403) infoMessage(response?.message);

    return [];
  } catch (err) {
    errorMessage(
      "Some error happened... Make sure your internet connection is stable",
      10000
    );
    return [];
  }
};

export const connectionSpecificOperations = async (
  oppositeUserId,
  requestAPItitle
) => {
  try {
    const storedData = getDataFromLocalStorage();

    const res = await fetch(`${API}/${requestAPItitle}/${storedData?.user}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${storedData?.token}`,
      },
      body: JSON.stringify({
        oppositeUserId,
      }),
    });

    const response = await res.json();
  } catch (err) {
    errorMessage(
      "Some error happened... Make sure your internet connection is stable",
      10000
    );
  }
};
