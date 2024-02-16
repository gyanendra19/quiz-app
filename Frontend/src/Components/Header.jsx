import { AppBar, Avatar, Box, IconButton, Toolbar, Typography } from '@mui/material'
import {Menu} from '@mui/icons-material'
import React, { useEffect, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'

function Header() {
  const navigate = useNavigate()
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

  })

  
  return (
    <Box sx={{flexGrow: 1}}>
        <AppBar position='static' color='primary'>
            <Toolbar sx={{display:'flex', justifyContent:'space-between'}}>
            <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Menu />
          </IconButton>
          {toggle ? <>
           <Typography variant='div' sx={{display:'flex', cursor:'pointer', alignItems:'center', gap:'15px'}}>
          <Avatar alt="Remy Sharp" src="../images/default.jpg" />
          <Link to={'/'} onClick={() => {
            localStorage.removeItem('userData')
            setToggle(false)
          }} className='signup-link'>
              LOGOUT
            </Link>
          </Typography>
          </>
           :
          <Typography variant='div' sx={{display:'flex', cursor:'pointer'}}>
          <Typography variant='h6' sx={{marginRight:'15px'}}>
            <Link to={'/login'} className='login-link'>
              LOGIN
            </Link>
          </Typography>
          <Typography variant='h6'>
          <Link to={'/signup'} className='signup-link'>
              SIGNUP
            </Link>
          </Typography>
    </Typography>
          }          
            </Toolbar>
        </AppBar>
    </Box>
  )
}

export default Header