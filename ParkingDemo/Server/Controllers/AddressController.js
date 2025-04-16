const Address = require("../Modals/AddressModal");

// create Address
exports.createAddress = async(req, res) => {
    try{
      
        console.log("received", req.body)
        const newAddress = await Address.create(req.body);
       

        res.status(200).json({
            success: true,
            message: "Address create successfully.",
            data: newAddress,
          })
    }catch (error) {
        console.log(error);
        res.status(404).json({
          success: false,
          message: "Something Went Wrong.",
        });
      }

}

// get Address
exports.getAddress = async(req, res) => {

  try{
    
    const addressData = await Address.findById(req.params.id);
    console.log(addressData);

    if(!addressData){
      return res.status(404).json({
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
    res.status(404).json({
      success: false,
      message: "something went wrong in Address"
    })
  }
}

// get All address

exports.getAllAddress = async (req, res) => {

  try{

    let {page, limit} = req.query;
      page = parseInt(page) || 1;
      limit = parseInt(limit) || 5;

      const totalAddress = await Address.countDocuments();
      const totalPages = Math.ceil(totalAddress / limit);

    const addressData = await Address.find({})
    .skip((page -1) * limit)
    .limit(limit)
    console.log(addressData);

    if(addressData.length === 0){
      return res.status(404).json({
          success: false,
          message: "something went wrong in Address"
      })
    }

    res.status(200).json({
      success: true,
      message: "fetch successfully",
      data: addressData,
      // current page, limit, total address of number, total page calculate
      pagination : {
        currentPage : page,
        limit : limit,
        totalAddress: totalAddress,
        totalPages: totalPages,
      }
    })

  }catch(error){
    console.log(error);
    res.status(404).json({
      success: false,
      message: "something went wrong in Address"
    })
  }
}

// update details

  exports.updateAddress = async (req, res) => {
   try{

    const addressData = await Address.findByIdAndUpdate(req.params.id, req.body, {new : true});

    if(!addressData){
      return res.status(401).json({
        success: false,
        message: "something went wrong in Address"
    })
    }

    res.status(200).json({
      success: true,
      message: "updated successfully",
      data: addressData
    })

   } catch(error){
    console.log(error);
    res.status(404).json({
      success: false,
      message: "something went wrong in Address"
    })
   }
  }