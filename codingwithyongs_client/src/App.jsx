import axios from 'axios'
import { useEffect, useState } from 'react'

function App() {

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('http://127.0.0.1:8000/api/')

      console.log(response)
    }
    
    fetchData()
  }, [])
  

  return (
    <div className="bg-red-500">
      Yonela Johannes
    </div>
  )
}

export default App
