import express from 'express';

const app = express();

app.use((req, res, next) => {
    
    res.set({
        "X-Frame-Options": "SAMEORIGIN",
        "X-XSS-Protection": "1; mode=block",
        "X-Content-Type-Options": "nosniff"
    });
    //or
    res.set("Content-Security-Policy", "upgrade-insecure-requests; block-all-mixed-content;");
    //or
    res.header("Referrer-Policy", "strict-origin-when-cross-origin");
    res.header("Feature-Policy", "camera 'none'; microphone 'none'");
    res.header("Permissions-Policy", "camera=(), microphone=()");

    next();
});

export default app;