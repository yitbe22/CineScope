import { Routes, Route } from 'react-router-dom'
import Navbar from "./components/Navbar"
import Home from "./Pages/Home"
import Footer from './components/Footer'
import Search from './Pages/Search'
import Details from './Pages/Details'

const App = () => {
  return (
    <>
        <Navbar />
        <main className='min-h-screen'>
           <Routes>
               <Route path='/' element={<Home /> } />
               <Route path="/search" element={<Search />} />
               <Route path="/:type/:id" element={<Details />} />
           </Routes>
        </main>
        <Footer /> 
    
    </>
  )
}

export default App