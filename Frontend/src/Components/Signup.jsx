import React,  {useState} from 'react'
import { Box, Button, Paper, TextField, Typography, styled } from '@mui/material'
import { showAlert } from '../utils/alert'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'



const StyledBox = styled(Box)({
    height:'90vh',
    display:'flex',
    justifyContent:'center',
    alignItems:'center'
})

const PaperStyle = styled(Paper)({
    height:'500px',
    width:'400px',
    p:'20px', 
    borderRadius:'20px',
    display:'flex',
    flexDirection: 'column',
    alignItems:'center',
})

function Signup() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setconfirmPassword] = useState('')
    const navigate = useNavigate()

    const signup = async() => {
        try{
            const res = await axios({
                method: 'POST',
                url: '/api/v1/users/signup',
                data: {
                    name,
                    email, 
                    password,
                    confirmPassword
                }
            })

            if(res.data.status === 'success'){
                localStorage.setItem('userData', JSON.stringify(res.data.data))
                showAlert('Signed in', 'success')
                navigate('/')
            }
        }catch(err){
            showAlert(err.response.data.message, 'error')
        }
    }
  return (
<StyledBox>
        <PaperStyle elevation={16} >
            <Typography variant='h5' sx={{marginTop:'20px', marginRight:'20px', fontWeight:'500'}}>SIGNUP</Typography>
        <TextField
        value={name}
        onChange={(e) => setName(e.target.value)} 
        id="sign-name" 
        label="Name" 
        variant="filled" 
        sx={{marginTop:'30px', width:'70%'}}/>

        <TextField
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        id="sign-email" 
        label="Email" 
        variant="filled" 
        sx={{marginTop:'30px', width:'70%'}}/>

        <TextField
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        id="sign-pass" 
        variant="filled" 
        label="Password" 
        type='password' 
        sx={{marginTop:'20px', width:'70%'}}/>
        
        <TextField
        value={confirmPassword} 
        onChange={(e) => setconfirmPassword(e.target.value)} 
        id="sign-confirmPass" 
        variant="filled" 
        label="Confirm Password" 
        type='password' 
        sx={{marginTop:'20px', width:'70%'}}/>
        <Button
         onClick={() => signup()}
         variant='contained' 
         sx={{marginTop:'40px'}}>
            SIGNUP
        </Button>
        </PaperStyle>
    </StyledBox>  )
}

export default Signup