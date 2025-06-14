
import { Outlet } from 'react-router'
import './App.css'
import ResponsiveAppBar from "./pages/navbar"


function App() {


  return (
    <>
    <ResponsiveAppBar/>
      <div>
        <h1>hii from app</h1>
     <Outlet/>
      </div>
     
      
    
    </>
  )
}

export default App
