import React, { useContext} from "react";
import { ReducerNavbarContext } from "../context/ResizeContext";
import { NavLink, useNavigate } from "react-router-dom";
import { AiOutlineHome ,AiOutlineMinus} from "react-icons/ai";
import { IoPersonOutline } from "react-icons/io5";
import { BsPlus } from "react-icons/bs";

import { CgProfile } from "react-icons/cg";
import { FiCreditCard } from "react-icons/fi";
import { BiLogOut } from "react-icons/bi";
import { AuthContext  } from "../context/AuthContext";
import { MyThemeContext} from "../context/ThemeContext";
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'
import instanceAxios from "../api/api";
import { useState } from "react";




function NavBar() {
  const MySwal = withReactContent(Swal)
  const {theme} = useContext(MyThemeContext)
  const { logOut} = useContext(AuthContext);
  const [isClikUser,setIsClikUser] = useState(false)

  const { toggleNavBar, resizeNavBar } = useContext(ReducerNavbarContext);
  const navigate = useNavigate();
  const styleNavBar = {
    marginLeft: toggleNavBar ? "-20em" : "0",
    backgroundColor:theme ? "#1c1c1c":"white",
  };
 
  const logout = async() => {
   
    try{
     
      const response = await instanceAxios.post('logout')
    

      if(response.data.status === true){
        logOut();
       
        MySwal.fire({
          title: response.data.message,
          icon:"success",
          showConfirmButton:false,
          timer:1000
        })
        navigate("/");
        
      }
      if(response.data.status === false){
        console.log(response.data.message)
        MySwal.fire({
          title: response.data.message,
          icon:"info",
          showConfirmButton:true,
        })
    
      }
     
    }catch(error){
    console.log(error)
    MySwal.fire({
      title: error.response.data.message,
      icon:"info",
    })
  }
   
    
  
  };
  const resize = (e) => {
    e.preventDefault();
    resizeNavBar();
  };
  // const styleImg = {
  //   width: "150px",
  // };

  return (
    <div className="conteneur-navbar" style={styleNavBar}>
      <div className="conteneur-logo">
        {/* <div className="logo-entreprise"></div> */}
        <div>
          {/* <img src="/iugb.png" alt="logo" style={styleImg} /> */}
        </div>
      </div>
      <ul>
        <li>
          <NavLink to="/tableau-bord">
            <AiOutlineHome /> Dashboard
          </NavLink>
        </li>

        <li>
       
        <a href="#" onClick={(e)=>{
            e.preventDefault()
            setIsClikUser(prev=>!prev)
          }}>  <IoPersonOutline />
          Participants 
          <span className="subPlus">{
           !isClikUser ? <BsPlus /> : <AiOutlineMinus/>
            }</span>
          </a>
         
          {isClikUser ? (
            <ul>
            <li><NavLink to="utilisateurs" state={{name:'users'}}>
            <IoPersonOutline /> liste
          </NavLink></li>
          <li>
          <NavLink to="save-utilisateurs">
            <IoPersonOutline /> Enregistrer
          </NavLink>
          </li>
          </ul>
          ) : null}
        
         
        </li>
        <li>
          <NavLink to="profil">
            <CgProfile /> Profil
          </NavLink>
        </li>
      </ul>

      <button onClick={resize} className="btn-reducer">
        <FiCreditCard size="2em" color={theme ? "white":"#1c1c1c"} />
      </button>
      <button className="btn-deconnex" onClick={logout}>
        <BiLogOut size="1.5em" />
        Déconnexion
      </button>
    </div>
  );
}

export default NavBar;
