export default defineEventHandler((event) => {
    // setHeader(event, 'x-content-type-options', 'nosniff')
    setResponseHeader(event, 'x-content-type-options', 'nosniff')
    setResponseHeader(event, 'x-frame-options',  'SAMEORIGIN')
    setResponseHeader(event, 'referrer-policy', 'no-referrer')
    setResponseHeader(event, 'permissions-policy', 'camera=self')
    console.log(event.node.res._headers)
})