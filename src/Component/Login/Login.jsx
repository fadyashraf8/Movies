import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Joi from 'joi'



export default function Login(props) {

  let { saveUser } = props

  let [user, setUser] = useState({
    email: '',
    password: '',
  })

  let navigate = useNavigate()

  let [errorApiList, setErrorApi] = useState('')
  let [errorList, setErrorList] = useState([])
  let [loading, setLoading] = useState(false)
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
      await axios.post('https://signup-signin-backend.vercel.app/user/signin', user).then((data) => {
        navigate('/')
        localStorage.setItem("token", data.data.token)
        saveUser()
        setLoading(false)
        console.log(data.data);
      }).catch((error) => {
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
      email: Joi.string().required().email({ tlds: { allow: ['com', 'net'] } }),
      password: Joi.string().required().pattern(new RegExp(/^[a-z]{2,}[0-9]{1,}?$/)),
    })
    return schema.validate(user, { abortEarly: false })
  }




  return (
    <div className='container my-2'>

      {errorApiList === "" ? <div className='bg-transparent'></div> : <div className='alert alert-danger'>{errorApiList}</div>}

      {errorList.length > 0 ? errorList.map((e) => <div className='alert alert-danger'>{e.message}</div>) : ""}



      <form onSubmit={submitForm}>


        <label className='text-white fs-2 '>Email:</label>
        <input type="email" className='form form-control bg-transparent my-2 text-white' onChange={addUser} name='email' id='email' />

        <label className='text-white fs-2'>Password:</label>
        <input type="password" className='form form-control bg-transparent my-2 text-white' onChange={addUser} name='password' id='password' />

        {loading ? <button className='btn btn-info ms-auto my-3' >
          <i className='fa-solid fa-spinner fa-spin'></i>
        </button> : <button className='btn btn-info ms-auto my-3' type='submit'>Login</button>}
      </form>
    </div>
  )
}
