import { API } from "../../main-helper/backend";
import {
  errorMessage,
  infoMessage,
  successMessage,
} from "../../main-helper/desktop-notification";
import { getDataFromLocalStorage } from "../../main-helper/local-storage-management";

export const makeTextPost = async (text) => {
  try {
    const storedData = getDataFromLocalStorage();

    const res = await fetch(`${API}/createTextPost/${storedData?.user}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${storedData?.token}`,
      },
      body: JSON.stringify({
        text,
      }),
    });

    const response = await res.json();

    if (response?.code === 200) {
      successMessage("Text Post Created Successfully", 3000);
      return;
    }

    if (response?.code === 403) {
      infoMessage(response?.message, 3000);
      return;
    }

    errorMessage(response?.message, 3000);
  } catch (err) {
    console.log(err);
    errorMessage(
      "Some error happened... Make sure your internet connection is stable",
      10000
    );
  }
};
