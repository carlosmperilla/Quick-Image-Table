export default fromNodeMiddleware((req, res) => {
    console.log(res)
    console.log(typeof res)
    console.log(res.headers)
    console.log(Object.keys(res))
    console.log(res.headersSent)
    console.log(res._headers)
    res._headers = {
        "X-Frame-Options": "SAMEORIGIN",
        "X-XSS-Protection": "1; mode=block",
        "X-Content-Type-Options": "nosniff"
    }
    console.log(Object.keys(req))
    console.log(req.headers)
    // res.end({
    //     "X-Frame-Options": "SAMEORIGIN",
    //     "X-XSS-Protection": "1; mode=block",
    //     "X-Content-Type-Options": "nosniff"
    // });
})