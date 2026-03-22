import { useState } from "react";
import FaceExpressionDetector from "./components/FaceExpressionDetector";
import MoodSongs from "./components/MoodSongs";
import "./App.css";

function App() {
  const [songs, setSongs] = useState([]);

  return (
    <div className="app">
      <h1 className="app-title">🎧 Moody Player</h1>

      <div className="top-section">
        <FaceExpressionDetector setSongs={setSongs} />
      </div>

      <div className="bottom-section">
        <MoodSongs Songs={songs} />
      </div>
    </div>
  );
}

export default App;