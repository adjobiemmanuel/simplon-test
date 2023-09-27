import React from 'react'
import { useNavigate } from 'react-router-dom'

function Page404() {
  const navigate = useNavigate()
  return (
    <div className='error-page'>
      <h1>La page demandée n'est existe pas.</h1>
      <button onClick={()=>{navigate('/')}}>Accueil</button>
    </div>
  )
}

export default Page404
