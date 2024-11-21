import { useContext, useState } from "react";
import { userContext } from "../Usercontext";
import { Link, Navigate, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacespPage";
import AccountNav from "./AccountNav";

export default function ProfilePage() {

const {pathname} = useLocation();
  const [redirect, setRedirect] = useState(null);
  const { user, ready, setUser } = useContext(userContext);

  let  subpage = pathname.split("/")?.[2]

  if(subpage===undefined){
    subpage = 'profile';
  }

  const logout = async () => {
    await axios.post("/logout");
    setRedirect("/");
    setUser(null);
  };

  if (subpage === subpage) {
    subpage = "profile";
  }
  console.log(subpage, "Logging subpage from account page")
  

  if (ready && !user && !redirect) {
    return <Navigate to={"/login"} />;
  }



  if (redirect) {
    return <Navigate to={redirect} />;
  }
  return (
    <div>
        <AccountNav/>
      {subpage === "profile" && (
        <div className="text-center max-w-lg mx-auto">
          Logged in as {user.name} ({user.email})<br />
          <button onClick={logout} className="primary max-w-sm mt-2">
            Logout
          </button>
        </div>
      )}
      {subpage === 'places' && <PlacesPage />} 
    </div>
  );
}
