import React, { useState, useContext,useRef } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import {useLocation,NavLink ,useNavigate} from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import instanceAxios from "../api/api";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { ProgressSpinner } from 'primereact/progressspinner';


function Login() {
  const [togglePasswordContent, setTogglePasswordContent] = useState(false);
  const passwordRef = useRef(null)
  const { login} = useContext(AuthContext);
  const [dataUser, setDataUser] = useState({ email: "", password: "" });
  const [isLoading,setIsLoading] = useState(false);
  const navigate = useNavigate();
  const styleBtn = {
    padding: "1.2em 1em",
    borderRadius: "5px",
    fontWeight: "bold",
    cursor: "pointer",
    color: "white",
    backgroundColor: "#3F2872FC",
    marginTop: "1em",
    border: "none",
  };
  // const styleImg = {
  //   width: "200px",
  //   height: "50px",
  //   position: "absolute",
  //   top: ".5em",
  // };
  const MySwal = withReactContent(Swal)
  const handlePassword = () => {
    setTogglePasswordContent((prevTogglePassword) => !prevTogglePassword);
    if(!togglePasswordContent){
      passwordRef.current.type = "text"
    }else{
      passwordRef.current.type = "password"
    }

  };

  const logo = "/iugb.png";
  const location = useLocation();
  const redirectPath = location.state?.path || "/tableau-bord";
  const handleDataUser = async(e) => {
    e.preventDefault()
    console.log(dataUser)
    setIsLoading(true)
    try{
    
      const response = await instanceAxios.post('login',{
       email:dataUser.email,
       password:dataUser.password
      })
      console.log(response)
      if(response.data.status === true){
        
        login(response.data.identifiant,response.data.access_token);
        setIsLoading(false)
        MySwal.fire({
          title: "Connecté",
          icon:"success",
          showConfirmButton:false,
          timer:1500
        })
       
       
        navigate(redirectPath, { replace: true });
      }
      if(response.data.status === false){
        console.log(response.data.message)
        MySwal.fire({
          title: response.data.message,
          icon:"info",
        })
        setIsLoading(false)
      }
     
    }catch(error){
    console.log(error)
    MySwal.fire({
      title: error.response.data.message,
      icon:"info",
    })
    setIsLoading(false)
    }
 
   
  };
  return (
    <div className="conteneur-login">
      
      <form onSubmit={handleDataUser}>
        {/* <img src={logo} alt={logo} style={styleImg} /> */}

        <h1>Sign In</h1>
        <div>
          <input
            value={dataUser.email}
            type="email"
            placeholder="Email"
            autoComplete="on"
            onChange={(e) =>
              setDataUser({ ...dataUser, email: e.target.value })
            }
            required
          />
        </div>

        <div className="conteneur-password">
          {togglePasswordContent ? (
            <span className="icon-eye" onClick={handlePassword}>
              <AiOutlineEye />
            </span>
          ) : (
            <span className="icon-hidden-eye" onClick={handlePassword}>
              <AiOutlineEyeInvisible />
            </span>
          )}
          <NavLink to="mot-de-passe-oublie" className="password-forget">Mot de passe oublié?</NavLink>
          <input
            type="password"
            onChange={(e) =>
              setDataUser({ ...dataUser, password: e.target.value })
            }
            ref={passwordRef}
            value={dataUser.password}
            placeholder="Password"
            required
          />
        </div>

        <button style={styleBtn} type="submit">
           {
            isLoading ? <ProgressSpinner
           style={{width: '20px', height: '20px'}} 
          strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" />:
          <strong>Login</strong>}
        </button>
      </form>
    </div>
  );
}

export default Login;
