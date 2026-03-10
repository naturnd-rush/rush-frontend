import { useEffect, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import {
  Button,
  Center,
  Flex,
  Field,
  Input,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form'
import { produce } from 'immer'
import { set, ref } from 'firebase/database'
import { useFirebase } from '@/lib/FirebaseProvider'
import  { LeaderboardComponent, type LeaderboardContent } from '@/features/custom/components/leaderboard'

export const Route = createFileRoute('/lbadmin')({
  component: LbAdmin,
})

const lbContent = {
  topRainmaker: {
    name: 'Test',
    score: '0',
  },
  topClass: {
    name: 'Test',
    score: '0',
  },
  topSchool: {
    name: 'Test',
    score: '0',
  },
  adminPassword: '',
}

const isNameInvalid = (name: string) => {
  return (name.length > 20 || name.length <= 0)
}

const isScoreInvalid = (score: string) => {
  return (score.length > 4 || score.length <= 0 || isNaN(Number(score)))
}

const validateForm = (content: LeaderboardContent) => {
  return content.topRainmaker.name.length < 20 &&
    content.topClass.name.length < 20 &&
    content.topSchool.name.length < 20 &&
    !isScoreInvalid(content.topRainmaker.score) &&
    !isScoreInvalid(content.topClass.score) &&
    !isScoreInvalid(content.topSchool.score)
}

export default function LbAdmin() {
  const { database } = useFirebase()
  if ( database === undefined ) return;

  const [content, setContent] = useState(lbContent)
  const [isValid, setIsValid] = useState(false)
  const [message, setMessage] = useState('')
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)
  
  useEffect(() => {
    setIsValid(validateForm(content))
  }, [content, setIsValid])

  const submitForm = () => {
    set(ref(database, 'leaderboard/'), content)
    .then(() => setMessage('Upload successful.'))
    .catch((error) => {
      setMessage(error.message)
    })
  }

  // react-hook-form
  interface FormValues {
    topRainmaker: string,
    topRainmakerScore: string,
    topClass: string,
    topClassScore: string,
    topSchool: string,
    topSchoolScore: string,
    adminPassword: string,
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>()

  const onSubmit = handleSubmit(submitForm)

  return (
    <Center height='100svh'>
      <form onSubmit={onSubmit}>
        <Flex direction='column' gap='1rem'>
          <LeaderboardComponent content={{ total: { name: 'Total', score: '0' }, ...content}}/>
          <SimpleGrid columns={2} gap='1rem'>
            <Field.Root invalid={!!errors.topRainmaker}>
              <Field.Label>Top Rainmaker</Field.Label>
              <Input
                placeholder='Top Rainmaker name...'
                {...register("topRainmaker", {
                  required: true,
                  validate: isNameInvalid,
                  onChange: (e) => setContent(produce(content, (draftState) => {
                    draftState.topRainmaker.name = e.target.value
                  }))
                })}
              />
            </Field.Root>
            <Field.Root invalid={!!errors.topRainmakerScore}>
              <Field.Label>Score</Field.Label>
              <Input
                placeholder='score...'
                htmlSize={4}
                width='auto'
                {...register("topRainmakerScore", {
                  required: true,
                  validate: isScoreInvalid,
                  onChange: (e) => setContent(produce(content, (draftState) => {
                    draftState.topRainmaker.score = e.target.value
                  }))
                })}
              />
            </Field.Root>
            
            <Field.Root invalid={!!errors.topClass}>
              <Field.Label>Top Class</Field.Label>
              <Input
                placeholder='Top class name...'
                {...register("topClass", {
                  required: true,
                  validate: isNameInvalid,
                  onChange: (e) => setContent(produce(content, (draftState) => {
                    draftState.topClass.name = e.target.value
                  }))
                })}
              />
            </Field.Root>
            <Field.Root invalid={!!errors.topClassScore}>
              <Field.Label>Score</Field.Label>
              <Input
                placeholder='score...'
                htmlSize={4}
                width='auto'
                {...register("topClassScore", {
                  required: true,
                  validate: isScoreInvalid,
                  onChange: (e) => setContent(produce(content, (draftState) => {
                    draftState.topClass.score = e.target.value
                  }))
                })}
              />
            </Field.Root>
            
            <Field.Root invalid={!!errors.topSchool}>
              <Field.Label>Top School</Field.Label>
              <Input
                placeholder='Top school name...'
                {...register("topSchool", {
                  required: true,
                  validate: isNameInvalid,
                  onChange: (e) => setContent(produce(content, (draftState) => {
                    draftState.topSchool.name = e.target.value
                  }))
                })}
              />
            </Field.Root>
            <Field.Root invalid={!!errors.topSchoolScore}>
              <Field.Label>Score</Field.Label>
              <Input
                placeholder='score...'
                htmlSize={4}
                width='auto'
                {...register("topSchoolScore", {
                  required: true,
                  validate: isScoreInvalid,
                  onChange: (e) => setContent(produce(content, (draftState) => {
                    draftState.topSchool.score = e.target.value
                  }))
                })}
              />
            </Field.Root>
          </SimpleGrid>

          <Field.Root invalid={!!errors.adminPassword}>
            <Field.Label>Admin Password</Field.Label>
              <Input
                pr='4.5rem'
                type={show ? 'text' : 'password'}
                placeholder='Enter password'
                onChange={(e) => setContent(produce(content, (draftState) => {
                  draftState.adminPassword = e.target.value
                }))}
              />
              <Button h='1.75rem' size='sm' onClick={handleClick}>
                {show ? 'Hide' : 'Show'}
              </Button>
          </Field.Root>
          <Button
            onClick={submitForm}
            colorScheme='green'
            disabled={!isValid}
          >
            Submit
          </Button>
          <Text>{message}</Text>
        </Flex>
      </form>
    </Center>
  )
}