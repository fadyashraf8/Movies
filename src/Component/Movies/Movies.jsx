import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

import { Link } from 'react-router-dom';

export default function Movies() {


  let [movies, setMovies] = useState([])
  let [currentCategory, setCurrentCategory] = useState("")
  let pageNumbers = new Array(10).fill("1").map((el, i) => i + 1)
  let pNumberMov = localStorage.getItem("pageNumberMov")
  let pTypeMov = localStorage.getItem("pageTypeMov")

  if (pNumberMov == null || pTypeMov == null) {
    getMovies(1, "popular")

  } else {
    getMovies(pNumberMov, pTypeMov)
  }
  async function getMovies(pageNum = pNumberMov, type = pTypeMov) {
    let { data } = await axios.get(`https://api.themoviedb.org/3/movie/${type}?api_key=08ae5681ea424910b451fad865b0825c&language=en-US&page=${pageNum}`)
    setMovies(data.results)
  }


  function changePageNumber(pageNum) {
    getMovies(pageNum, currentCategory)
    localStorage.setItem("pageNumberMov", pageNum)

  }
  function changeCategory(e) {
    let type = e.target.id
    setCurrentCategory(type)
    getMovies(1, type)
    localStorage.setItem("pageTypeMov", type)
    localStorage.setItem("pageNumberMov", 1)
  }

  async function search(e) {
    let value = e.target.value

    if (value === "") {
      getMovies()
    } else {
      let { data } = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=08ae5681ea424910b451fad865b0825c&query=${value}&include_adult=false&language=en-US&page=1`)
      setMovies(data.results)
      console.log(movies);
    }
  }


  useEffect(() => {
    getMovies()
  }, [])
  return (
    <>

      <input type="text" onChange={search} className='form-control  bg-transparent my-3 text-white' placeholder='Search..' />

      <div className='row g-3 mt-3  '>

        <div className='col-md-2 bg-transparent h-75'>

          <button id="popular" onClick={changeCategory} className='btn btn-danger btn-lg mt-4'>Popular</button>
          <button id="top_rated" onClick={changeCategory} className='btn btn-danger btn-lg mt-4'>Top Rated</button>
          <button id='now_playing' onClick={changeCategory} className='btn btn-danger btn-lg mt-4'>Now Playing</button>
          <button id='upcoming' onClick={changeCategory} className='btn btn-danger btn-lg mt-4 mb-4'>Upcoming</button>
        </div>
        <div className='col-md-10'>
          <div className='row'>
            <p className='fs-3 bg-dark rounded-5'>{currentCategory}</p>

            {movies.map((movie,index) => {
              return <div key={index} className='col-md-2' >
                <Link to={"/moviedetails/" + movie.id}>
                  <div className='item position-relative'>
                    <img src={"https://image.tmdb.org/t/p/w500" + movie.poster_path} alt="" className='w-100' />
                    <h3 className='text-white h6'>{movie.title}</h3>
                  </div>
                </Link>
              </div>
            }
            )}
          </div>

        </div>




      </div>



      <nav aria-label="..." className='mt-4 d-flex justify-content-center'>
        <ul className="pagination pagination-sm">
          {pageNumbers.map((el,index) => <li key={index} className="page-item"><a className="page-link" onClick={() => changePageNumber(el)}>{el}</a></li>)}
        </ul>
      </nav>
    </>
  )
}














