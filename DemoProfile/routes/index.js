const adminRouter = require("../routes/AdminRoutes");

exports.RouterConfig = (app)=>{
    app.use("/api/v1", adminRouter)
}