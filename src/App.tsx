//@ts-nocheck
import './App.css'
import { useState } from 'react';
import CharacterCustomization from './components/CharPreview';
import { BrowserRouter, Routes ,Route } from 'react-router-dom';
import {Render} from "./components/Render"
function App() {


  return (
  <div className='h-[100vh] '>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<CharacterCustomization/>}></Route>
      <Route path="/world" element={<Render/>}></Route>
    </Routes>
    </BrowserRouter>
   
  </div>
  )
}

export default App;
