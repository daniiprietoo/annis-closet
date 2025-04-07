import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import Closet from './components/Closet'
import Bin from './components/Bin'
import Exchange from './components/Exchange'

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
          <Route path="/" element={<Closet />} />
          <Route path="/closet" element={<Closet />} />
          <Route
            path="/bin"
            element= {<Bin />}
          />
          <Route path="/exchange" element={<Exchange />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App