export default defineEventHandler((event) => {
    // setHeader(event, 'X-Content-Type-Options', 'nosniff')
    event.node.res.setHeader('X-Content-Type-Options', 'nosniff')
})