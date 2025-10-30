import type { PropsWithChildren } from "react";

export default function Toggleable(props: PropsWithChildren<{on: boolean}>) {
  return props.on && props.children
}