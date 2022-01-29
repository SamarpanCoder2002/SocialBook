import { PostTypes } from "../../../types/types";
import { API } from "../../common/backend";
import {
  errorMessage,
  infoMessage,
  successMessage,
} from "../../common/desktop-notification";
import { getDataFromLocalStorage } from "../../common/local-storage-management";

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

    await apiCallCommonPart(res);
  } catch (err) {
    errorMessage(
      "Some error happened... Make sure your internet connection is stable",
      10000
    );
  }
};

export const makeVideoPost = async (text, video) => {
  try {
    const storedData = getDataFromLocalStorage();

    const res = await fetch(`${API}/createVideoPost/${storedData?.user}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${storedData?.token}`,
      },
      body: JSON.stringify({
        text,
        video,
      }),
    });

    await apiCallCommonPart(res);
  } catch (err) {
    errorMessage(
      "Some error happened... Make sure your internet connection is stable",
      10000
    );
  }
};

export const makeDocumentPost = async (text, pdfSrc) => {
  try {
    const storedData = getDataFromLocalStorage();

    const res = await fetch(`${API}/createDocumentPost/${storedData?.user}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${storedData?.token}`,
      },
      body: JSON.stringify({
        text,
        pdfSrc,
      }),
    });

    await apiCallCommonPart(res);
  } catch (err) {
    errorMessage(
      "Some error happened... Make sure your internet connection is stable",
      10000
    );
  }
};

export const makePollPost = async (text, question, options) => {
  try {
    const storedData = getDataFromLocalStorage();

    const res = await fetch(`${API}/createPollPost/${storedData?.user}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${storedData?.token}`,
      },
      body: JSON.stringify({
        text,
        question,
        options,
      }),
    });

    await apiCallCommonPart(res);
  } catch (err) {
    errorMessage(
      "Some error happened... Make sure your internet connection is stable",
      10000
    );
  }
};

export const makeImagePost = async (text, imagesCollection) => {
  try {
    const storedData = getDataFromLocalStorage();

    const postData = new FormData();

    postData.append("text", text);
    imagesCollection.map((image, index) => postData.append(index, image));

    const res = await fetch(`${API}/createImagePost/${storedData?.user}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${storedData?.token}`,
      },
      body: postData,
    });

    await apiCallCommonPart(res);
  } catch (err) {
    errorMessage(
      "Some error happened... Make sure your internet connection is stable",
      10000
    );
  }
};

export const makeSlidePost = async (text, sliderCollection) => {
  try {
    const storedData = getDataFromLocalStorage();

    const postData = new FormData();

    postData.append("text", text);
    sliderCollection.map((slide, index) => {
      postData.append(
        index,
        slide.type === PostTypes.Image ? slide.file : slide.text
      );
    });

    const res = await fetch(`${API}/createSlidePost/${storedData?.user}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${storedData?.token}`,
      },
      body: postData,
    });

    await apiCallCommonPart(res);
  } catch (err) {
    errorMessage(
      "Some error happened... Make sure your internet connection is stable",
      10000
    );
  }
};

export const updatePollData = async (newPollData, postId) => {
  try {
    const storedData = getDataFromLocalStorage();

    const res = await fetch(
      `${API}/updatePollInformation/${storedData?.user}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedData?.token}`,
        },
        body: JSON.stringify({
          newPollData,
          postId,
        }),
      }
    );

    if (res.status !== 200) {
      errorMessage(res.message, 3000);
      return;
    }
  } catch (err) {
    errorMessage(
      "Some error happened... Make sure your internet connection is stable",
      10000
    );
  }
};

export const insertPostLove = async (postId) => {
  try {
    const storedData = getDataFromLocalStorage();

    const res = await fetch(
      `${API}/postInsertLove/${postId}/${storedData?.user}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedData?.token}`,
        },
      }
    );

    if (res.status !== 200) {
      errorMessage(res.message, 3000);
      return;
    }
  } catch (err) {
    errorMessage(
      "Some error happened... Make sure your internet connection is stable",
      10000
    );
  }
};

export const insertPostComment = async (postId, comment) => {
  try {
    const storedData = getDataFromLocalStorage();

    const res = await fetch(
      `${API}/postInsertComment/${postId}/${storedData?.user}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedData?.token}`,
        },
        body: JSON.stringify({
          comment,
          name: storedData?.name,
          description: storedData?.description,
          profilePic: storedData?.profilePic,
        }),
      }
    );

    if (res.status !== 200) {
      errorMessage(res.message, 3000);
      return;
    }
  } catch (err) {
    errorMessage(
      "Some error happened... Make sure your internet connection is stable",
      10000
    );
  }
};

export const getParticularPost = async (postId) => {
  try {
    const { user, token } = getDataFromLocalStorage();

    const res = await fetch(`${API}/getParticularPost/${user}/${postId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status !== 200) {
      errorMessage(res.message, 3000);
      return;
    }

    const data = await res.json();

    return data.data;
  } catch (err) {
    errorMessage(
      "Some error happened... Make sure your internet connection is stable",
      10000
    );
  }
};

const apiCallCommonPart = async (res) => {
  const response = await res.json();

  if (response?.code === 200) {
    successMessage("Post Created Successfully", 1000);
    return;
  }

  if (response?.code === 403) {
    infoMessage(response?.message, 3000);
    return;
  }

  errorMessage(response?.message, 3000);
};
