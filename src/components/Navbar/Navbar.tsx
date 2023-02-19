import { Box } from '@mui/material'
import React from 'react'

const Navbar = () => {
  return (
    <Box sx={{height:'100px', width: '100vw', background: '#fff', color: '#000', display:'block', position:'fixed', border:'1px solid #000', zIndex:'2'}}>
        <p>Navbar here</p>
    </Box>
  )
}

export default Navbar