import { Box, Button, Paper, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'

function Userpage() {
    const [user, setUser] = useState({})

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('userData'))
        setUser(data)
      }, [])

      console.log(user)
  return (
    <Box component='form' sx={{width:'100%', height:'90vh'}} display={'flex'} justifyContent={'center'} alignItems={'center'}>
        <Paper elevation={16} sx={{width:'55%', height:'90%', borderRadius:'20px', bgcolor:'white'}}>
        <Typography 
        variant='h5' 
        sx={{marginTop:'30px', textAlign:'center', marginBottom:'0px'}}>
            HITESH SHARMA
        </Typography>

        <Typography display={'flex'} gap={8} justifyContent={'center'}>
        <TextField 
        onChange={(e) => setEmail(e.target.value)}
        value={user.name} 
        id="user-email" 
        label="Name" 
        defaultValue={user?.name}
        variant="filled" 
        sx={{marginTop:'40px', width:'250px'}}
        />


        <TextField 
        onChange={(e) => setEmail(e.target.value)}
        value={user.email} 
        id="user-email" 
        label="Email" 
        defaultValue={user?.email}
        variant="filled" 
        sx={{marginTop:'40px', width:'250px'}}
        />
        </Typography>

        <Button variant='contained' sx={{marginTop:'40px', marginLeft:'46%'}} >SAVE</Button>
        </Paper>
    </Box>
  )
}

export default Userpage