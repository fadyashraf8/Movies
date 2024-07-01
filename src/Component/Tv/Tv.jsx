import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import sora from "../../imgs/download.png"


export default function Tv() {

  let [tvs, setTv] = useState([])
  let [currentCategory, setCurrentCategory] = useState("")

  let pageNumbers = new Array(10).fill("1").map((el, i) => i + 1)
  let pageNumberTv = localStorage.getItem("pageNumberTv")
  let pageTypeTv = localStorage.getItem("pageTypeTv")

  useEffect(() => {
    getTv()
  }, [])

  if (pageNumberTv == null || pageTypeTv == null) {
    getTv(1, "popular")
  } else {
    getTv(pageNumberTv, pageTypeTv)
  }

  async function getTv(page = pageNumberTv, type = pageTypeTv) {
    let { data } = await axios.get(`https://api.themoviedb.org/3/tv/${type}?api_key=08ae5681ea424910b451fad865b0825c&page=${page}`)
    setTv(data.results)
  }

  function changePageNumber(page) {
    getTv(page, currentCategory)
    localStorage.setItem("pageNumberTv", page)
  }
  function changeCategory(e) {
    let type = e.target.id
    setCurrentCategory(type)
    getTv(1, type)
    localStorage.setItem("pageTypeTv", type)
    localStorage.setItem("pageNumberTv", 1)
  }
  async function search(e) {
    let value = e.target.value

    if (value === "") {
      getTv()
    } else {
      let { data } = await axios.get(`https://api.themoviedb.org/3/search/tv?api_key=08ae5681ea424910b451fad865b0825c&query=${value}&include_adult=false&language=en-US&page=1`)
      setTv(data.results)
    }


  }

  return (
    <>
      <input type="text" onChange={search} className='form-control  bg-transparent my-3 text-white' placeholder='Search..' />
      <div className='row g-3 mt-3'>
        <div className='col-md-2'>
          <button id='popular' onClick={changeCategory} className='btn btn-danger btn-lg mt-4'>Popular</button>
          <button id='top_rated' onClick={changeCategory} className='btn btn-danger btn-lg mt-4'>Top Rated</button>
          <button id='on_the_air' onClick={changeCategory} className='btn btn-danger btn-lg mt-4'>On The Air</button>
          <button id='airing_today' onClick={changeCategory} className='btn btn-danger btn-lg mt-4'>Airing Today</button>
        </div>

        <div className='col-md-10'>
          <div className='row g-4'>
            <p className='fs-3 bg-dark rounded-5'>{currentCategory}</p>

            {tvs.map((tv,index) => <div key={index} className='col-md-4'>

              <Link to={"/tvdetails/" + tv.id}>
                {tv.backdrop_path == null ? <img src={sora} alt="" id='image' /> : <img src={"https://image.tmdb.org/t/p/w500" + tv.backdrop_path} alt="" className='w-100' />}

                <h3 className='text-white h4 mt-1'>{tv.original_name}</h3>
              </Link>
            </div>)}
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
