import { Box, Button, Paper, TextField, Typography, styled } from '@mui/material'
import React, { useState } from 'react'
import axios from 'axios'
import { showAlert } from '../utils/alert'
import { Link, useNavigate } from 'react-router-dom'


const StyledBox = styled(Box)({
    height: '90vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
})

const PaperStyle = styled(Paper)({
    height: '310px',
    width: '400px',
    p: '20px',
    borderRadius: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
})

function UserLogin() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const login = async () => {
        try {
            const res = await axios({
                method: 'POST',
                url: '/api/v1/users/login',
                data: {
                    email,
                    password
                }
            })

            if (res.data.status === 'success') {
                localStorage.setItem('userData', JSON.stringify(res.data.data))
                showAlert('You are logged in', 'success')
                navigate('/')
            }
        } catch (err) {
            showAlert(err.response.data.message, 'error')
        }
    }


    return (
        <StyledBox>
            <PaperStyle elevation={16} >
                <Typography variant='h5' sx={{ marginTop: '20px', marginRight: '20px', fontWeight: '500' }}>LOGIN</Typography>
                <TextField
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    id="user-email"
                    label="Email" variant="filled"
                    sx={{ marginTop: '30px', width: '70%' }} />

                <TextField
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    id="user-password"
                    label="Password" type='password'
                    sx={{ marginTop: '20px', width: '70%' }} />

                <Typography component={'div'} display={'flex'} margin={0} height={40} marginTop={'5px'}>
                    <Typography sx={{ fontSize: '15px', margin: '0' }}>Don't Have an Account?</Typography>
                    <Button variant='text' sx={{p:'0', height:'20px'}}>
                        <Link to={'/signup'} className='signup-link-login'>Signup</Link>
                    </Button>
                </Typography>

                <Button onClick={() => login()} variant='contained'>
                    LOGIN
                </Button>
            </PaperStyle>
        </StyledBox>
    )
}

export default UserLogin