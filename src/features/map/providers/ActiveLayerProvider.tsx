import { createContext, useContext, useState, type PropsWithChildren } from 'react'
import { createStore, useStore, type StoreApi } from 'zustand'

type ActiveLayerState = {
  layers: string[],
  actions: {
    addLayer: (layerId: string) => void,
    removeLayer: (layerId: string) => void,
  }
}

type ActiveLayerProviderProps = {
  initialActiveLayers: string[]
}

const ActiveLayerContext = createContext<StoreApi<ActiveLayerState> | null>(null)

export const ActiveLayerProvider = (
  { children, initialActiveLayers }: PropsWithChildren<ActiveLayerProviderProps>
) => {
  const [store] = useState(() =>
    createStore<ActiveLayerState>((set) => ({
      layers: initialActiveLayers,
      actions: {
        addLayer: (id) => 
          set((state) => ({ layers: [...state.layers.filter((i) => i != id), id] })),
        removeLayer: (id) =>
          set((state) => ({ layers: state.layers.filter((layer) => layer !== id) }))
      },
    }))
  )

  return (
    <ActiveLayerContext.Provider value={store}>
      {children}
    </ActiveLayerContext.Provider>
  )
}

const useActiveLayerStore = (
  selector: (state: ActiveLayerState) => 
    Partial<ActiveLayerState> | ActiveLayerState[keyof ActiveLayerState]
) => {
  const store = useContext(ActiveLayerContext)
  if (!store) {
    throw new Error('Missing ActiveLayerProvider')
  }
  return useStore(store, selector)
}

export const useActiveLayerActions = () => useActiveLayerStore((s) => s.actions) as ActiveLayerState['actions']
export const useActiveLayers = () => useActiveLayerStore((s) => s.layers) as ActiveLayerState['layers']