import { Link, Navigate } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import { userContext } from "../Usercontext";
import GoogleButton from "react-google-button";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUser } = useContext(userContext);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/login", {
        email,
        password,
      });
      setUser(data);
      alert("Login successful");
      setRedirect(true);
    } catch (error) {
      alert("Login failed");
    }
  };

  // Handle Google Login
  const redirectToGoogleSSO = () => {

    let timer = null;
    const googleLoginURL = "http://localhost:4000/login/google";
    
    // Window options for pop-up (size, etc.)
    const windowOptions = "width=500,height=600,top=100,left=100,toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no,status=no";
  
    // Open the URL in a pop-up window
    const newWindow = window.open(googleLoginURL, "GoogleLogin", windowOptions);
  
    if (newWindow) {
      // Focus on the pop-up window when it opens (optional)
      newWindow.focus();
      timer = setInterval(() => {
        if(newWindow.closed){
            console.log("You are authenticated")
            if(timer){
                clearInterval(timer);
            }
        }
        
      }, 500);

      
    } else {
      alert('Please allow pop-ups for this website');
    }
  };
  

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-32">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        
        {/* Regular Email/Password Form */}
        <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
            className="block w-full mb-3 p-2 border border-gray-300 rounded"
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
            className="block w-full mb-3 p-2 border border-gray-300 rounded"
          />
          <button className="primary w-full py-2 mb-4 bg-red-500 text-white rounded">
            Login
          </button>
        </form>

        {/* Google Login Button */}
        <div className="w-full py-2">
          <GoogleButton style={{ width: '100%' }} onClick={redirectToGoogleSSO} />
        </div>

        <div className="text-center py-2 text-gray-500">
          Don't have an account yet?{" "}
          <Link to={"/register"} className="underline text-black">
            Register now
          </Link>
        </div>
      </div>
    </div>
  );
}
