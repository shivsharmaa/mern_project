const Address = require("../Modals/AddressModal");

// create Address
exports.createAddress = async(req, res) => {
    try{
        const newAddress = await Address.create(req.body);

        res.status(200).json({
            success: true,
            message: "Address create successfully.",
            data: newAddress,
          })
    }catch (error) {
        console.log(error);
        res.status(500).json({
          success: false,
          message: "Something Went Wrong.",
        });
      }

}

// get Address
exports.getAddress = async(req, res) => {

  try{
    const addressData = await Address.findById(req.params);
    console.log(addressData);

    if(!addressData){
      return res.status(401).json({
        success: false,
        message: "Address is not available in the db, please Add new address"
    })
    }

    res.status(200).json({
      success: true,
      message: "fetch successfully",
      data: addressData
    })

  }catch(error){
    console.log(error);
    res.status(401).json({
      success: false,
      message: "something went wrong in Address"
    })
  }
}

// get All address

exports.getAllAddress = async (req, res) => {

  try{
    const addressData = await Address.find(req.params.id);
    console.log(addressData);

    if(!addressData){
      return res.status(401).json({
          success: false,
          message: "something went wrong in Address"
      })
    }

    res.status(200).json({
      success: true,
      message: "fetch successfully",
      data: addressData
    })

  }catch(error){
    console.log(error);
    res.status(401).json({
      success: false,
      message: "something went wrong in Address"
    })
  }
}

// update details

  exports.updateAddress = async (req, res) => {
   try{

    const addressData = await Address.findByIdAndUpdate(req.params.id, req.body);

    if(!addressData){
      return res.status(401).json({
        success: false,
        message: "something went wrong in Address"
    })
    }

    res.status(200).json({
      success: true,
      message: "fetched successfully",
      data: addressData
    })

   } catch(error){
    console.log(error);
    res.status(401).json({
      success: false,
      message: "something went wrong in Address"
    })
   }
  }