import axios from 'axios';
import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'


export default function MovieDetails() {

    let { id } = useParams()

    let [MovieDetails, setMovieDetails] = useState(null)

    useEffect(() => {
        getMovieDetails(id)
    }, [id])


    async function getMovieDetails(movieId) {
        let { data } = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=08ae5681ea424910b451fad865b0825c&language=en-US`)
        setMovieDetails(data)

    }


    return (
        <>
            {MovieDetails == null ? "" :
                <div className='container mt-4'>
                    <div className='row'>
                        <div className='col-md-4'>
                            <img src={"https://image.tmdb.org/t/p/w500" + MovieDetails.poster_path} alt="" className='w-100' />
                        </div>
                        <div className='col-md-8 text-white '>
                            <h2 className='mt-3 btn btn-info btn-lg bg-transparent text-white'>{MovieDetails.title}</h2>
                            <br />
                            <p className='mt-3 btn btn-info btn-lg bg-transparent text-white'>{MovieDetails.tagline}</p>
                            <br />
                            {MovieDetails.genres.map((e,index) => <button key={index} className='btn btn-info btn-sm mx-2 mt-2'>{e.name}</button>)}
                            <br />
                            <p className='mt-3 btn btn-info btn-lg bg-transparent text-white'>Vote : {MovieDetails.vote_average}</p>
                            <br />

                            <p className='mt-3 btn btn-info btn-lg bg-transparent text-white' >Vote Count : {MovieDetails.vote_count}</p>
                            <br />

                            <p className='mt-3 btn btn-info btn-lg bg-transparent text-white' >popularity : {MovieDetails.popularity}</p>
                            <br />

                            <p className='mt-3 btn btn-info btn-lg bg-transparent text-white' >release_date : {MovieDetails.release_date}</p>
                            <p className='mt-3 btn btn-info btn-lg bg-transparent text-white' >overview : {MovieDetails.overview}</p>
                        </div>
                    </div>
                </div>}
        </>
    )
}
