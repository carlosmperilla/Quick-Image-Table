export default defineEventHandler((event) => {
    setHeader(event, "X-Content-Type-Options", "nosniff")
})