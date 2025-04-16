const ParkingSpace = require("../Modals/ParkingSpace");

exports.createGuestParkingSlots = async (req, res) => {
    try {
        const guestSlots = [];

        for (let i = 1; i <= 50; i++) {
            guestSlots.push({
                slotNumber: `G-${i}`, // G for guest
                status: "vacant",
                role: "guest"
            });
        }

        const result = await ParkingSpace.insertMany(guestSlots, { ordered: false });

        res.status(201).json({
            success: true,
            message: "50 guest parking slots created successfully",
            data: result
        });

    } catch (error) {
        console.error("Error creating guest slots:", error);
        res.status(500).json({
            success: false,
            message: "Failed to create guest parking slots",
            error: error.message
        });
    }
};
