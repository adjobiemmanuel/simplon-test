import React from 'react'

function Input({label,typeInput,nameInput,valueDefault,active,handleChangePassword,dataValue}) {
  return (
    <div className='input-label-profil'>
      <label htmlFor={nameInput}>{label}</label>
      <br />
      {!active ? <input style={
        {backgroundColor:"white"}
      }
      type={typeInput} 
      value={dataValue}
      onChange={handleChangePassword}
      /> :  <input disabled type={typeInput} defaultValue={valueDefault}/> }
     
    </div>
  )
}

export default Input
