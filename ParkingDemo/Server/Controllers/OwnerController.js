const mongoose = require("mongoose");
const Owner = require("../Modals/OwnerModal");
const ParkingSpace = require("../Modals/ParkingSpace");

exports.createOwner = async (req, res) => {

    
  try {
    const {
      ownerName,
      familyCount,
      contactNumber,
      emailId,
      vehicleCount,
      vehicleDetails,
      flatId,
    } = req.body;

    console.log("Received Data: ", req.body);

    // regular expression
    const ownerNameRegex = /^[A-Z][a-zA-Z\s]{2,}$/;
    const contactNumberRegex = /^\d{10}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]{2,}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


    // validation 

    if(!ownerName || !ownerNameRegex.test(ownerName)){
        return res.status(400).json({
            success: false,
            message: "Owner name must start with a capital letter and have at least 3 characters",
          });
    }

    if (!familyCount || isNaN(familyCount) || familyCount < 1) {
        return res.status(400).json({
          success: false,
          message: "Family count must be a valid number greater than 0",
        });
      }


      if (!emailId || !emailRegex.test(emailId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid email format",
        });
      }

    if(!contactNumber || !contactNumberRegex.test(contactNumber)){
        return res.status(400).json({
            success: false,
            message: "Contact number must be exactly 10 digits",
          });
    }

    // if (!vehicleCount || isNaN(vehicleCount) || vehicleCount < 0) {
    //     return res.status(400).json({
    //       success: false,
    //       message: "Vehicle count must be a valid number",
    //     });
    //   }

    //   if (!vehicleDetails || !Array.isArray(vehicleDetails) || vehicleDetails.length === 0) {
    //     return res.status(400).json({
    //       success: false,
    //       message: "Vehicle details are required and must be an array",
    //     });
    //   }



    // Check unique vehicle numbers in array
    const vehicleNumbers = vehicleDetails.map(v => v.vehicleNumber);
    const uniqueNumbers = new Set(vehicleNumbers);
    if (vehicleNumbers.length !== uniqueNumbers.size) {
      return res.status(400).json({
        success: false,
        message: "Vehicle numbers must be unique",
      });
    }

    if (!flatId) {
        return res.status(400).json({
          success: false,
          message: "Flat ID is required",
        });
      }

       // Check if flatId already exists
    const existingFlat = await Owner.findOne({ flatId });
    if (existingFlat) {
      return res.status(400).json({
        success: false,
        message: "This flatId is already assigned to another owner",
      });
    }
    // if (
    // !ownerName || !familyCount || !contactNumber || !emailId || !vehicleCount ||
    // !vehicleDetails || !flatId
    // ) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "all fields are required",
    //   });

    // }
    // const newOwner = await Owner.create(req.body);


    //save owner 
    const newOwner = new Owner({
      ownerName,
      familyCount,
      contactNumber,
      emailId,
      vehicleCount,
      vehicleDetails,
      flatId,
    });
    console.log("The code run: ", req.body);

    const savedOwner = await newOwner.save();

    // Step 2: Auto-create parking spaces
    //  const parkingSpacesToCreate = vehicleDetails.map(vehicle => ({
    //     ownerId: newOwner._id,
    //     vehicleId: vehicle._id, // NOTE: We'll fix this next line
    //     status: "occupied"
    // }));


    // create parking slot for owner
    const parkingSlots = savedOwner.vehicleDetails.map((vehicle, index) => ({
      slotNumber: `P-${savedOwner.flatId}-${index + 1}`,
      flatId: savedOwner.flatId,
      vehicleType: vehicle.vehicleType,
      vehicleNumber: vehicle.vehicleNumber,

      ownerId: savedOwner._id,
      role: "owner",
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
  try {
    const owner = await Owner.findById(req.params.id).populate({
      path: "flatId",
      populate: {
        path: "wingId",
        populate: {
          path: "buildingId",
          populate: {
            path: "addressId",
          },
        },
      },
    });

    if (!owner) {
      return res.status(400).json({
        success: false,
        message: "Owner not found with the provided ID",
      });
    }

    res.status(200).json({
      success: true,
      message: "fetched successfully",
      data: owner,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "something went wrong",
    });
  }
};

// get All Owner

exports.getAllOwner = async (req, res) => {
  try {
     let {page, limit} = req.query;
          page = parseInt(page) || 1;
          limit = parseInt(limit) || 5;
    
          const totalOwner = await Owner.countDocuments();
          const totalPages = Math.ceil(totalOwner / limit);



    const owners = await Owner.find().populate({
      path: "flatId",
      populate: {
        path: "wingId",
        populate: {
          path: "buildingId",
          populate: {
            path: "addressId",
          },
        },
      },
    })
    .skip((page -1) * limit)
    .limit(limit)
    console.log(owners);

    
    if(owners.length === 0){
        return res.status(404).json({
            success: false,
            message: "something went wrong"
        })
      }

    res.status(200).json({
      success: true,
      message: "fetched successfully",
      data: owners,
      pagination : {
        currentPage : page,
        limit : limit,
        totalOwner: totalOwner,
        totalPages: totalPages,
    }
  })


  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "something went wrong",
    });
  }
};

// update owner details
exports.updateOwner = async (req, res) => {
  try {
    const owner = await Owner.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!owner) {
      return res.status(400).json({
        success: false,
        message: "Owner not found for update",
        data: owner,
      });
    }

    res.status(200).json({
      success: true,
      message: "Owner updated successfully",
      data: owner,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "something went wrong",
    });
  }
};
