import type { SyntheticEvent } from "react";

export function fallbackImage(fallbackSrc: string) {
  return (ev: SyntheticEvent<HTMLImageElement, Event>) => {
    ev.currentTarget.src = fallbackSrc
  }
}