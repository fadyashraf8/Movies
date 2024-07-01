import axios from 'axios'
import React, { useEffect, useState } from 'react'
import sora from "../../imgs/download.png"
import { Link } from 'react-router-dom';


export default function People() {



  let [peopleList, setPeopleList] = useState([])
  let pageNumbers = new Array(10).fill("1").map((el, i) => i + 1)
  let pNumberPerson=localStorage.getItem("pageNumberPerson")


  useEffect(() => {
    getPeople()
  }, [])


  
  function changePageNumber(page) {
    getPeople(page)
    localStorage.setItem("pageNumberPerson", page)
  }
  async function getPeople(page = pNumberPerson) {
    let { data } = await axios.get(`https://api.themoviedb.org/3/person/popular?api_key=08ae5681ea424910b451fad865b0825c&language=en-US&page=${page}`)
    setPeopleList(data.results)
  }

  async function search(e) {
    let value = e.target.value

    if(value===""){
      getPeople()
    }else{
      let { data } =await axios.get(`https://api.themoviedb.org/3/search/person?api_key=08ae5681ea424910b451fad865b0825c&query=${value}&include_adult=false&language=en-US&page=1`)
      setPeopleList(data.results)
    }


  }

  return (
    <>
    <input type="text" onChange={search} className='form-control  bg-transparent my-3 text-white' placeholder='Search..' />
      <div className='row mt-4'>
        <div className='col-md-12 text-center'>
          <button className='btn btn-danger btn-lg mt-2'>Popular People</button>
        </div>
        <div className='col-md-12 mt-3'>
          <div className='row'>
            {peopleList.map((people) => <div className='col-md-2'>
              <Link to={"/persondetails/" + people.id}>
                {people.profile_path == null ? <img src={sora} alt="" id='image' /> : <img src={"https://image.tmdb.org/t/p/w500" + people.profile_path} alt="" className='w-100' />}
                <h3 className='text-white h4 mt-1'>{people.name}</h3>
              </Link>


            </div>)}
          </div>
        </div>
      </div>

      <nav aria-label="..." className='mt-4 d-flex justify-content-center'>
        <ul class="pagination pagination-sm">
          {pageNumbers.map((el) => <li class="page-item"><a class="page-link" onClick={() => changePageNumber(el)}>{el}</a></li>)}
        </ul>
      </nav>
    </>
  )
}
