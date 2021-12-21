import { API } from "../../main-helper/backend";
import {
  errorMessage,
  infoMessage,
  successMessage,
} from "../../main-helper/desktop-notification";
import { storeDataInLocalStorage } from "../../main-helper/store-data-local-storage";

export const onGoogleLogInSuccess = (response, setisLoading) => {
  setisLoading(true);
  infoMessage("Process is going on... Please Wait ", 3000);

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
        successMessage("🥳 Sign In Successful");

        const { token, user } = data;
        storeDataInLocalStorage(token, user);

        // TODO: Temporary navigation to feed page. Need to create a page for user profile data take and then switch to feed page
        setTimeout(() => {
          window.location.replace("/feed");
        }, 2000);
      }

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
        successMessage("Sign In Successful");
        const { token, user } = data;
        storeDataInLocalStorage(token, user);

         // TODO: Temporary navigation to feed page. Need to create a page for user profile data take and then switch to feed page
         setTimeout(() => {
            window.location.replace("/feed");
          }, 2000);
      } else {
        if (data.code === 422) infoMessage(data.error);
        else errorMessage(data.error);
      }
    });
};
