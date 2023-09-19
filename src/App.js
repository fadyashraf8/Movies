
import {  createHashRouter, Navigate, RouterProvider } from 'react-router-dom';
import './App.css';
import Home from './Component/Home/Home'
import Login from './Component/Login/Login';
import Movies from './Component/Movies/Movies';
import People from './Component/People/People';
import Register from './Component/Register/Register';
import Tv from './Component/Tv/Tv';
import Notfound from './Component/NotFound/NotFound';
import MasterLayout from './Component/MasterLayout.jsx/MasterLayout';
import jwtDecode from 'jwt-decode';
import { useEffect, useState } from 'react';
import MovieDetails from './Component/MovieDetails/MovieDetails';
import TvDetails from './Component/TvDetails/TvDetails';
import PersonDetails from './Component/PersonDetails/PersonDetails';

function App() {

  let [user, setUser] = useState(null)

  useEffect(() => {
    if (localStorage.getItem("token") != null) {
      saveUserData()
    }
  },[])


  function saveUserData() {
    let token = localStorage.getItem("token")
    let myUser = jwtDecode(token)
    setUser(myUser)
  }


  function ProtectedRouter(props) {
    if (localStorage.getItem("token") == null) {
      return <Navigate to="/login" />
    }
    else {
      return props.children
    }
  }


  function ProtectedRouter2(props) {
    if (localStorage.getItem("token") != null) {
      return <Navigate to="/home" />
    }
    else {
      return props.children
    }
  }
  function logOut(){
    localStorage.removeItem("token")
    setUser(null)
    return <Navigate to="/login"  />

  }


  let router = createHashRouter([

    {path: '/', element: <MasterLayout user={user} logOut={logOut} />,
     children: [
        { path: '/', element: <ProtectedRouter><Home/></ProtectedRouter>  },
        { path: 'Movies-Website', element: <ProtectedRouter><Home/></ProtectedRouter>  },
        { path: 'home', element: <ProtectedRouter><Home/></ProtectedRouter> },
        { path: 'movies', element: <ProtectedRouter><Movies/></ProtectedRouter> },
        { path: 'people', element: <ProtectedRouter><People/></ProtectedRouter> },
        { path: 'tv', element: <ProtectedRouter><Tv/></ProtectedRouter> },
        { path: 'moviedetails/:id', element: <ProtectedRouter><MovieDetails/></ProtectedRouter> },
        { path: 'tvdetails/:id', element: <ProtectedRouter><TvDetails/></ProtectedRouter> },
        { path: 'persondetails/:id', element: <ProtectedRouter><PersonDetails/></ProtectedRouter> },
        { path: 'login', element: <ProtectedRouter2><Login saveUser={saveUserData} /></ProtectedRouter2>   },
        { path: 'register', element: <ProtectedRouter2><Register /></ProtectedRouter2>    },
        { path: '*', element: <Notfound /> },
      ]
    }

  ])





  return (
    <RouterProvider router={router} />
  );
}

export default App;
