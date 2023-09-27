import React from "react";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

function ForgetPassword() {
  const navigate = useNavigate()
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
  const logo = "/iugb.png";
  const sendEmailForResetPassword = (e) => {
    const dataSend = {
      email: e.target.email.value,
    };
    console.log(dataSend);
  };
  return (
    <div className="forget-password">
      <form onSubmit={sendEmailForResetPassword}>
        <span className="back-home" onClick={()=>{
          navigate('/')
        }}>
          <IoChevronBackCircleOutline />
        </span>
        {/* <img src={logo} alt={logo} style={styleImg} /> */}
        <h1>Réinitialiser votre mot de passe</h1>
        <input type="email" id="email" placeholder="Enter your email" />
        <button style={styleBtn} type="submit">
          Send
        </button>
      </form>
    </div>
  );
}

export default ForgetPassword;
