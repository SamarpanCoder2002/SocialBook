import { getChatBoxId } from "../messaging-section/helper/api_call";
import {
  errorMessage,
  infoMessage,
  successMessage,
} from "./desktop-notification";

export const onMessageButtonClicked = (
  partnerId,
  partnerName,
  partnerDescription,
  partnerProfilePic
) => {
  infoMessage("💬 Finding Chat Box...", 2000);
  getChatBoxId(partnerId, partnerName, partnerDescription, partnerProfilePic)
    .then((chatBoxId) => {
      if (!chatBoxId) {
        errorMessage("🤔 Chat Box Not Found... Try later");
        return;
      }

      successMessage("💬 Chat Box Found", 1000);
      setTimeout(() => {
        window.location.href = `/messaging?partnerId=${partnerId}`;
      }, 800);
    })
    .catch((e) => {
      console.log("Error in get chat box id: ", e);
    });
};
