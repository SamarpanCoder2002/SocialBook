import { API } from "../../main-helper/backend";
import {
  errorMessage,
  infoMessage,
  successMessage,
} from "../../main-helper/desktop-notification";
import { storeDataInLocalStorage } from "../../main-helper/local-storage-management";

export const onGoogleLogInSuccess = (response, setisLoading) => {
  setisLoading(true);
  infoMessage("Process is going on... Please Wait ", 2000);

  fetch(`${API}/googleSignIn`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      idToken: response.tokenId,
      accessToken: response.accessToken,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        errorMessage("Google Sign In Error");
      } else {
        successMessage("🥳 Sign In Successful", 2000);

        const { token, user } = data;
        storeDataInLocalStorage(token, user);

        // TODO: Temporary navigation to feed page. Need to create a page for user profile data take and then switch to feed page
        setTimeout(() => {
          window.location.replace("/take-user-information");
        }, 2000);
      }

      setisLoading(false);
    })
    .catch((err) => {
      errorMessage("Server Error... Please Try After some time 😔");
      setisLoading(false);
    });
};

export const onSignUp = (email, password, setisLoading) => {
  fetch(`${API}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      setisLoading(false);
      if (data.code === 200) {
        successMessage("Sign Up Successful");
        successMessage(
          "A Verification Link Sent to your email. Please Verify Your Email at first and then login.",
          10000
        );

        setTimeout(() => {
          window.location.href = "/landing-with-signin";
        }, 8000);
      } else {
        console.log(data.error);
        errorMessage(data.error, 10000);
      }
    })
    .catch((err) =>
      errorMessage("Some Error Happened. Try After Some Time", 10000)
    );
};

export const onSignIn = (email, password, setisLoading) => {
  fetch(`${API}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      setisLoading(false);
      if (data.code === 200) {
        successMessage("Sign In Successful", 2000);
        const { token, user } = data;
        storeDataInLocalStorage(token, user);

        // TODO: Temporary navigation to feed page. Need to create a page for user profile data take and then switch to feed page
        setTimeout(() => {
          window.location.replace("/take-user-information");
        }, 1800);
      } else {
        if (data.code === 422) infoMessage(data.error);
        else errorMessage(data.error);
      }
    });
};

export const onSignOut = () => {
  const getTokenData = localStorage.getItem(
    process.env.REACT_APP_SOCIAL_BOOK_TOKEN
  );

  if (getTokenData === null) {
    return window.location.href = "/landing-with-signin";
  }

  const { token, user } = JSON.parse(getTokenData);

  fetch(`${API}/signout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      uid: user,
    }),

  })
    .then((res) => res.json())
    .then((data) => {
      if (data.code === 200) {
        localStorage.removeItem(process.env.REACT_APP_SOCIAL_BOOK_TOKEN);
        window.location.href = "/landing-with-signin";
      } else {
        errorMessage(data.error);
      }
    })
    .catch((err) => {
      errorMessage("Server Error... Please Try After some time 😔");
    });
};
