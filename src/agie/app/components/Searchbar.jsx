import React from 'react'


const Searchbar = () => {
    return (
        <div className="text-center"> 
        <form>
                <input className="w-[500px] text-black border-2 border-black/70 rounded-full px-2 py-2 mt-10" type="text" placeholder='Search all of database...'  />
                <button className='bg-black/80 text-white rounded-full px-3 py-2 hover:bg-black/50' >
                    Search
                </button> 
        </form>
    </div>
    )
}

export default Searchbar;