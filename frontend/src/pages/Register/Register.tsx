import React, {useState} from 'react'
import '../../App.css'
import { useNavigate } from 'react-router-dom'
const Register = () => {

  const navigate = useNavigate();

    const [data, setData] = useState({
        name:'',
        email:'',
        password:''
    })

    const registerUser = async(e:React.FormEvent)=>{
        e.preventDefault()
        const {name, email, password} = data;
        try {
          const response = await fetch("http://localhost:4000/register", {
            method:"POST",
            headers:{
              'content-type':"application/json",
            },
            body:JSON.stringify({name, email, password})

          })
          const result = await response.json();
          if (!response.ok) {
            console.error('Error hai sathi:', result);
          } else {
            console.log('Successfully registered:', result);
            setData({ name: '', email: '', password: '' });
            navigate('/login')
          }
        } catch (error) {
          console.log(error)
        }
    }

  return (

    <div className="App">
    <form className="register-form"  onSubmit={registerUser}>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={data.name}
          onChange={(e)=> setData({...data, name:e.target.value})}
          
          
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={data.email}
          onChange={(e)=> setData({...data, email:e.target.value})}
          
         
          
        />
      </div>
      <div className="form-group">  
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={data.password}
          onChange={(e)=> setData({...data, password:e.target.value})}
         
          
        />
      </div>
      <button type="submit">Register</button>
    </form>
  </div>
  )
}

export default Register