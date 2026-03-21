import React, { useState } from 'react'
import './MoodSongs.css'

const MoodSongs = ({Songs}) => {

    const[isPlaying, setisPlaying] = useState(null)

    const handlePayPause = (index)=>{
        if(isPlaying=== index){
            setisPlaying(null)
        }else{
            setisPlaying(index);
        }
    }
 
    
  return (
    <div className='mood-songs'>
        <h2>Recommanded Songs</h2>

        {Songs.map((song, index) => (
            <div className='song' key={index}>
                <div className="title">
                    <h3> {song.title} </h3>
                    <p> {song.artist} </p>
                </div>
                <div className="play-pause-button">

                    
                    {
                        isPlaying=== index &&
                         <audio src={song.audio} style={{
                        display : 'none',
                        
                    }}
                    autoPlay={isPlaying===index}
                    ></audio>
                    }

                    <button onClick={()=>handlePayPause(index)}>
                        {isPlaying===index ?  <i className="ri-pause-line"></i> :  <i className="ri-play-circle-fill"></i>}
                    </button>
                    
                   
                   
                </div>


            </div>
        ))}
      
    </div>
  )
}

export default MoodSongs
