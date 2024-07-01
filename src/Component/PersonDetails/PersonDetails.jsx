import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'


export default function PersonDetails() {


    let { id } = useParams()

    let [personDetails, setPersonDetails] = useState(null)


    useEffect(() => {
        getPersonDetails(id)
    }, [id])

    async function getPersonDetails(movieId) {
        let { data } = await axios.get(`https://api.themoviedb.org/3/person/${movieId}?api_key=08ae5681ea424910b451fad865b0825c&language=en-US`)
        setPersonDetails(data)

    }



    return (
        <>
            {personDetails == null ? "" :
                <div className='container mt-4'>
                    <div className='row'>
                        <div className='col-md-4'>
                            <img src={"https://image.tmdb.org/t/p/w500" + personDetails.profile_path} alt="" className='w-100' />
                        </div>
                        <div className='col-md-8 text-white '>
                            <h2 className="btn btn-info btn-lg bg-transparent text-white">{personDetails.name}</h2>
                            <br />
                            <p className='h6 mt-2 btn btn-info btn-lg bg-transparent text-white'> place_of_birth : {personDetails.place_of_birth}</p>
                            <br />
                            <p className='mt-3 btn btn-info btn-lg bg-transparent text-white'>birthday : {personDetails.birthday}</p> 
                            <br />
                            <p className='mt-3 btn btn-info btn-lg bg-transparent text-white' > known_for_department : {personDetails.known_for_department}
                            </p>

                            <p className='mt-3 btn btn-info btn-lg bg-transparent text-white' > biography : {personDetails.biography.slice(0, 400)}</p>



                        </div>
                    </div>
                </div>}
        </>
    )
}
