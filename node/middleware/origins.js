module.exports = (req, res, next) => {
    const allowedOrigins = ["http://localhost:3000"];
    let origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
      res.header("Access-Control-Allow-Origin", origin); // restrict it to the required domain
    }
  
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  }