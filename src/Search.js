import React from 'react'
import { useGlobalContext } from './Context'

const Search = () => {

    const{ query } = useGlobalContext()

  return (
    <>
        <h1>Amit Goswami Tech Website</h1>
        <form onSubmit={(e) => e.preventDefault()}>
            <div>
                <input
                type="text"
                placeholder="search here"
                value={query}
                // onChange={(e) => searchPost(e.target.value)}
                />
            </div>
        </form>
    </>
    
  )
}

export default Search