import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import {
  Button,
  Center,
  Flex,
  Field,
  Input,
  SimpleGrid,
  Text,
  HStack,
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

const isNameValid = (name: string) => {
  return !(name.length > 20 || name.length <= 0)
}

const isScoreValid = (score: string) => {
  return !(score.length > 4 || score.length <= 0 || isNaN(Number(score)))
}

export default function LbAdmin() {
  const { database } = useFirebase()
  if ( database === undefined ) return;

  const [content, setContent] = useState(lbContent)
  const [message, setMessage] = useState('')
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)

  
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
  
  const submitForm = (data: FormValues) => {
    const DbValues: Omit<LeaderboardContent, "total"> & { password: string }= {
      topRainmaker: {
        name: data.topRainmaker,
        score: data.topRainmakerScore,
      },
      topClass: {
        name: data.topClass,
        score: data.topClassScore,
      },
      topSchool: {
        name: data.topSchool,
        score: data.topSchoolScore,
      },
      password: data.adminPassword,
    }
    set(ref(database, 'leaderboard/'), DbValues)
    .then(() => setMessage('Upload successful.'))
    .catch((error) => {
      setMessage(error.message)
    })
  }
  
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
                  validate: isNameValid,
                  onChange: (e) => setContent(produce(content, (draftState) => {
                    draftState.topRainmaker.name = e.target.value
                  }))
                })}
              />
              {errors.topRainmaker && (
                <p role="alert">Names must be 1-20 characters.</p>
              )}
            </Field.Root>
            <Field.Root invalid={!!errors.topRainmakerScore}>
              <Field.Label>Score</Field.Label>
              <Input
                placeholder='score...'
                htmlSize={4}
                width='auto'
                {...register("topRainmakerScore", {
                  required: true,
                  validate: isScoreValid,
                  onChange: (e) => setContent(produce(content, (draftState) => {
                    draftState.topRainmaker.score = e.target.value
                  }))
                })}
              />
              {errors.topRainmakerScore && (
                <p role="alert">Scores must be a whole number with 1-4 digits.</p>
              )}
            </Field.Root>
            
            <Field.Root invalid={!!errors.topClass}>
              <Field.Label>Top Class</Field.Label>
              <Input
                placeholder='Top class name...'
                {...register("topClass", {
                  required: true,
                  validate: isNameValid,
                  onChange: (e) => setContent(produce(content, (draftState) => {
                    draftState.topClass.name = e.target.value
                  }))
                })}
              />
              {errors.topClass && (
                <p role="alert">Names must be 1-20 characters.</p>
              )}
            </Field.Root>
            <Field.Root invalid={!!errors.topClassScore}>
              <Field.Label>Score</Field.Label>
              <Input
                placeholder='score...'
                htmlSize={4}
                width='auto'
                {...register("topClassScore", {
                  required: true,
                  validate: isScoreValid,
                  onChange: (e) => setContent(produce(content, (draftState) => {
                    draftState.topClass.score = e.target.value
                  }))
                })}
              />
              {errors.topClassScore && (
                <p role="alert">Scores must be a whole number with 1-4 digits.</p>
              )}
            </Field.Root>
            
            <Field.Root invalid={!!errors.topSchool}>
              <Field.Label>Top School</Field.Label>
              <Input
                placeholder='Top school name...'
                {...register("topSchool", {
                  required: true,
                  validate: isNameValid,
                  onChange: (e) => setContent(produce(content, (draftState) => {
                    draftState.topSchool.name = e.target.value
                  }))
                })}
              />
              {errors.topSchool && (
                <p role="alert">Names must be 1-20 characters.</p>
              )}
            </Field.Root>
            <Field.Root invalid={!!errors.topSchoolScore}>
              <Field.Label>Score</Field.Label>
              <Input
                placeholder='score...'
                htmlSize={4}
                width='auto'
                {...register("topSchoolScore", {
                  required: true,
                  validate: isScoreValid,
                  onChange: (e) => setContent(produce(content, (draftState) => {
                    draftState.topSchool.score = e.target.value
                  }))
                })}
              />
              {errors.topSchoolScore && (
                <p role="alert">Scores must be a whole number with 1-4 digits.</p>
              )}
            </Field.Root>
          </SimpleGrid>

          <Field.Root invalid={!!errors.adminPassword}>
            <Field.Label>Admin Password</Field.Label>
              <HStack>
                <Input
                  pr='4.5rem'
                  type={show ? 'text' : 'password'}
                  placeholder='Enter password'
                  {...register("adminPassword", {
                    required: true,
                    onChange: (e) => setContent(produce(content, (draftState) => {
                      draftState.adminPassword = e.target.value
                    }))
                  })}
                />
                <Button h='1.75rem' size='sm' onClick={handleClick}>
                  {show ? 'Hide' : 'Show'}
                </Button>
              </HStack>
              {errors.adminPassword && (
                <p role="alert">Admin password is required.</p>
              )}
          </Field.Root>
          <Button type="submit" colorPalette='green'>Submit</Button>
          <Text color='fg.error'>{message}</Text>
        </Flex>
      </form>
    </Center>
  )
}