import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'
document.title='Password Generator'
export default function App() { 
  let [length,setLength]=useState(5)  
  let [num,setNum]=useState(false) 
  let [char,setChar]=useState(false)
  let [pass,setPass]=useState("")
  let passWordGen=useRef(null) 
  let passGen=useCallback(()=>{ 
    let password='' 
    let string="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz" 
    if(num) string+="0123456789" 
    if(char) string+="!@#$%^&*-_+=[]{}~`"
    for(let i=0;i<length;i++){ 
      let gen =Math.floor(Math.random()* string.length+1) 
      password+=string.charAt(gen)  
    }
    setPass(password) 
  },[length,num,char])
  let copyText=useCallback(()=>{
    passWordGen.current?.select()
    passWordGen.current?.setSelectionRange(0,10) 
    window.navigator.clipboard.writeText(pass)
  },[pass])
  useEffect(()=>{passGen()},[length,char,num,setPass,passGen]) 
  return (
    <>
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-yellow-500'>

      <h1 className='text-3xl text-center text-white'>Password-Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input 
        type='text'
        value={pass}
        className='outline-none w-full py-1 px-3'
        placeholder='password' 
        readOnly
        ref={passWordGen}
        />
        <button onClick={copyText} className='outline-none bg-green-500 text-white px-3 py-0.5 shrink-0'>Copy</button>
      </div>
    
    <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
        <input
        type='range'
        min={5}
        max={100}
        className='cursor-pointer'
        onChange={(e)=>{setLength(e.target.value)}}
        />
        <label>Length:{length}</label>
      </div>
      <div className='flex items-center gap-x-1'>
         <input 
         type='checkbox'
         defaultChecked={num}
         id='numberInput'
         onChange={()=>{
          setNum((prev)=>!prev)
         }}
         />
        <label htmlFor='numberInput'>Number</label>
      </div>
      <div className='flex items-center gap-x-1'>
        <input 
         type='checkbox'
         defaultChecked={char}
         id='characterInput'
         onChange={()=>{
          setChar((prev)=>!prev)
         }}
         />
        <label htmlFor='characterInput'>Character</label>
      </div>
    </div>
 </div>
    </>
  )
}
