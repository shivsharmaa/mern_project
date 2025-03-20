const express = require('express');

const user = require('./user.routes');

exports.RouterConfig = (app) => {
    app.use("/api/v1", user)
}