import { useState } from 'react'
import './App.css'
import RecentBlog from './Component/RecentBlog'
import Banner from './Component/Banner'
import NewsLetter from './Component/NewsLetter'
import Slider from './Component/Slider'

function App() {

  return (
    <>
      <Banner />
        <RecentBlog />
        <NewsLetter />
        <Slider />
    </>
  )
}

export default App
