import handler, { createServerEntry } from '@tanstack/react-start/server-entry'

export default createServerEntry({
  fetch(request, options) {
    const accept = request.headers.get('accept')
    // Start's HTML renderer recognises */*, but not the equivalent text/* range.
    if (accept && !/(?:^|,)\s*text\/html(?:\s*[;,]|$)/i.test(accept)) {
      const normalized = accept.replace(
        /(^|,)\s*text\/\*(?=\s*(?:;|,|$))/gi,
        '$1text/html',
      )
      if (normalized !== accept) {
        const headers = new Headers(request.headers)
        headers.set('accept', normalized)
        request = new Request(request, { headers })
      }
    }
    return handler.fetch(request, options)
  },
})
