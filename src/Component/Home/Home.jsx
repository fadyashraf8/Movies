import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import sora from "../../imgs/download.png"
import { Link } from 'react-router-dom';


export default function Home() {

  let [movieList, setMovieList] = useState([])
  let [tvList, setTvList] = useState([])
  let [peopleList, setPeopleList] = useState([])


  useEffect(() => {
    getData("movie", setMovieList)
    getData("tv", setTvList)
    getData("person", setPeopleList)

  }, [])

  async function getData(type, callback) {
    let { data } = await axios.get(` https://api.themoviedb.org/3/trending/${type}/day?api_key=08ae5681ea424910b451fad865b0825c`)
    callback(data.results.slice(0, 10))
  }


  return (
    <>
      <div className='row g-3 mt-3  '>
        <div className='col-md-4 '>
          <h2 className='text-black bg- ms-5 mt-5 border border-1 border-white p-4 bg-light  shadow-lg rounded-5'>
            Trending <br />
            Movies <br />
            to watch now
          </h2>
        </div>
        {movieList.map((movie) => <div className='col-md-2' >
          <Link to={"/moviedetails/" + movie.id}>
            <div className='item position-relative'>

              <img src={"https://image.tmdb.org/t/p/w500" + movie.poster_path} alt="" className='w-100' />
              <h3 className='text-white h5'>{movie.title}</h3>
            </div>
          </Link>
        </div>)}



      </div>

      <div className='row g-3 mt-3  '>
        <div className='col-md-4  '>
          <h2 className='text-black bg- ms-5 mt-5 border border-1 border-white p-4 bg-light  shadow-lg rounded-5'>
            Trending <br />
            Tv <br />
            to watch now
          </h2>
        </div>
        {tvList.map((tv) => <div className='col-md-2' >

          <Link to={"/tvdetails/" + tv.id}>

            <div className='item position-relative'>

              <img src={"https://image.tmdb.org/t/p/w500" + tv.poster_path} alt="" className='w-100' />
              <h3 className='text-white h5'>{tv.name}</h3>
            </div>
          </Link>
        </div>)}



      </div>

      <div className='row g-3 mt-3  '>
        <div className='col-md-4  '>
          <h2 className='text-black bg- ms-5 mt-5 border border-1 border-white p-4 bg-light  shadow-lg rounded-5'>
            Trending <br />
            People <br />
            to watch now
          </h2>
        </div>
        {peopleList.map((people) => <div className='col-md-2' >
          <Link to={"/persondetails/" + people.id}>
            <div className='item position-relative'>

              {people.profile_path == null ? <img src={sora} alt="" className='w-100' /> : <img src={"https://image.tmdb.org/t/p/w500" + people.profile_path} alt="" className='w-100' />}



              <h3 className='text-white h5'>{people.name}</h3>
            </div>
          </Link>
        </div>)}



      </div>




    </>
  )
}



