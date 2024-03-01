import axios from 'axios'
import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Layout from './shared/Layout'
import Home from './pages/Home'

function App() {

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('http://127.0.0.1:8000/api/')

      console.log(response)
    }
    
    fetchData()
  }, [])
  

  return (
      <Layout>
        <Home />
      </Layout>
  )
}

export default App
