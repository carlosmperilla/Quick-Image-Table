export default defineEventHandler((event) => {
    // setHeader(event, 'X-Content-Type-Options', 'nosniff')
    event.node.res.setHeader('x-content-type-options', 'nosniff')
})