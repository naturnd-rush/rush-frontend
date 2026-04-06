import { useFirebase } from "@/lib/FirebaseProvider"
import { useLocation, useRouter } from "@tanstack/react-router"
import { logEvent, type Analytics } from "firebase/analytics"
import { useEffect, useRef } from "react"

type PageView = {
  page_path?: string,
  page_location?: string,
  page_title?: string,
  page_referrer?: string,
}

function logPageView(analytics: Analytics, page: PageView) {
  logEvent(analytics, 'page_view', page)
}

function toURLString(path: string | undefined) {
  if (path === undefined) return undefined

  try {
    const url = new URL(path, window.location.origin)
    return `${url.origin}${url.pathname}`
  } catch (error) {
    return undefined
  }
}
 
export default function AnalyticsPageView() {
  const location = useLocation()
  const router = useRouter()
  const { analytics } = useFirebase()

  const hasRun = useRef(false)

  useEffect(() => {
    if (!analytics || !router) return;

    // log initial page view only once
    if (!hasRun.current) logPageView(analytics, {
      page_path: location.pathname,
      page_location: toURLString(location.href),
      page_title: document.title,
      page_referrer: document.referrer || undefined,
    })
    hasRun.current = true

    const unsubscribe = router.subscribe('onResolved', (event) => {
      if (event.pathChanged) {
        logPageView(analytics, {
          page_path: event.toLocation.pathname,
          page_location: toURLString(event.toLocation.href),
          page_title: document.title,
          page_referrer: toURLString(event.fromLocation?.href),
        })
      }
    })

    return unsubscribe
  }, [analytics, router])

  return <></>
}