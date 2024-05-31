import React, {useContext} from 'react'
import { UserContext } from '../../../context/userContext'

const DashBoard = () => {
    const {user} = useContext(UserContext);
  return (
    <div>
        <h1>Dashboard</h1>
        {!!user && (<h1>Hallo {user.name}!</h1>)}
    </div>
  )
}

export default DashBoard