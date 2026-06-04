import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Joi from 'joi'



export default function Login(props) {

  let { saveUser } = props

  let [user, setUser] = useState({
    email: 'test@gmail.com',
    password: 'ok123',
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

      // Allow login with test credentials using a mock JWT token bypass
      if (user.email === 'test@gmail.com' && user.password === 'ok123') {
        const mockToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwiZmlyc3RfbmFtZSI6IlRlc3QiLCJsYXN0X25hbWUiOiJVc2VyIn0.signature";
        localStorage.setItem("token", mockToken)
        saveUser()
        setLoading(false)
        navigate('/')
        return
      }

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
        <input type="email" className='form form-control bg-transparent my-2 text-white' onChange={addUser} name='email' id='email' value={user.email} />

        <label className='text-white fs-2'>Password:</label>
        <input type="password" className='form form-control bg-transparent my-2 text-white' onChange={addUser} name='password' id='password' value={user.password} />

        <div className='card bg-transparent border-info text-white p-3 my-3' style={{ maxWidth: '400px', border: '1px solid #0dcaf0' }}>
          <div className='card-body p-0'>
            <h6 className='text-info mb-2'><i className="fa-solid fa-circle-info me-2"></i>Demo Credentials</h6>
            <p className='small mb-2 text-white-50'>Use these credentials to log in:</p>
            <div className='ps-2 border-start border-info small'>
              <div><strong>Email:</strong> test@gmail.com</div>
              <div><strong>Password:</strong> ok123</div>
            </div>
          </div>
        </div>

        {loading ? <button className='btn btn-info ms-auto my-3' >
          <i className='fa-solid fa-spinner fa-spin'></i>
        </button> : <button className='btn btn-info ms-auto my-3' type='submit'>Login</button>}
      </form>
    </div>
  )
}
