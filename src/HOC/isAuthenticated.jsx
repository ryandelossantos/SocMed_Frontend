// import App from "../App"
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyToken } from "../API/auth";

export default function isAuthenTicated(WrappedComponent) {
  return () => {
    const navigate = useNavigate();
    const { state: prevLocation } = useLocation();
    const user = sessionStorage.getItem("user");
    useEffect(() => {
      if (!user) {
        sessionStorage.clear();
        return navigate("/login");
      }
      if(!prevLocation?.isLoggedIn){
        verifyToken(user).then((res) => {
            // console.log('response this',res);
            if(!res){
                sessionStorage.clear()
                navigate('/login')
            }
          })
      }
      
    }, []);
    return <WrappedComponent />;
  };
}
