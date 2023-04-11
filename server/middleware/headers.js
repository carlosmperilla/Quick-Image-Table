export default defineEventHandler((event) => {
    setHeader(event, 'x-content-type-options', 'nosniff')
    console.log(event.node.res._headers)
})