import React, {useState} from "react";
import Input from "../features/Input";

import instanceAxios from "../api/api"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { ProgressSpinner } from 'primereact/progressspinner';


function SaveParticipants() {
    const MySwal = withReactContent(Swal)

  const [data,setData] = useState({nom:"",prenoms:"",email:"",phone:""})
  const [isLoading,setIsLoading] = useState(false);
  
 
  const sendData = async(e)=>{

    e.preventDefault()
    setIsLoading(true)
    try{
      
    const response = await instanceAxios.post('create-user',{
      nom:data.nom,
      prenoms:data.prenoms,
      email:data.email,
      phone:data.phone
    })
    
    if(response.data.status === true){
      setIsLoading(false)
      MySwal.fire({
        title:response.data.message,
        icon:"success",
       
      })
      setData({email:"",nom:"",prenoms:" ",phone:" "})
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

        <div className="progil-info">
         <h2>Enregistrer un participant</h2>
        </div>

      </div>
      <form onSubmit={sendData}>
        <Input
          label="Name"
          typeInput="text"
          nameInput="name"
          active={false}
          dataValue={data.nom}
          handleChangePassword={
            (e)=>{
                setData({ ...data, nom: e.target.value })
            }
          }
        />
        <Input
          label="Prenoms"
          typeInput="text"
          nameInput="prenoms"
          active={false}
          dataValue={data.prenoms}
          handleChangePassword={
            (e)=>{
                setData({ ...data, prenoms: e.target.value })
            }
          }
        />
       
        
        <Input
          label="Email"
          typeInput="text"
          nameInput="email"
          active={false}
          dataValue={data.email}
          handleChangePassword={
            (e)=>{
                setData({ ...data, email: e.target.value })
            }
          }
        />
        <Input
          label="Téléphone"
          typeInput="text"
          active={false}
          dataValue={data.phone}
          handleChangePassword={
            (e)=>{
                setData({ ...data, phone: e.target.value })
            }
          }
        />
       
       
      <div>
        <button>
        {
            isLoading ? <ProgressSpinner
           style={{width: '20px', height: '20px'}} 
          strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" />:
          <strong>Enregistrer</strong>}</button>
      </div>
      </form>
    </div>
  );
}

export default SaveParticipants