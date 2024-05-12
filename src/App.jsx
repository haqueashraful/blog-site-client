import { useState } from 'react'
import './App.css'
import RecentBlog from './Component/RecentBlog'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>

        <RecentBlog />
    </>
  )
}

export default App
