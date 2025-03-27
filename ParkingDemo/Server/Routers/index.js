const express = require("express");
const Building = require("./BuildingRouter");
const Address = require("./AddressRoutes"); 
const Wing = require("./WingRouter");
const Flat = require("./FlatRouter");
const Owner = require("./OwnerRouter");

exports.RouterConfig = (app) => {
  app.use("/api/v1", Building, Address, Wing, Flat, Owner,);
};
