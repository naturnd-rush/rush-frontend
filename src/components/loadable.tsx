import type { PropsWithChildren } from "react";
import Spinner from "./spinner";
import { styled } from "@linaria/react";

const LoadingContainer = styled.div`
  align-self: center;
  margin: 1rem;
`

export default function Loadable({children, loading}: PropsWithChildren<{loading: boolean}>) {
  return loading
    ? (
      <LoadingContainer>
        <Spinner size='2rem' />
      </LoadingContainer>
    )
    : children
}