import * as faceapi from "face-api.js";
import { useEffect, useRef, useState } from "react";
import "./FaceExpression.css"
import axios from 'axios'

export default function FaceExpressionDetector({setSongs}) {
  const videoRef = useRef(null);
  const [expression, setExpression] = useState();

  useEffect(() => {
    loadModels().then(startCamera);
  }, []);

  const loadModels = async () => {
    const MODEL_URL = import.meta.env.BASE_URL + "models";
    await Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
      faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
    ]);
    console.log("✅ Models loaded");
  };

  const startCamera = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    videoRef.current.srcObject = stream;
  };

  const handleVideoPlay = () => {
    console.log("▶ Video playing");
    detectFace();
  };

  const detectFace = async () => {
    if (!videoRef.current) return;

    const detection = await faceapi
      .detectSingleFace(
        videoRef.current,
        new faceapi.TinyFaceDetectorOptions()
      )
      .withFaceExpressions();

    if (detection?.expressions) {
      const best = Object.entries(detection.expressions)
        .sort((a, b) => b[1] - a[1])[0];
        const mood = best[0]

      setExpression(
        mood
      );
      const res = await axios.get(`https://moody-player-rpqt.onrender.com/songs?mood=${mood}`)

      .then(response=>{
        console.log(response.data);
        setSongs(response.data.songs)
    })
    } else {
      setExpression("No face detected");
    }
    //get http://localhost:3000/songs?mood=sad

    

   // setTimeout(detectFace , 20000); // control FPS
  };

  return (
    <div className="mood-element" >
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        width="320"
        className="user-video-feed"
        //onPlay={handleVideoPlay}
      />

      <button onClick={detectFace} style={{display: "flex"}}>Detect MOOD</button>

      <h2>{expression}</h2>
      <h3>{ console.log(expression)}</h3>
    </div>
  );
}
