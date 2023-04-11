export default defineEventHandler((event) => {
    // setHeader(event, 'x-content-type-options', 'nosniff')
    setResponseHeader(event, 'x-content-type-options', 'nosniff')
    setResponseHeader(event, 'x-frame-options',  'SAMEORIGIN')
    setResponseHeader(event, 'referrer-policy', 'no-referrer')
    setResponseHeader(event, 'permissions-policy', 'camera=self')
    setResponseHeader(event, 'x-permitted-cross-domain-policies', 'none')
    setResponseHeader(event, 'x-xss-protection', '0')
    setResponseHeader(event, 'content-security-policy', 'frame-ancestors none;')
    // appendHeader(event, 'x-content-type-options', 'nosniff')
    // appendHeader(event, 'x-frame-options',  'SAMEORIGIN')
    // appendHeader(event, 'referrer-policy', 'no-referrer')
    // appendHeader(event, 'permissions-policy', 'camera=self')
    // appendHeader(event, 'x-permitted-cross-domain-policies', 'none')
    // appendHeader(event, 'x-xss-protection', '0')
    // appendHeader(event, 'content-security-policy', 'frame-ancestors none;')
})