import { useState } from 'react'
import reactLogo from './asset/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/common/Header'
import Footer from './components/common/Footer'
import Signin from './components/common/Signin'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
          <Signin></Signin>

      <Header></Header>
      <Footer></Footer>
    </>
  )
}

export default App
