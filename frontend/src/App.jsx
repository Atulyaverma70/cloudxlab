import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import WelcomePage from './pages/WelcomePage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  return (
    <div className="h-screen">
      <Routes>
        <Route path="/" element={<WelcomePage/>}/>
        <Route path="/accounts/signup" element={<Signup/>}/>
        <Route path="/accounts/login" element={<Login/>}/>
        <Route path='*' element={<NotFoundPage/>} />
      </Routes>
    </div>
  )
}

export default App
