import { Button, Clipboard, CloseButton, Dialog, IconButton, Input, InputGroup, Portal } from "@chakra-ui/react";
import type { Map } from "leaflet";
import { useState } from "react";
import { FiShare } from 'react-icons/fi'
import { useMap } from "react-leaflet/hooks";
import { useActiveLayers } from "../providers/ActiveLayerProvider";
import { useMediaQuery } from "styled-breakpoints/use-media-query";
import { useTheme } from "@/theme";

export default function ShareModalButton() {
  const [ url, setUrl ] = useState(location.href)
  const map = useMap()
  const layers = useActiveLayers()
  
  const { down } = useTheme().breakpoints
  const isMobileOrTablet = useMediaQuery(down('lg'))

  return (
    <Dialog.Root placement='center'>
      <Dialog.Trigger asChild>
        <Button
          colorPalette='teal'
          borderRadius='lg'
          textStyle='md'
          fontFamily='body'
          onClick={() => { if (map) setUrl(getShareUrl(map, layers)) }}
          style={{ pointerEvents: 'all' }}
        >
          <FiShare />{ isMobileOrTablet ? null : ' Share'}
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content color='fg'>
            <Dialog.Header>
              <Dialog.Title color='teal'>Share this map</Dialog.Title>
            </Dialog.Header>
            <Clipboard.Root value={url}>
              <Dialog.Body>
                <Clipboard.Label textStyle="label">
                  Use this link to share the current map view
                </Clipboard.Label>
                <InputGroup marginTop='4px' endElement={<ClipboardIconButton />}>
                  <Clipboard.Input asChild>
                    <Input />
                  </Clipboard.Input>
                </InputGroup>
              </Dialog.Body>
              <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                  <Button variant='outline'>Cancel</Button>
                </Dialog.ActionTrigger>
                <Clipboard.Trigger asChild>
                  <Button colorPalette='teal'>
                    <Clipboard.Indicator />
                    Copy Link
                  </Button>
                </Clipboard.Trigger>
              </Dialog.Footer>
            </Clipboard.Root>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}

const ClipboardIconButton = () => (
  <Clipboard.Trigger asChild>
    <IconButton variant="surface" size="xs" me="-2">
      <Clipboard.Indicator />
    </IconButton>
  </Clipboard.Trigger>
)

  // Function to get map state for URL sharing mode
  const getShareUrl = (map: Map, layers?: string[]) => {
    const zoom = map.getZoom().toString();
    const center = map.getCenter();
    const lat = center.lat.toFixed(6);
    const lng = center.lng.toFixed(6);
    const mapParams = new URLSearchParams({
      zoom: zoom,
      lat: lat,
      lng: lng,
      ...layers !== undefined && { activeLayers: JSON.stringify(layers) }
    })
    const shareURL = new URL(window.location.href)
    shareURL.search = mapParams.toString()
    return shareURL.toString()
  }