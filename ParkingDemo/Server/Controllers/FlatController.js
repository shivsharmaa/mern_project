const Flat = require("../Modals/FlatModel")


// create flat
exports.createFlat = async(req, res)=> {
    try{

        console.log("Received data", req.body)
        const newFlat = await Flat.create(req.body);

        if(!newFlat){
           return res.status(401).json({
                success : false,
                message: "this flat is already available"
            })
        }

        res.status(200).json({
            success: true,
            message: "flat created successfully",
            data: newFlat,
        })
    }
    catch(error){
        console.log(error);
        res.status(401).json({
            success: false,
            message: "something went wrong"
        })
    }
}


//get flat by id

exports.getSingleFlat = async (req, res) => {
    try{
        const flat = await Flat.findById(req.params);

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
        const flat = await Flat.find();

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


// update flat

const updateFlat = async (req, res) => {
    try{
        const flatData = await Flat.findByIdAndUpdate(req.params.id, req.body);
        console.log(flatData)
        
        res.status(204).json({
            success: true,
            message: "updated successfully",
            data: flatData
        })

    }catch(error){
        console.log(error)
    }
}