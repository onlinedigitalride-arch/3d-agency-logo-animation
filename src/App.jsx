import React, { Suspense } from 'react'
import LogoScene from './components/3d/LogoScene'
import { motion } from 'framer-motion'

export default function App() {
  return (
    <div style={{ width:'100vw', height:'100vh', position:'relative', background:'#F5F3FF' }}>
      <Suspense fallback={<div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',background:'#F5F3FF'}}><div style={{width:48,height:48,border:'3px solid #6C63FF',borderTopColor:'transparent',borderRadius:'50%',animation:'spin 1s linear infinite'}}/></div>}>
        <LogoScene />
      </Suspense>
      <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:3}}
        style={{position:'absolute',bottom:40,left:0,right:0,textAlign:'center',pointerEvents:'none'}}>
        <p style={{fontFamily:'Bebas Neue',fontSize:'11px',letterSpacing:'8px',color:'rgba(108,99,255,0.5)'}}>CREATIVE · TECHNOLOGY · INNOVATION</p>
      </motion.div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )
}
