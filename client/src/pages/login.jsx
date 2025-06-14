import React, { useState } from 'react'
import { useNavigate, Link } from "react-router";

const login = () => {
    const navigate = useNavigate()
      const [values, setValues] = useState({
        email: "",
        password: "",
      });
    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
      };
      const submitHandle =async(event)=>{
        event.preventDefault();
        const { email , password } =values
        const response = await fetch('http://localhost:5000/api/login/addlogin/', {
         method: "POST",
         headers: {"Content-Type": "application/json"},
            body: JSON.stringify({   
             email,
             password}),
      
    })
    //const data =   JSON.stringify(response.user);
//console.log("your responce",response);
const data =  await response.json();
//console.log("your data", JSON.stringify(data.userFrom));
     if (data.status===true) {
        localStorage.setItem(
          import.meta.env.VITE_REACT_APP_LOCALHOST_KEY, 
          JSON.stringify(data.userFrom)
        )
         // console.log("data login " ,  JSON.stringify(data.userFrojm))
        }
    navigate("/")
  
    }
  return (
    <div className='container mx-auto mt-10 w-96 bg-gradient-to-tl to-green-200 from-yellow-200' >
   <form action="" onSubmit={(event) => submitHandle(event)}>
    <div className='' >
      <h1 className="text-4xl font-bold underline text-center border-2 pb-3
      ">
    Login
  </h1>
  <div className='flex flex-col content-center gap-5 my-7 py-4 text-center '>
 
  <div className='flex flex-col items-start py-3 pl-3 border border-e-amber-400  '>
    <label>Email : </label>
    <input  className='border-2 outline-amber-300 w-50' name='email' 
     onChange={(e) => handleChange(e)}
    placeholder='email'/>

  </div>
  <div className=' flex flex-col items-start border border-e-amber-400 py-3 pl-3 '>
    <label>Password</label>
    <input  className='border-2 outline-amber-300 w-50'
     name='password'
     onChange={(e) => handleChange(e)}
      placeholder='password'/>

  </div>
 
 </div>
    </div>
    <div className='text-center border-2 border-black '>
      <button type='submit' 
       className= "bg-blue-500 p-2  text-white  font-weight-bold cursor-pointer border-2  border-r-4 text-xl  hover:bg-amber-300 "> submit</button>
   <h2>forgot password</h2>
    <h2>Not have account yet!!? <Link to="/signup">Signup</Link></h2>
    </div>
  
    </form>
    </div>
  )
}

export default login
