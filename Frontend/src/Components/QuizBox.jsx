import styled from '@emotion/styled'
import { Box, Typography, Card, CardContent, Button, Modal, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { drivingTestQuestions } from '../assets/Data/data'

const StyledTypo = styled(Typography)({
  component: 'div',
  backgroundColor: 'white',
  width: '400px',
  maxheight: '420px',
  boxShadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.15)',
})

const StyledModal = styled(Modal)({
  display:'flex',
  justifyContent:'center',
  alignItems:'center',
})

function QuizBox() {
  const [open, setOpen] = useState(false)
  const [quesNum, setQuesNum] = useState(0)
  const [question, setQuestion] = useState(drivingTestQuestions[0])
  const [answer, setAnswer] = useState(null)
  const [render, setRender] = useState(0)
  const [option, setOption] = useState([])

  const changeOption = (newOption) => {
    setOption(prev => {
      return [...prev, newOption]
    })
  }

  useEffect(() => {
    setRender(prev => prev + 1)
  }, [answer])

  useEffect(() => {
    if (answer) {
      if (!Object.keys(question).some(el => option.includes(question[el]))) {
        changeOption(answer)
      }

      Object.keys(question).forEach(el => {
        if (option.includes(question[el]) && el !== 'correctAnswer' && el !== 'question') {
          const index = option.indexOf(question[el])
          if (index !== -1) {
            console.log(answer)
            option[index] = answer
          }
        }
      })
    }
  }, [answer])



  const changeQuestion = (quesNum) => {
    setQuestion(drivingTestQuestions[quesNum])
  }

  const changeAnswer = (val) => {
    setAnswer(val)
  }

  const nextQuestion = () => {
    if (quesNum < 10) {
      setQuesNum(prev => {
        changeQuestion(prev + 1)
        return prev + 1
      })
      console.log(quesNum)
      // changeQuestion()
    }
  }

  const previousQuestion = () => {
    if (quesNum >= 1) {
      setQuesNum(prev => {
        changeQuestion(prev - 1)
        return prev - 1
      })

    }
  }

  const hideAlert = () => {
    const el = document.querySelector('.alert')
    if(el) el.parentElement.removeChild(el)
}

const changeOpen = () => {
  hidePrevious()
  setOpen(true)
}

  const completeOption = () => {
    hideAlert()
    const markup = `<div class = "alert alert-error">Attempt all the questions</div>`
    document.querySelector('body').insertAdjacentHTML('afterbegin', markup)
    setTimeout(hideAlert, 5000);
  }

  const hidePrevious = () => {
    const prevBtn = document.getElementById('previous')
    prevBtn.style.display = 'none'
  }

  let count = 0;
  



  const buttonBox = (options) => {
    return <Button value={options} onClick={(e) => changeAnswer(e.target.value)} variant='contained' sx={{
      width: '90%', marginTop: '20px', justifyContent: 'flex-start', textAlign: 'left',
      backgroundColor: option.includes(options) ? 'orange' : '#1976d2', '&:hover': { backgroundColor: option.includes(options) ? 'orange' : '#1976d2' }
    }}>
      {options}
    </Button>
  }

  return (
    <Box component={'div'} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100vh' }}>
      <StyledTypo >
        <Card sx={{ height: '100%' }}>
          <CardContent>
            <Typography variant="body2" sx={{ fontSize: '1.2rem' }}>
              {question.question}
            </Typography>

            {buttonBox(question.option1)}
            {buttonBox(question.option2)}
            {buttonBox(question.option3)}
            {buttonBox(question.option4)}

            <Typography sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button id='previous' 
              onClick={() => previousQuestion()} 
              variant='contained' 
              sx={{ marginTop: '20px', marginRight: '30px' }}>
                PREVIOUS
              </Button>
              <Button onClick={() => nextQuestion()} 
              variant='contained' 
              sx={{ marginTop: '20px', marginRight: '30px', display: quesNum === 9 ? 'none' : 'block' }}>
                NEXT
              </Button>
              <Button onClick={option.length < 10 ? () => completeOption() :  () => changeOpen()} 
                variant='contained' 
                sx={{ marginTop: '20px', marginRight: '30px', display: quesNum === 9 ? 'block' : 'none' }}>
                SUBMIT
              </Button>
              <StyledModal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box width={400} height={500} bgcolor={'white'} p={3} borderRadius={2} sx={{overflowY:'scroll'}}>
                  <Typography variant='h6'>RESULT</Typography>
                  {option.map((el, i) => (
                    <TextField 
                     sx={{width:'100%', marginTop:'20px'}} 
                     variant="filled" 
                     color={el === drivingTestQuestions[i].correctAnswer ? 'success' : 'error'} 
                     InputProps={{
                      readOnly: true,
                    }}
                    label={`${i+1})`}
                     defaultValue={el} 
                     focused />
                  ))}
                  <Typography variant='h5' color={'secondary'} mt={2} ml={10}>
                    Your Score is: 
                    {option.forEach((el, i) => {                    
                      if(el === drivingTestQuestions[i].correctAnswer){
                        return count += 1
                      }             
                    })
                    }
                    {' '} {count}/10
                    </Typography>
                    <Typography variant='h6' color={'primary'} mt={1} ml={13}>
                        You {count >= 7 ? 'passed' : 'failed'} the test
                    </Typography>
                </Box>
              </StyledModal>
            </Typography>
          </CardContent>
        </Card>
      </StyledTypo>
    </Box>
  )
}

export default QuizBox