const express = require("express");
const Building = require("./BuildingRouter");
const Address = require("./AddressRoutes"); 
const Wing = require("./WingRouter");
const Flat = require("./FlatRouter");
const Owner = require("./OwnerRouter");
const SignIN = require("./SignINRouter");
const ParkingSpace = require("./ParkingRoutes")
const ParkingSlots = require("./ParkingSlotRoutes")
const Guest = require("./GuestRoutes")

exports.RouterConfig = (app) => {
  app.use("/api/v1", Building, Address, Wing, Flat, Owner, SignIN, ParkingSpace, Guest, ParkingSlots);
};
