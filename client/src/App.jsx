import React from 'react'
import './App.css'
import GetImage from './Components/GetImage'
import { Route, Routes } from 'react-router-dom'
import Upload from './Components/Upload'

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Upload />} />
        <Route path='/getimages' element={<GetImage />} />
      </Routes>
    </>
  )
}

export default App