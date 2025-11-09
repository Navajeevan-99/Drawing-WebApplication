import React,{useEffect} from 'react'

const Test = () => {
  useEffect(()=>{
    fetch('http://localhost:3003/api/user').then(res=> res.json()).then(json=> console.log(json))
  },[])
  return (
    <div>

    </div>
  )
}

export default Test