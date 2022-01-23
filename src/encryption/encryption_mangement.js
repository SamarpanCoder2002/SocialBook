import CryptoJS from "crypto-js";

export const postEncryption = (content) => {
  return CryptoJS.AES.encrypt(
    JSON.stringify(content.toString().split("\n").join("<br/>")),
    process.env.REACT_APP_POST_ENCRYPTION_SECRET
  ).toString();
};

export const postDecryption = (encryptedData) => {
  const bytes = CryptoJS.AES.decrypt(
    encryptedData,
    process.env.REACT_APP_POST_ENCRYPTION_SECRET
  );

  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

export const messageEncryption = (content) => {
  return CryptoJS.AES.encrypt(
    JSON.stringify(content),
    process.env.REACT_APP_MESSAGE_ENCRYPTION_SECRET
  ).toString();
};

export const messageDecryption = (encryptedMessageData) => {
  const bytes = CryptoJS.AES.decrypt(
    encryptedMessageData,
    process.env.REACT_APP_MESSAGE_ENCRYPTION_SECRET
  );
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};
