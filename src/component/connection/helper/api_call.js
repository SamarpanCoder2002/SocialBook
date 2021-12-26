import { API } from "../../main-helper/backend";
import {
  errorMessage,
  infoMessage,
  successMessage,
} from "../../main-helper/desktop-notification";
import { getDataFromLocalStorage } from "../../main-helper/local-storage-management";

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

    console.log(response);

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

    console.log(response);

    console.log("Checking it");

    if (response?.code === 200) return response.data;
    if (response?.code === 403) infoMessage(response?.message);

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

export const sentConnectionRequest = async (oppositeUserId) => {
  try {
    const storedData = getDataFromLocalStorage();

    console.log(storedData);

    const res = await fetch(`${API}/sendConnectionRequest/${storedData?.user}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${storedData?.token}`,
      },
      body: JSON.stringify({
        oppositeUserId
      }),
    });

    const response = await res.json();

    console.log(response);

    if (response?.code === 200) {
      
      return true;
    }

    
    return false;

    
  } catch (err) {
    console.log(err);
    errorMessage(
      "Some error happened... Make sure your internet connection is stable",
      10000
    );
    
  }
}
