const Guest = require("../Modals/GuestModel");
const ParkingSpace = require("../Modals/ParkingSpace");
const Owner = require("../Modals/OwnerModal");

exports.registerGuest = async (req, res) => {
  try {
    console.log(req.body)
    const { guestName, vehicleNumber, vehicleType, ownerId } = req.body;

    // Check if the owner exists
    const owner = await Owner.findById(ownerId).populate("flatId");
    if (!owner) {
      return res.status(404).json({
        success: false,
        message: "Owner not found",
      });
    }

    // Find a vacant parking slot
    const vacantSlot = await ParkingSpace.findOne({
      status: "vacant",
      role: "guest",
    });
    if (!vacantSlot) {
      return res.status(400).json({
        success: false,
        message: "No vacant guest parking space available.",
      });
    }

    // Create guest vehicle entry
    const newGuest = await Guest.create({
      guestName,
      vehicleNumber,
      vehicleType,
      flatId: owner.flatId,
      ownerId,
      assignedParkingSlot: vacantSlot._id,
    });
    
    // Update parking slot to occupied
    vacantSlot.status = "occupied";
    vacantSlot.vehicleNumber = vehicleNumber;
    vacantSlot.vehicleType = vehicleType;
    vacantSlot.guestId = newGuest._id;
    await vacantSlot.save();



     return res.status(200).json({
      success: true,
      message: "Guest registered and parking assigned",
      data: newGuest,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while registering the guest.",
    });
  }
};

// Guest leaves, free up parking
exports.guestDeparture = async (req, res) => {
  try {
    const { vehicleNumber } = req.body;

    const guest = await Guest.findOne({ vehicleNumber });

    if (!guest) {
      return res
        .status(404)
        .json({ success: false, message: "Guest not found" });
    }

    // Free up parking space
    const slotId = guest.assignedParkingSlot.split("-")[1];
    const parking = await ParkingSpace.findById(slotId);
    if (parking) {
      parking.status = "vacant";
      await parking.save();
    }

    // Set departure time
    guest.departureTime = new Date();
    await guest.save();

    res.status(200).json({
      success: true,
      message: "Guest departure recorded and parking freed.",
      data: guest,
    });
  } catch (error) {
    console.error("Error in guest departure:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
