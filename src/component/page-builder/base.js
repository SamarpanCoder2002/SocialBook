import { useSelector } from "react-redux";
import { DesktopNotification } from "../main-helper/desktop-notification";
import MenuComponent from "./menu";

const BaseCommonPart = ({ children, isLoading }) => {
  const {darkMode} = useSelector(state => state);

  return (
    <div className={darkMode?"dark":""}>
     
      <MenuComponent isLoading={isLoading} />

    
      {children}

      <DesktopNotification />


      
    </div>
  );
};

export default BaseCommonPart;
