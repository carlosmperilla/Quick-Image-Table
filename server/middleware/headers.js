// Solo es util cuando npm run build
// Por ello defino el header mediante la configuración de netlify.

export default defineEventHandler((event) => {
    setResponseHeader(event, 'x-frame-options',  'SAMEORIGIN')
    setResponseHeader(event, 'referrer-policy', 'no-referrer')
    setResponseHeader(event, 'permissions-policy', 'camera=self')
    setResponseHeader(event, 'x-permitted-cross-domain-policies', 'none')
    setResponseHeader(event, 'x-xss-protection', '0')
    setResponseHeader(event, 'content-security-policy', 'frame-ancestors none;')
    setResponseHeader(event, 'x-content-type-options', 'nosniff')
})