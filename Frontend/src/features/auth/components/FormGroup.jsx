import React from 'react'

function FormGroup({label, placeholder, value, onChange}) {
  return (
    <div className="form-group">
        <label htmlFor={label}>{label}</label>
        <input 
          value={value}
          onChange={onChange }
          type={label} id={label} name={label} placeholder={placeholder} required/>
    </div>
  )
}

export default FormGroup
