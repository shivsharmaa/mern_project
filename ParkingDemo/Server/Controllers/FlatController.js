const Flat = require("../Modals/FlatModel");
const ParkingSpace = require("../Modals/ParkingSpace");

//create flat
exports.createFlat = async (req, res) => {
    try {
        console.log("Received body:", req.body);

        if (!Array.isArray(req.body) || req.body.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Request body must be a non-empty array.",
            });
        }

        let allFlats = [];

        // Loop through each set of flats data
        for (const flatData of req.body) {
            const { flatsPerFloor, totalFloors, wing } = flatData;

            if (!flatsPerFloor || !totalFloors || !wing) {
                return res.status(400).json({
                    success: false,
                    message: "Each entry must contain flatsPerFloor, totalFloors, and wing.",
                });
            }

            let flats = [];

            // Generate flat numbers
            for (let floor = 1; floor <= totalFloors; floor++) {
                for (let flatNum = 1; flatNum <= flatsPerFloor; flatNum++) {
                    const flatNumber = `${floor * 100 + flatNum}`;
                    flats.push({
                       flatNumber: flatNumber,
                        floorNumber: floor,
                        wingId : wing,
                    });
                }
               
            }

            allFlats = [...allFlats, ...flats]; // Merge all flats into one array
        }

        console.log("Flats to be inserted:", allFlats);


       
      
         // Insert all flats using bulk insert
         const result = await Flat.insertMany(allFlats, { ordered: false });

       res.status(201).json({
            success: true,
            message: "Flats created successfully",
            data: result,
        });

    } catch (error) {
        console.error("Error in createFlat:", error);
        if (error.name === 'BulkWriteError' && error.code === 11000) {
            return res.status(409).json({
                success: false,
                message: "Duplicate flat numbers found.",
                error: error.message,
            });
        }
    
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message,
        });
    }
};


//get flat by id

exports.getSingleFlat = async (req, res) => {
    try{
        
        const flat = await Flat.findById(req.params.id).populate("wingId", "buildingId", "addressId")
        .populate({
            path : "wingId", populate: {
                path: "buildingId",
           
            populate : {
                path: "addressId"
            }
        }
        })

        console.log(flat)
        res.status(200).json({
            success: true,
            message: "Flat fetched successfully",
            data: flat
        })

    }catch(error){
        console.log(error);
        res.status(401).json({
            success: false,
            message: "something went wrong"
        })
    }
}

// get all flat

exports.getAllFlat = async (req, res) => {
    try{

        let {page, limit} = req.query;
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 10;

        const totalFlats = await Flat.countDocuments();
              const totalPages = Math.ceil(totalFlats / limit);

                
        const flatData = await Flat.find().populate({
            path : "wingId",
            populate: {
                path : "buildingId",
                populate : {
                    path : "addressId"
                }
            }
        })
        .skip((page -1) * limit)
        .limit(limit)
        console.log(flatData);
        

        res.status(200).json({
            success: true,
            message: "Flat fetched successfully",
            data: flatData,
            pagination : {
        currentPage : page,
        limit : limit,
        totalFlats: totalFlats,
        totalPages: totalPages,
      }
        })

    }catch(error){
        console.log(error);
        res.status(400).json({
            success: false,
            message: "something went wrong"
        })
    }
}


// update flat

    exports.updateFlat = async (req, res) => {
    try{
        const flatData = await Flat.findByIdAndUpdate(req.params.id, req.body, {new : true});
        console.log(flatData)
        
        res.status(200).json({
            success: true,
            message: "updated successfully",
            data: flatData
        })

    }catch(error){
        console.log(error);
        res.status(400).json({
            success: false,
            message: "Update failed",
            error: error.message,
        });
    }
}