export function expandBackendLink(link: string | undefined) {
  return link 
    ? [
        import.meta.env.VITE_BACKEND_BASE_URL,
        import.meta.env.VITE_MEDIA_PATH,
        link,
      ].join('/')
    : undefined
}