import { Button, Clipboard, CloseButton, Dialog, IconButton, Input, InputGroup, Portal } from "@chakra-ui/react";
import type { Map } from "leaflet";
import { useState } from "react";
import { FiShare } from 'react-icons/fi'
import { useMap } from "react-leaflet/hooks";

export default function ShareModalButton() {
  const [ url, setUrl ] = useState(location.href)
  const map = useMap()

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button
          colorPalette='teal'
          onClick={() => { if (map) setUrl(getShareUrl(map)) }}
        >
          <FiShare /> Share
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Dialog Title</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <ClipboardInput value={url} />
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.ActionTrigger>
              <Button>Save</Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}

const ClipboardInput = (props: { value: string }) => (
  <Clipboard.Root maxW="300px" value={props.value}>
    <Clipboard.Label textStyle="label">
      Use this link to share the current question and map view
    </Clipboard.Label>
    <InputGroup endElement={<ClipboardIconButton />}>
      <Clipboard.Input asChild>
        <Input />
      </Clipboard.Input>
    </InputGroup>
  </Clipboard.Root>
)

const ClipboardIconButton = () => (
  <Clipboard.Trigger asChild>
    <IconButton variant="surface" size="xs" me="-2">
      <Clipboard.Indicator />
    </IconButton>
  </Clipboard.Trigger>
)

  // Function to get map state for URL sharing mode
  const getShareUrl = (map: Map) => {
    const currHost = `${window.location.href}`;
    const zoom = map.getZoom().toString();
    const center = map.getCenter();
    const lat = center.lat.toFixed(6);
    const lng = center.lng.toFixed(6);
    return `${currHost}/${zoom}/${lat},${lng}`;
  }