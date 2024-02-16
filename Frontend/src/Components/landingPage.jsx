import { Box, Button, Paper, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function LandingPage() {
    const [user, setUser] = useState(null)
  const [toggle, setToggle] = useState(false)
  
  useEffect(() => {
    if(user) setToggle(true)
    console.log(toggle)
}, [user])

useEffect(() => {
    const data = localStorage.getItem('userData')
    setUser(() => {
      if(data) return data
    })

  }, [])

    return (
        <Box
            sx={{ width: '100%', height: '90vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Paper
                elevation={16}
                sx={{ width: '40%', height: '60%', bgcolor: 'white', borderRadius: '20px' }}>
                <Typography
                    variant='h6'
                    sx={{ marginTop: '30px', textAlign:'center' }}>
                    INSTRUCTIONS
                </Typography>

                
                <Typography
                    sx={{ marginTop: '20px', textAlign:'center'}}>
                        1. This is a TEST for DRIVERS LICENSE
                </Typography>

                <Typography
                    sx={{ marginTop: '20px', textAlign:'center'}}>
                        1. There are 10 Questions in Total
                </Typography>

                <Typography
                    sx={{ marginTop: '20px', textAlign:'center'}}>
                        2. All the Questions are compulsory
                </Typography>

                <Typography
                    sx={{ marginTop: '20px', textAlign:'center', width:'70%', marginLeft:'16%'}}>
                        2. Login to start the test or if you don't have an account, please Sign up
                </Typography>

                <Typography component={'div'}
                sx={{ marginTop: '20px', textAlign:'center'}}>
                    {toggle ?
                    <Button variant='contained' sx={{marginRight:'10px'}}>
                    <Link to={'/test'} className='signup-link'>START TEST</Link>
                    </Button>
                    :
                     <>
                    <Button variant='contained' sx={{marginRight:'10px'}}>
                        <Link to={'/login'} className='signup-link'>LOGIN</Link>
                    </Button>
                    <Button variant='contained'>
                        <Link to={'/signup'} className='signup-link'>SIGNUP</Link>
                    </Button>
                    </>
                    }
                </Typography>
            </Paper>
        </Box>
    )
}

export default LandingPage