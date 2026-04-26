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
        addLayer: (id) => set((state) => ({ layers: [...state.layers, id] })),
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

export const useActiveLayerStore = (selector: (state: ActiveLayerState) => void) => {
  const store = useContext(ActiveLayerContext)
  if (!store) {
    throw new Error('Missing ActiveLayerProvider')
  }
  return useStore(store, selector)
}