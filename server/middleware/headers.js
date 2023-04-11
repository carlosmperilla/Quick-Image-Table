export default defineEventHandler((event) => {
    setHeader(event, 'x-content-type-options', 'nosniff')
    // event.node.res.setHeader('x-content-type-options', 'nosniff')
})