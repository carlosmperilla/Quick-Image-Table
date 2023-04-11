export default defineEventHandler((event) => {
    console.log('New request: ' + event.node.req.url)
    try {
        event.node.res.set({
            "X-Frame-Options": "SAMEORIGIN",
            "X-XSS-Protection": "1; mode=block",
            "X-Content-Type-Options": "nosniff"
        })
    } catch(err) {
        console.log(err)
        console.log(event.node)
    }
})