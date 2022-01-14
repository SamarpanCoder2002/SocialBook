import { getChatBoxId } from "../messaging-section/helper/api_call";
import {
  errorMessage,
  infoMessage,
  successMessage,
} from "./desktop-notification";
import { connectionSpecificOperations } from "../connection/helper/api_call";

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

export const removeConnectionButtonClicked = (partnerUserId) => {
  connectionSpecificOperations(partnerUserId, "removeConnections");
  successMessage("😔 Connection Removed", 2000);
};

export const onAcceptButtonClicked = (partnerUserId) => {
  connectionSpecificOperations(partnerUserId, "acceptConnectionRequest");
  successMessage("🥳 Connection request accepted", 2000);
};

export const onCancelButtonClicked = (partnerUserId) => {
  connectionSpecificOperations(
    partnerUserId,
    "removeIncomingConnectionRequest"
  );
  successMessage("😏 Incoming Connection Request Removed", 2000);
};

export const onWithdrawConnectionButtonClicked = (partnerUserId) => {
  connectionSpecificOperations(partnerUserId, "withDrawSentRequest");
  successMessage("😏 Outgoing Connection Request Removed", 2000);
};

export const onConnectButtonClicked = (targetUserId) => {
  connectionSpecificOperations(targetUserId, "sendConnectionRequest");
  successMessage("🙋 Connection Request Sent", 2000);
};
