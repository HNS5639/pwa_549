import { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import './App.css'
import { BrowserRouter } from 'react-router'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <Navbar />
    <h1>app</h1>
    </BrowserRouter>

  )
}

export default App
