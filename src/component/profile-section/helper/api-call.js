import { API } from "../../main-helper/backend";
import { errorMessage } from "../../main-helper/desktop-notification";

export const isUserProfileCreatedBefore = async () => {
  try {
    const getTokenData = localStorage.getItem(
      process.env.REACT_APP_SOCIAL_BOOK_TOKEN
    );

    if (getTokenData === null) {
      return false;
    }

    const { token, user } = JSON.parse(getTokenData);

    const res = await fetch(`${API}/isUserPresent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        uid: user,
      }),
    });

    const data = await res.json();

    if (data.code === 200) return true;
    else {
      if (data.code === 403)
        return {
          message: data.message,
        };

      return false;
    }
  } catch (err) {
    errorMessage(
      "Some Error Happened. Make Sure Your Network Connection is Stable",
      10000
    );

    return false;
  }
};
