export const AcceptButton = ({ darkMode, onPressed, customClassName }) => {
  return (
    <button
      className={`${
        darkMode ? "hover:bg-green-400" : "hover:bg-green-300"
      } text-green-600  border-green-600 dark:text-green-400 dark:border-green-400 connection-screens-common-button-layout hover:bg-opacity-30 mx-3 ${customClassName}`}
      style={{ borderWidth: "0.2px" }}
      onPressed={onPressed}
    >
      Accept
    </button>
  );
};

export const ConnectButton = ({ darkMode, onPressed, customClassName }) => {
  return (
    <button
      className={`${
        darkMode ? "hover:bg-blue-800" : "hover:bg-blue-400"
      } text-lightPrimaryFgColor dark:text-darkPrimaryFgColor px-2 py-1 rounded-3xl border-darkPrimaryFgColor  hover:bg-opacity-30  transition-all duration-300 w-full hover:shadow-sm  ${customClassName}`}
      style={{ borderWidth: "0.2px" }}
      onClick={onPressed}
    >
      Connect
    </button>
  );
};

export const CancelButton = ({ darkMode, onPressed, customClassName }) => {
  return (
    <button
      className={`${
        darkMode ? "hover:bg-red-400" : "hover:bg-red-300"
      } text-red-500  border-red-500  connection-screens-common-button-layout hover:bg-opacity-30 mx-3 md:mx-0  ${customClassName}`}
      style={{ borderWidth: "0.2px" }}
      onClick={onPressed}
    >
      Cancel
    </button>
  );
};

export const MessageButton = ({ darkMode, onPressed, customClassName }) => {
  return (
    <button
      className={`${
        darkMode ? "hover:bg-blue-800" : "hover:bg-blue-400"
      } text-lightPrimaryFgColor dark:text-darkPrimaryFgColor px-2 py-1 rounded-3xl border-darkPrimaryFgColor  hover:bg-opacity-30  transition-all duration-300 sm:ml-3 w-full hover:shadow-sm hover:shadow-darkPrimaryFgColor  ${customClassName}`}
      style={{ borderWidth: "0.2px" }}
      onClick={onPressed}
    >
      Message
    </button>
  );
};

export const EditButton = ({ darkMode, onPressed, customClassName }) => {
  return (
    <button
      className={`${
        darkMode ? "hover:bg-blue-800" : "hover:bg-blue-400"
      } text-lightPrimaryFgColor dark:text-darkPrimaryFgColor px-10 py-1 rounded-3xl border-darkPrimaryFgColor  hover:bg-opacity-30  transition-all duration-300  ${customClassName}`}
      style={{ borderWidth: "0.2px" }}
      onClick={onPressed}
    >
      Edit
    </button>
  );
};

export const RemoveConnectionButton = ({
  darkMode,
  onPressed,
  customClassName,
}) => {
  return (
    <button
      className={`${
        darkMode ? "hover:bg-red-800" : "hover:bg-red-400"
      } text-red-600 dark:text-red-400 px-2 py-1 rounded-3xl border-red-400  hover:bg-opacity-30  transition-all duration-300 sm:ml-3 w-full hover:shadow-sm   ${customClassName}`}
      style={{ borderWidth: "0.2px" }}
      onClick={onPressed}
    >
      Remove
    </button>
  );
};

export const WithDrawConnectionRequestButton = ({
  darkMode,
  onPressed,
  customClassName,
}) => {
  return (
    <button
      className={`${
        darkMode ? "hover:bg-red-800" : "hover:bg-red-400"
      } text-red-600 dark:text-red-400 px-2 py-1 rounded-3xl border-red-400  hover:bg-opacity-30  transition-all duration-300 w-full hover:shadow-sm   ${customClassName}`}
      style={{ borderWidth: "0.2px" }}
      onClick={onPressed}
    >
      Withdraw
    </button>
  );
};
