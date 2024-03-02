import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Login from "./login/Login"
import Home from "./home/Home"

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App