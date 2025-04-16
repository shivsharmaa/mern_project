const Building = require("../Modals/BuildingModal");

//   create building
exports.createBuild = async (req, res) => {
  try {
    const newBuilding = await Building.create(req.body);
    
    res.status(200).json({
      success: true,
      message: "Building create successfully.",
      data: newBuilding,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something Went Wrong.",
    });
  }
};



//  get perticular the building data

exports.getBuilding= async (req, res) => {

  try{
    const building_data = await Building.findById(req.params.id).populate("addressId");


    console.log("Building data" ,building_data);
    if(!building_data){
      return res.status(404).json({
        success: false,
        message: "Building not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Successfully fetch",
      data: building_data,
   
    });



  }catch(error){
    console.log(error);
    res.status(404).json({
      success: false,
      message: "something went wrong",
    })
  }
}

// get All building data

exports.getAllBuilding = async (req, res) =>{
  try{
    const building_data = await Building.find().populate("addressId");

    console.log("---------------------start-----------------------------------");
    console.log(building_data)
    console.log("---------------------End------------------------------------");

    return res.status(200).json({
      success: true,
      message: "All building data fetched successfully",
      data: building_data
    })
  }catch(error){
    console.log(error);
    res.status(401).json({
      success : false,
      message : "something went wrong"
    })
  }
 
}


//  updated building details

exports.updateBuilding = async (req, res) => {

  try{
    const buildingUpdate = await Building.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidation: true,
      useFindAndModify: false,
    });

      console.log(buildingUpdate)
    res.status(200).json({
      success: true,
      message: 'Updated successfully',
      data: buildingUpdate
    })


  }catch(error){
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "something went wrong"
    })
  }
}

//  delete building

exports.deleteBuilding = async (req, res) => {
  try{
    const building = await Building.findByIdAndDelete(req.params.id);
    console.log(building);
    return res.status(200).json({
      success: true,
      message:  "Deleted successfully",
      data: building
    })

  }
  catch(error){
    console.log(error);
    res.status(401).json({
      success: false,
      message: 'something went wrong'
    })
  }
}