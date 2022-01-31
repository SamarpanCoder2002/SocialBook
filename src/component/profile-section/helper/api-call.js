import { UPDATE_USER_PROFILE } from "../../../redux/actions";
import { onSignOut } from "../../auth/helper/api_call";
import { API } from "../../common/backend";
import {
  errorMessage,
  successMessage,
} from "../../common/desktop-notification";
import {
  getDataFromLocalStorage,
  storeDataInLocalStorage,
} from "../../common/local-storage-management";

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

    if (data.code === 200) {
      if (
        authTokenResult.name !== data.name ||
        authTokenResult.description !== data.description ||
        authTokenResult.profilePic !== data.profilePic
      ) {
        storeDataInLocalStorage(
          token,
          user,
          data.name,
          data?.description,
          data?.profilePic
        );
      }

      return true;
    } else {
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
      errorMessage(
        "Error In Create Your Profile... Please Try Later 😔",
        10000
      );

      setisLoading(false);
    });
};

export const updateUserProfile = async (
  userName,
  userDescription,
  userProfilePic,
  setisLoading,
  dispatch
) => {
  const { token, user } = getDataFromLocalStorage();
  setisLoading(true);

  const data = new FormData();
  data.append("updatedName", userName);
  data.append("updatedDescription", userDescription);
  data.append("updatedProfilePic", userProfilePic);

  fetch(`${API}/updateProfile/${user}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
    body: data,
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.code !== 200) {
        errorMessage(data.message, 10000);
        setisLoading(false);
        return;
      }

      const { name, description, profilePic } = data;
      successMessage(data.message, 1000);

      dispatch({
        type: UPDATE_USER_PROFILE,
        payload: {
          name,
          description,
          profilePic,
        },
      });

      setTimeout(() => {
        setisLoading(false);
        window.location.replace("/feed");
      }, 800);
    });
};

export const fetchUserProfile = async (userId) => {
  try {
    const storedData = getDataFromLocalStorage();
    const res = await fetch(
      `${API}/getProfileData/${storedData?.user}/${userId}`,
      {
        method: "GET",
        headers: {
          ContentType: "application/json",
          Authorization: `Bearer ${storedData?.token}`,
        },
      }
    );

    const data = await res.json();

    if (data.code === 200) return data.data;
    else {
      errorMessage(data.message, 10000);
      return;
    }
  } catch (e) {
    return;
  }
};

export const particularUserConnectionStatus = async (queryUserId) => {
  try {
    const storedData = getDataFromLocalStorage();
    const res = await fetch(
      `${API}/particularUserConnectionStatus/${storedData?.user}/${queryUserId}`,
      {
        method: "GET",
        headers: {
          ContentType: "application/json",
          Authorization: `Bearer ${storedData?.token}`,
        },
      }
    );

    const data = await res.json();

    if (data.code === 500) {
      errorMessage(data.message);
      return;
    }

    return data.status;
  } catch (e) {
    return;
  }
};
