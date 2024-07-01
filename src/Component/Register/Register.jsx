import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Joi from 'joi'
export default function Register() {

  let [user, setUser] = useState({
    first_name: "",
    last_name: "",
    age: "",
    email: "",
    password: "",
  })


  let navigate = useNavigate()


  let [loading, setLoading] = useState(false)
  let [errorApiList, setErrorApi] = useState("")
  let [errorList, setErrorList] = useState([])



  function addUser(e) {
    let myUser = { ...user }
    myUser[e.target.name] = e.target.value
    setUser(myUser)
  }

  async function submitForm(e) {
    e.preventDefault()
    let valid = validData()
    
    if (valid.error === undefined) {
      
      setLoading(true)
       await axios.post("https://signup-signin-backend.vercel.app/user/signup", user).then((data)=>{
      
        navigate("/login")
        setLoading(false)
        console.log(data);

       }).catch((error)=>{
         setErrorApi(error.response.data.error)
         setLoading(false)
        console.log(error.response.data.error);

       })

    }
    else {
      setErrorList(valid.error.details)
    }
  }


  function validData() {
    let schema = Joi.object({
      first_name: Joi.string().required().min(3).max(30).alphanum(),
      last_name: Joi.string().required().min(3).max(30).alphanum(),
      age: Joi.number().required().min(10).max(80),
      email: Joi.string().required().email({ tlds: { allow: ['net', 'com'] } }),
      password: Joi.string().required().pattern(new RegExp(/^[a-z]{2,}[0-9]{1,}?$/))
    })
    return schema.validate(user, { abortEarly: false })
  }



  return (
    <div className='container my-2'>

      {errorApiList === "" ?  <div className='bg-transparent'></div>  : <div className='alert alert-danger'>{errorApiList}</div>}

      {errorList.length > 0 ? errorList.map((e) => <div className='alert alert-danger'>{e.message}</div>) : <div className='bg-transparent'></div> }




      <h2 className='text-white'>Registeration Form</h2>
      <form onSubmit={submitForm}>
        <label className='text-white fs-2'>first name:</label>
        <input type="text" className='form form-control bg-transparent my-2 text-white' onChange={addUser} name='first_name' id='first_name' />

        <label className='text-white fs-2'>last name:</label>
        <input type="text" className='form form-control bg-transparent my-2 text-white' onChange={addUser} name='last_name' id='last_name' />


        <label className='text-white fs-2'>Age:</label>
        <input type="number" className='form form-control bg-transparent my-2 text-white' onChange={addUser} name='age' id='age' />


        <label className='text-white fs-2'>Email:</label>
        <input type="email" className='form form-control bg-transparent my-2 text-white' onChange={addUser} name='email' id='email' />

        <label className='text-white fs-2'>Password:</label>
        <input type="password" className='form form-control bg-transparent my-2 text-white' onChange={addUser} name='password' id='password' />
        <p className='fs-3 bg-dark p-2 rounded-5 mx-5 text-center text-white'>Use This Password : ok123</p>

        {loading ? <button className='btn btn-info ms-auto my-3' >
          <i className='fa-solid fa-spinner fa-spin'></i>
        </button> : <button className='btn btn-info ms-auto my-3' type='submit'>register</button>}

      </form>
    </div>
  )
}



