import React, { useState } from 'react'
import { useNavigate, Link } from "react-router";
 

const signup = () => {
const navigate = useNavigate()
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  const submitHandle =async(event)=>{
    event.preventDefault();
    const {name, email , password ,confirmPassword} =values
    const response = await fetch('http://localhost:5000/api/signup/addsignup/', {
     method: "POST",
     headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
         name,
         email,
         password,
         confirmPassword
    }),
  
})
const data =  await response.json();
console.log("your data",data);
//console.log("your data submitted" , response)
 navigate("/")
}
  return (
    <>
    <div className='container mx-auto mt-10 w-96 bg-gradient-to-tl to-green-200 from-yellow-200' >
   <form action="" onSubmit={(event) => submitHandle(event)}>
    <div className='' >
      <h1 className="text-4xl font-bold underline text-center border-2 pb-3
      ">
    Signup
  </h1>
  <div className='flex flex-col content-center gap-5 my-7 py-4 text-center '>
  <div className=' flex flex-col items-start border border-e-amber-400 py-3 pl-3'>
    <label>Name : </label>
    <input className='border-2 outline-amber-300 w-50' 
     name='name'
      onChange={(e) => handleChange(e)}
      placeholder='name'/>

  </div>
  <div className='flex flex-col items-start py-3 pl-3 border border-e-amber-400  '>
    <label>Email : </label>
    <input name='email' 
     onChange={(e) => handleChange(e)}
    placeholder='email'/>

  </div>
  <div className=' flex flex-col items-start border border-e-amber-400 py-3 pl-3 '>
    <label>Password</label>
    <input name='password'
     onChange={(e) => handleChange(e)}
      placeholder='password'/>

  </div>
  <div className=' flex flex-col items-start border border-e-amber-400 py-3 pl-3 '>
    <label>Confirm Password</label>
    <input name='confirmPassword'
     onChange={(e) => handleChange(e)}
      placeholder='confirm password'/>

  </div>
 </div>
    </div>
    <div className='text-center border-2 border-black '>
      <button type='submit' 
       className= "bg-blue-500 p-2  text-white  font-weight-bold cursor-pointer border-2  border-r-4 text-xl  hover:bg-amber-300 "> submit</button>
    <h2>already have account? <Link to="/login">login</Link></h2>
    </div>
    {/* <h2>{values.name}</h2> */}
    </form>
    </div>
    </>
  )
}

export default signup
