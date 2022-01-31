export const AcceptButton = ({
  darkMode,
  onClickOperation,
  customClassName,
}) => {
  return (
    <button
      className={`${
        darkMode ? "hover:bg-green-400" : "hover:bg-green-300"
      } text-green-600  border-green-600 dark:text-green-400 dark:border-green-400 connection-screens-common-button-layout hover:bg-opacity-30 mx-3 ${customClassName} text-xs md:text-sm`}
      style={{ borderWidth: "0.2px" }}
      onClick={onClickOperation}
    >
      Accept
    </button>
  );
};

export const ConnectButton = ({
  darkMode,
  onClickOperation,
  customClassName,
}) => {
  return (
    <button
      className={`${
        darkMode ? "hover:bg-blue-800" : "hover:bg-blue-400"
      } text-lightPrimaryFgColor dark:text-darkPrimaryFgColor px-2 py-1 rounded-3xl border-darkPrimaryFgColor  hover:bg-opacity-30  transition-all duration-300 w-full hover:shadow-sm  ${customClassName} text-xs md:text-sm`}
      style={{ borderWidth: "0.2px" }}
      onClick={onClickOperation}
    >
      Connect
    </button>
  );
};

export const CancelButton = ({
  darkMode,
  onClickOperation,
  customClassName,
}) => {
  return (
    <button
      className={`${
        darkMode ? "hover:bg-red-400" : "hover:bg-red-300"
      } text-red-500  border-red-500  connection-screens-common-button-layout hover:bg-opacity-30 mx-3 md:mx-0  ${customClassName} text-xs md:text-sm`}
      style={{ borderWidth: "0.2px" }}
      onClick={onClickOperation}
    >
      Cancel
    </button>
  );
};

export const MessageButton = ({
  darkMode,
  onClickOperation,
  customClassName,
}) => {
  return (
    <button
      className={`${
        darkMode ? "hover:bg-blue-800" : "hover:bg-blue-400"
      } text-lightPrimaryFgColor dark:text-darkPrimaryFgColor px-2 py-1 rounded-3xl border-darkPrimaryFgColor  hover:bg-opacity-30  transition-all duration-300 sm:ml-3 w-full  ${customClassName} text-xs md:text-sm`}
      style={{ borderWidth: "0.2px" }}
      onClick={onClickOperation}
    >
      Message
    </button>
  );
};

export const EditButton = ({ darkMode, onClickOperation, customClassName }) => {
  return (
    <button
      className={`${
        darkMode ? "hover:bg-blue-800" : "hover:bg-blue-400"
      } text-lightPrimaryFgColor dark:text-darkPrimaryFgColor px-10 py-1 rounded-3xl border-darkPrimaryFgColor  hover:bg-opacity-30  transition-all duration-300  ${customClassName} text-xs md:text-sm`}
      style={{ borderWidth: "0.2px" }}
      onClick={onClickOperation}
    >
      Edit
    </button>
  );
};

export const RemoveConnectionButton = ({
  darkMode,
  onClickOperation,
  customClassName,
}) => {
  return (
    <button
      className={`${
        darkMode ? "hover:bg-red-800" : "hover:bg-red-400"
      } text-red-600 dark:text-red-400 px-2 py-1 rounded-3xl border-red-400  hover:bg-opacity-30  transition-all duration-300 sm:ml-3 w-full hover:shadow-sm ${customClassName} text-xs md:text-sm`}
      style={{ borderWidth: "0.2px" }}
      onClick={onClickOperation}
    >
      Remove
    </button>
  );
};

export const WithDrawConnectionRequestButton = ({
  darkMode,
  onClickOperation,
  customClassName,
}) => {
  return (
    <button
      className={`${
        darkMode ? "hover:bg-red-800" : "hover:bg-red-400"
      } text-red-600 dark:text-red-400 px-2 py-1 rounded-3xl border-red-400  hover:bg-opacity-30  transition-all duration-300 w-full hover:shadow-sm   ${customClassName} text-xs md:text-sm`}
      style={{ borderWidth: "0.2px" }}
      onClick={onClickOperation}
    >
      Withdraw
    </button>
  );
};
