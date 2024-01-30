import WelcomePage from "./components/welcomePage/WelcomePage"
import './App.css'
import { Route, Routes, useNavigate } from 'react-router-dom'
import HomePage from "./components/homePage/HomePage"
import Detail from "./components/detail/detail"
import axios from "axios"
import { useState } from "react"
import ActivityHub from "./components/activityHub/ActivityHub"
import NotFoundPage from "./components/notPageFound/notPageFound"

function App() {

  const navigate = useNavigate()
  const [post, setPost] = useState({
    status: false,
    content: "",
    error: ""
  })

  const postActivity = async (dataForm) => {
    try {
      const { name, season, duration, dificult, countryId, countryId2, countryId3 } = dataForm
      await axios.post("http://localhost:3001/activity", { name: name.trim(), season, duration, dificult, countryId, countryId2, countryId3 });
      setPost({ status: true, content: "aprove" })
    } catch (error) {
      setPost({ status: true, content: "error", error: error.message })
    }
  }

  const updateActivity = async (editTable) => {
    try {
      const res = await axios.put(`http://localhost:3001/activity/${editTable.id}`, {
        name: editTable.name,
        season: editTable.season,
        duration: editTable.duration,
        dificult: editTable.dificult
      })
      setPost({ status: true, content: "edit" })
    } catch (error) {
      setPost({ status: true, content: "error", error: error.message })
    }
  }
  const [backgroundImage, setBack] = useState(null);
  const handleBackChange = (backURL) => {
    setBack(`url(${backURL})`);
  };

  return (
    <div style={{ backgroundImage }} className="app">
      {post.status ?
        <div className="content-postResponse">
          {post.content === "error" ?
            <div className="post-response">
              <p>Ha ocurrido un error</p>
              <p>{post.error}</p>
              <button onClick={() => { setPost({ status: false }) }}>Ok</button>
            </div>
            : ""}
          {post.content === "aprove" ?
            <div className="post-response">
              <p>Actividad Añadida Exitosamente</p>
              <button onClick={() => { navigate("/home"); setPost({ status: false }) }}>Ok</button>
            </div>
            : ""}
          {post.content === "edit" ?
            <div className="post-response">
              <p>Actividad Actualizada Exitosamente</p>
              <button onClick={() => { navigate("/home"); setPost({ status: false }) }}>Ok</button>
            </div>
            : ""}
        </div>
        : ""}
      <Routes>
        <Route path='/' element={<WelcomePage navigate={navigate} handleBackChange={handleBackChange} />} />
        <Route path='/home' element={<HomePage navigate={navigate} handleBackChange={handleBackChange} />} />
        <Route path='/country/:id' element={<Detail navigate={navigate} postActivity={postActivity} handleBackChange={handleBackChange} />} />
        <Route path="/activity-hub" element={<ActivityHub navigate={navigate} postActivity={postActivity} handleBackChange={handleBackChange} updateActivity={updateActivity} />} />
        <Route path='*' element={<NotFoundPage navigate={navigate} />} />
      </Routes>
    </div>
  )
}

export default App