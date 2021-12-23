import { useSelector } from "react-redux";
import MenuComponent from "./menu";

const BaseCommonPart = ({ children, isLoading }) => {
  const {darkMode} = useSelector(state => state);

  return (
    <div className={darkMode?"dark":""}>
     
      <MenuComponent isLoading={isLoading} />

    
      {children}


      
    </div>
  );
};

export default BaseCommonPart;
