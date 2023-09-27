import React,{useEffect, useState} from 'react'
import instanceAxios from '../api/api'
function Accueil() {
  const [data,setData] = useState("")
  useEffect(()=>{
    const getParticipant = async ()=>{
      const response = await instanceAxios.get("get-user")
      const dataLength = response.data.data.length
      setData(dataLength);
    }
    getParticipant()
  },[])
  return (
    <div className='conteneur-page'>
      <h1>Tableau de bord</h1>
      {
        data ? (<section className='conteneur-number-people'>
        <div style={
          {alignItems:"center"}
        }> 
          <h5>Participants</h5>
          <h1>{data}</h1>
        </div>
    </section>):(
      <h5>loading.....</h5>
    )
      }
    </div>
  )
}

export default Accueil
