const mongoose = require("mongoose");
const Owner = require("../Modals/OwnerModal");
const ParkingSpace = require("../Modals/ParkingSpace");

exports.createOwner = async (req, res) => {

    try{
        const { ownerName, familyCount, contactNumber, emailId, vehicleCount, vehicleDetails, flatId } = req.body;

        console.log("Received Data: ", req.body);
        // const newOwner = await Owner.create(req.body);
        const newOwner = new Owner({
            ownerName,
            familyCount,
            contactNumber,
            emailId,
            vehicleCount,
            vehicleDetails,
            flatId
          });
        console.log("The code run: ",req.body)

        const savedOwner = await newOwner.save();

         // Step 2: Auto-create parking spaces
        //  const parkingSpacesToCreate = vehicleDetails.map(vehicle => ({
        //     ownerId: newOwner._id,
        //     vehicleId: vehicle._id, // NOTE: We'll fix this next line
        //     status: "occupied"
        // }));

        const parkingSlots = savedOwner.vehicleDetails.map((vehicle, index) => ({
           
           slotNumber: `P-${savedOwner.flatId}-${index + 1}`,
            flatId: savedOwner.flatId,
            vehicleType: vehicle.vehicleType,
            vehicleNumber: vehicle.vehicleNumber,
            ownerId: savedOwner._id,
            role: 'owner',
          }));

        await ParkingSpace.insertMany(parkingSlots);
        res.status(201).json({
            success: true,
            message: "Owner and Parking Spaces created successfully!",
            data: savedOwner,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Something went wrong" });
    }
};

// get owner details

exports.getSingleOwner = async (req, res) => {
    try{
        const owner = await Owner.findById(req.params.id)
        .populate({
            path : "flatId", populate : {
                path : "wingId", populate : {
                    path: "buildingId", populate : {
                        path : "addressId"
                    }
                }
            }
        })

        if(!owner) {
            return res.status(400).json({
                success: false,
                message: "Owner not found with the provided ID"
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


exports.getAllOwner = async (req, res) => {
    try{
        const owners = await Owner.find().populate({
            path : "flatId", populate : {
                path : "wingId", populate : {
                    path : "buildingId", populate : {
                        path : "addressId"
                    }
                }
            }
        })

        res.status(200).json({
            success: true,
            message: "fetched successfully",
            data: owners
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
exports.updateOwner = async (req, res) => {
    try{
        const owner = await Owner.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if(!owner){
            return res.status(400).json({
                success: false,
                message: "Owner not found for update",
                data: owner
            })
        }

        res.status(200).json({
            success: true,
            message: "Owner updated successfully",
            data: owner
        });

    }catch(error){
        console.log(error);
        res.status(400).json({
            success: false,
            message: "something went wrong"
        })
    }
}