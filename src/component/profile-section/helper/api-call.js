import { onSignOut } from "../../auth/helper/api_call";
import { API } from "../../main-helper/backend";
import {
  errorMessage,
  successMessage,
} from "../../main-helper/desktop-notification";
import { getDataFromLocalStorage } from "../../main-helper/local-storage-management";

export const isUserProfileCreatedBefore = async () => {
  try {
    const authTokenResult = getDataFromLocalStorage();
    if (!authTokenResult) return authTokenResult;
    const { token, user } = authTokenResult;

    const res = await fetch(`${API}/isUserPresent/${user}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    console.log("checking: ", data);

    if (data.code === 200) return true;
    else {
      if (data.code === 403)
        return {
          code: 403,
        };

      return false;
    }
  } catch (err) {
    alert(
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
  interests,
  setisLoading
) => {
  setisLoading(true);

  const authTokenResult = getDataFromLocalStorage();
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
      if (data.code === 403) {
        errorMessage(data.message, 10000);
        setisLoading(false);
        onSignOut();
        return;
      }

      if (data.code !== 200) {
        errorMessage(data.message, 10000);
        setisLoading(false);
        return;
      }

      successMessage(data.message, 2000);
      setTimeout(() => {
        window.location.replace("/connection?newUser=true");
        setisLoading(false);
      }, 1800);
    })
    .catch((e) => {
      console.log(e);
      errorMessage(
        "Error In Create Your Profile... Please Try Later 😔",
        10000
      );

      setisLoading(false);
    });
};

export const fetchUserProfile = async (userId) => {
  try {
    const storedData = getDataFromLocalStorage();
    const res = await fetch(`${API}/getProfileData/${storedData?.user}/${userId}`, {
      method: "GET",
      headers: {
        ContentType: "application/json",
        Authorization: `Bearer ${storedData?.token}`,
      },
    });

    const data = await res.json();

    if (data.code === 200) return data.data;
    else {
      errorMessage(data.message, 10000);
      return;
    }
  } catch (e) {
    console.log(e);
    return;
  }
};
