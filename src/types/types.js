export const PostTypes = {
  Text: "text",
  Image: "image",
  Video: "video",
  Pdf: "pdf",
  Slide: "slide",
  Poll: "poll",
};

export const ConnectionType = {
  AlreadyConnected: "connected",
  RequestSent: "request-sent",
  RequestReceived: "request-received",
  notConnected: "not-connected",
};

export const NotificationType = {
  unread: "unread",
  read: "read",
};

export const ChatMsgTypes = {
  text: "text",
  image: "image",
};

export const PostCollectionDataTypes = {
  feedData: "feedData",
  particularAccPostData: "particularAccountPosts",
};

export const MessageHolder = {
  currentUser: "currentUser",
  partnerUser: "partnerUser",
}

export const SocketEvents = {
  newMessage: "newMessage",
  realTimeNotification: "getRealTimeNotifications",
  addUser: "addUser",
  getUsers:"getUsers",
  totalUpdatedNotification :"totalUpdatedNotification",
  sendChatMessage: "sendChatMessage",
  acceptIncomingChatMessage: "acceptIncomingChatMessage",
}
