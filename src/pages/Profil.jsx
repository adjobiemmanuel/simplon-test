import React, { useContext, useState } from "react";
import Input from "../features/Input";
import { AuthContext } from "../context/AuthContext";
import instanceAxios from "../api/api"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { ProgressSpinner } from 'primereact/progressspinner';


function Profil() {
    const MySwal = withReactContent(Swal)
  const {user} = useContext(AuthContext)
  const [data,setData] = useState({password:"",oldPassword:""})
  const [isLoading,setIsLoading] = useState(false);
  const handlePassword = (e)=>{
    setData({ ...data, password: e.target.value })
  }
  const handleoldPassword = (e)=>{
    setData({ ...data, oldPassword: e.target.value })
  }
  const sendNewPassword = async(e)=>{
    e.preventDefault()
    setIsLoading(true)
    try{
    const response = await instanceAxios.post('update_password',{
      password:data.password,
      oldPassword:data.oldPassword
    })
    if(response.data.status === true){
      setIsLoading(false)
      MySwal.fire({
        title:response.data.message,
        icon:"success",
       
      })
      setData({password:"",oldPassword:""})
    }
    if(response.data.status === false){
      MySwal.fire({
        title:response.data.message,
        icon:"info",
      
      })
      setIsLoading(false)
    }
    console.log(response)
    }catch(error){
      console.log(error)
      MySwal.fire({
        title: error.response.data.message,
        icon:"info",
        
      })
      setIsLoading(false)
    }
    console.log(data)
  }
  return (
    <div className="profil-setting">
      <div className="conteneur-image-info">
        {/* <div className="profil-image">
          <img src="/iugb.png" alt="iugb" />
        </div> */}
        <div className="progil-info">
         <h2>{user.nom} {user.prenoms}</h2>
         <span>Admin</span>
        </div>

      </div>
      <form onSubmit={sendNewPassword}>
        <Input
          label="Name"
          typeInput="text"
          nameInput="name"
          active={true}
          valueDefault={user.nom}
        />
        <Input
          label="Full Name"
          typeInput="text"
          nameInput="full-name"
          active={true}
          valueDefault={user.prenoms}
        />
        <Input
          label="Email"
          typeInput="text"
          nameInput="email"
          active={true}
          valueDefault={user.email}
        />

      
      </form>
    </div>
  );
}

export default Profil;
