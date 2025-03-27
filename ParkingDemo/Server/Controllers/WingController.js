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
        const wing = await Wing.findById(req.params).populate("Building", "Address")
        .populate({path : "Building",populate : {
            path : "Address"
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
        const wing = await Wing.find().populate("Building");
        console.log(wing);
        return res.status(200).json({
          success: true,
          message:  "Wings detail are fetching successfully",
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

// update wing

    