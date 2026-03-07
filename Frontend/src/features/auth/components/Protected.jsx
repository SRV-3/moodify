import React, { useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import { Navigate } from 'react-router'

function Protected({children}) {
    const { user, loading} = useAuth()

    if(!user){
      return  <Navigate to="/login"/>
    }
    if(loading){
      return <h1>Loading...</h1>
    }

  return children
}

export default Protected
