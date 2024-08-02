import React from 'react'
import Headers from '../components/Headers'
import { Box } from '@mui/material'
import SimpleSlider from '../components/Carousel'

const Hero = () => {
  return (
    <Box sx={{display:"flex", flexDirection:"column"}}>
      <Headers/>
      <Box>
        <SimpleSlider/>
      </Box>
    </Box>
  )
}

export default Hero
