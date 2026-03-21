import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import FaceExpressionDetector from './components/FaceExpressionDetector'
import MoodSongs from './components/MoodSongs'

function App() {
  const [Songs , setSongs] = useState([
      ])
  

  return (
    <>
      <FaceExpressionDetector setSongs={setSongs}/>
      <MoodSongs Songs={Songs}/>
    </>
  )
}

export default App
