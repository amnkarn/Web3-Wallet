import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
//import CreatePharse from './CreatePhrase'
import Home from './Home'


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        {/*<Route path='/phrase' element={<CreatePharse />} />*/}
      </Routes>
    </BrowserRouter>
  )
}