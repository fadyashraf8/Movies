import axios from 'axios';
import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
export default function TvDetails() {


    let { id } = useParams()
    let [TvDetails, setTvDetails] = useState(null)


    useEffect(() => {
        getTvDetails(id)
    }, [id])


    async function getTvDetails(tvId) {
        let { data } = await axios.get(`https://api.themoviedb.org/3/tv/${tvId}?api_key=08ae5681ea424910b451fad865b0825c&language=en-US`)
        setTvDetails(data)
     
    }


    return (
        <>
   {TvDetails == null ? "" :
                <div className='container mt-4'>
                    <div className='row'>
                        <div className='col-md-4'>
                            <img src={"https://image.tmdb.org/t/p/w500" + TvDetails.poster_path} alt="" className='w-100' />
                        </div>
                        <div className='col-md-8 text-white '>
                            <h2  className='mt-3 btn btn-info btn-lg bg-transparent text-white'>{TvDetails.name}</h2>

                            <p className='h6'>{TvDetails.tagline}</p>

                            {TvDetails.genres.map((e) => <button className='btn btn-info btn-sm mx-2 mt-2'>{e.name}</button>)}
                            <br />
                            <p  className='mt-3 btn btn-info btn-lg bg-transparent text-white'>Vote : {TvDetails.vote_average}</p>
                            <br />

                            <p  className='mt-3 btn btn-info btn-lg bg-transparent text-white' >Vote Count : {TvDetails.vote_count}</p>
                            <br />

                            <p  className='mt-3 btn btn-info btn-lg bg-transparent text-white' >popularity : {TvDetails.popularity}</p>
                            <br />

                            <p  className='mt-3 btn btn-info btn-lg bg-transparent text-white'>release_date : {TvDetails.first_air_date}</p>
                            <br />

                            <p  className='mt-3 btn btn-info btn-lg bg-transparent text-white'>overview : {TvDetails.overview}</p>
                        </div>
                    </div>
                </div>}
        </>
    )
}
