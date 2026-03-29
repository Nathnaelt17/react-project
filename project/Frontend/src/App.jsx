import { Routes, Route } from "react-router-dom"
import Login from "./Login.jsx"
import Signup from "./Signup.jsx"
import LandingPage from "./Landing-page.jsx" 

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/landing-page" element={<LandingPage/>}/>
    </Routes>
  )
}

export default App
