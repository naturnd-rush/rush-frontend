import { styled } from "@linaria/react"
import bearImage from '@/assets/GrizzlyBear.png'
import speechBubble from '@/assets/SpeechBubble.svg'

const BearWrapper = styled.div`
  position: relative;
`

const _Bear = styled.div`
  position: absolute;
  bottom: -4rem;
  right: -4.5rem;
  height: 26rem;
  width: 23.5rem;
  overflow: hidden;
  background: url(${bearImage});
  background-size: 20rem 20rem;
  background-position: bottom 0 right 0;
  background-repeat: no-repeat;
`

const SpeechBubble = styled.div`
  position: absolute;
  bottom: 14rem;
  right: 3rem;
  background: url(${speechBubble});
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  color: rgb(26, 32, 44);
  margin: 0 auto;
  text-align: center;
  line-height: 1.125rem;
  width: 11rem;
  height: 12rem;
  padding: 1.4rem 1.125rem 4.75rem;
  font-family: 'Urbanist Variable', sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  //transform: scale(-1, 1);
`

const Speech = styled.div`
  //transform: scale(-1, 1);
`

export default function Bear({children}: {children: any}) {
  return (
    <BearWrapper>
      { children }
      <_Bear>
        <SpeechBubble>
          <Speech>
            Choose a question. Consider the data. Find the people and solutions that werk for you.
          </Speech>
        </SpeechBubble>
      </_Bear>
    </BearWrapper>
  )
}