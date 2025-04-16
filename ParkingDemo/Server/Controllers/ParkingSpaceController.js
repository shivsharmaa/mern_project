const ParkingSpace = require('../Modals/ParkingSpace');

// Vehicle leaves parking
exports.vehicleLeftParking = async (req, res) => {
    try {
        const { vehicleId } = req.body;

        const parkingSpace = await ParkingSpace.findOne({ vehicleId });

        if (!parkingSpace) {
            return res.status(404).json({
                success: false,
                message: 'Parking space not found for this vehicle.'
            });
        }

        parkingSpace.status = 'vacant';
        await parkingSpace.save();

        res.status(200).json({
            success: true,
            message: 'Vehicle left. Parking space marked as vacant.',
            data: parkingSpace
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Something went wrong.'
        });
    }
};

// Vehicle returns to parking
exports.vehicleReturnedParking = async (req, res) => {
    try {
        const { vehicleId } = req.body;

        const parkingSpace = await ParkingSpace.findOne({ vehicleId });

        if (!parkingSpace) {
            return res.status(404).json({
                success: false,
                message: 'Parking space not found for this vehicle.'
            });
        }

        parkingSpace.status = 'occupied';
        await parkingSpace.save();

        res.status(200).json({
            success: true,
            message: 'Vehicle returned. Parking space marked as occupied.',
            data: parkingSpace
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Something went wrong.'
        });
    }
};

// Get all parking spaces for an owner
exports.getParkingStatusForOwner = async (req, res) => {
    try {
        const { ownerId } = req.params;

        const parkingSpaces = await ParkingSpace.find({ ownerId }).populate('vehicleId');

        res.status(200).json({
            success: true,
            message: 'Fetched parking spaces successfully',
            data: parkingSpaces
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Something went wrong.'
        });
    }
};
