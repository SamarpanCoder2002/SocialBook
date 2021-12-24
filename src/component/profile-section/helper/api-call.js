import { onSignOut } from "../../auth/helper/api_call";
import { API } from "../../main-helper/backend";
import {
  errorMessage,
  infoMessage,
  successMessage,
} from "../../main-helper/desktop-notification";
import axios from "axios";

const authToken = () => {
  const getTokenData = localStorage.getItem(
    process.env.REACT_APP_SOCIAL_BOOK_TOKEN
  );

  if (getTokenData === null) return false;

  return JSON.parse(getTokenData);
};

export const isUserProfileCreatedBefore = async () => {
  try {
    const authTokenResult = authToken();
    if (!authTokenResult) return authTokenResult;
    const { token, user } = authTokenResult;

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

export const createUserProfile = async (
  userName,
  description,
  profilePic,
  interests
) => {
  const authTokenResult = authToken();
  if (!authTokenResult) return authTokenResult;
  const { token, user } = authTokenResult;

  const data = new FormData();
  data.append("file", profilePic);
  data.append("user", userName);
  data.append("description", description);
  data.append("interests", JSON.stringify(interests));

  fetch(`${API}/createUserAccount/${user}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
    body: data,
  })
    .then((res) => res.json())
    .then((data) => {
      data.code === 403
        ? infoMessage(data.message, 10000)
        : data.code === 500
        ? errorMessage(data.message)
        : successMessage(data.message);
    })
    .catch((e) => {
      console.log(e);
      errorMessage(
        "Error In Create Your Profile... Please Try Later 😔",
        10000
      );
    });
};
