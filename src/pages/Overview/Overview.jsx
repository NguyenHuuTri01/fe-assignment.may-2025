import React from 'react'
import { useSelector } from 'react-redux'
import { addMovie } from '@/reducers/moviceSlice'
import { useDispatch } from 'react-redux'

function Overview() {
    const movies = useSelector((state) => state.movies.movies)
    const dispatch = useDispatch()

    const handleClick = () => {
        dispatch(addMovie({
            id: "3",
            name: "asdf"
        }))
    }

    return (
        <div className="w-full">
            Overview
            {movies.map((movie, index) => (
                <div key={`movies-${index}`}>{movie.name}</div>
            ))}

            <button onClick={() => handleClick()}>chasdfl</button>
        </div>
    )
}

export default Overview
