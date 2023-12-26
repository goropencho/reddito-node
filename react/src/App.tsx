import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  let [url, setUrl] = useState("");
  let [videoUrl, setVideoUrl] = useState("")
  let [error, setError] = useState("")


  function onChangeUrl(url) {
    setUrl(url);
  }

  const onSubmitUrl = async () => {

    try {
      const response = await fetch(`http://localhost:3000/api/video?url=${url}`)
      const data = await response.json()
      console.log(data.videoUrl);
      setVideoUrl(data.videoUrl)
      setError("")
    } catch (error) {
      setError('error fetching Url');
      setVideoUrl('')
    }
  }

  return (
    <div>
      <label>
        Enter Reddit Url:
        <input type='text' value={url} onChange={(event) => onChangeUrl(event.target.value)} />
      </label>
      <button onClick={onSubmitUrl} >Submit</button>

      {error && <p>{error}</p>}

      {videoUrl && (
        <div>
          <p>Video Preview:</p>
          <iframe title="Video Player" width="560" height="315" src={videoUrl} frameBorder="0" allowFullScreen></iframe>
        </div>)}
    </div>
  )
}

export default App
