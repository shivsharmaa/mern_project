const Wing = require("../Modals/WingModal");


// create Wing
exports.createWing = async(req, res) => {
    try{

        const newWing = await Wing.create(req.body);
        res.status(200).json({
            success: true,
            message: "Wing created successfully",
            data: newWing
        });
    }catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong."
        });
    }

};

// get wing details

exports.getWing = async (req, res) => {
    try{
        // const wing = await Wing.findById(req.params).populate(["Building", "Address"]);
        const wing = await Wing.findById(req.params).populate("buildingId", "addressId")
        .populate({path : "buildingId", 
            populate : {
            path : "addressId"
        }
            
        });
        console.log(wing);
        return res.status(200).json({
          success: true,
          message:  "Wing detail fetching successfully",
          data: wing
        })
    }catch(error){
        console.log(error);
        res.status(401).json({
            success: false,
            message: 'something went wrong'
        })
    }
}


//  get All wings

exports.getAllWing = async (req, res) => {
    try{

        let {page, limit} = req.query;
        page = parseInt(page) || 1 ;
        limit = parseInt(limit) || 5;

        const totalWing = await Wing.countDocuments();
        const totalPages = Math.ceil(totalWing / limit);


        const wing = await Wing.find().populate({path : "buildingId", populate: {
                    path: "addressId"
                }})
                .skip((page -1) * limit)
                .limit(limit)

        console.log(wing);
        if(wing.length === 0){
            return res.status(404).json({
                success: false,
                message: "something went wrong in Wing"
            })
          }
        return res.status(200).json({
          success: true,
          message:  "Wings detail are fetching successfully",
          data: wing,
          pagination : {
        currentPage : page,
        limit : limit,
        totalWing: wing,
        totalPages: totalPages,
      }
        })
    }catch(error){
        console.log(error);
        res.status(401).json({
            success: false,
            message: 'something went wrong'
        })
    }
}

// update wing

// Update Wing
exports.updateWing = async (req, res) => {
    try {
        const updatedWing = await Wing.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!updatedWing) {
            return res.status(404).json({
                success: false,
                message: 'Wing not found for update',
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Wing updated successfully',
            data: updatedWing,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error: error.message,
        });
    }
};
