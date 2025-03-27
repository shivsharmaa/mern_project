const mongoose = require("mongoose");
const Owner = require("../Modals/OwnerModal");

exports.createOwner = async (req, res) => {

    try{
        const newOwner = await Owner.create(req.body);
        console.log("The code run: ",req.body)
        res.status(200).json({
            success: true,
            message: "Owner created successfully",
            data: newOwner
        })

    }catch(error){
        console.log(error);
        res.status(401).json({
            success: false,
            message: "something went wrong!"
        })
    }
}

// get owner details

const getSingleOwner = async (req, res) => {
    try{
        const owner = await Owner.findById(req.params.id);
        if(!owner) {
            return res.status(400).json({
                success: false,
                message: "this name of owner is not available, please check again"
            })
        }

        res.status(200).json({
            success: true,
            message: "fetched successfully",
            data: owner
        })

    }catch(error){
        console.log(error)
        res.status(400).json({
            success : false,
            message: "something went wrong"
        })
    }
}

// get All Owner


const getAllOwner = async (req, res) => {
    try{
        const owner = await Owner.find();
        if(!owner) {
            return res.status(400).json({
                success: false,
                message: "something went wrong"
            })
        }

        res.status(200).json({
            success: true,
            message: "fetched successfully",
            data: owner
        })

    }catch(error){
        console.log(error)
        res.status(400).json({
            success : false,
            message: "something went wrong"
        })
    }
}

// update owner details
const updateOwner = async (req, res) => {
    try{
        const owner = await Owner.findByIdAndUpdate(req.params.id, req.body);

        if(!owner){
            return res.status(400).json({
                success: false,
                message: "updated successfully",
                data: owner
            })
        }
    }catch(error){
        console.log(error);
        res.status(400).json({
            success: false,
            message: "something went wrong"
        })
    }
}