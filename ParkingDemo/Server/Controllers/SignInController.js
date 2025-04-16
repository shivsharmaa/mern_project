const FamilyMember = require('../Modals/FamilyMemberSignIn');
const SignIn = require('../Modals/SignIn');


// Sign up API
exports.signupFamilyMember  = async (req, res) => {
    try{
        console.log("Received data: ", req.body);
        const {name, mobileNumber , password, flatId, relationWithOwner, role } = req.body;

        // if mobile number already exist
        const existingUser = await SignIn.findOne({mobileNumber})
        if(existingUser){
            return res.status(400).json({ message: 'Mobile Number already registered.' })
        }

        // create family member entry
        const familyMember = new FamilyMember({
            name,
            mobileNumber,
            flatId,
            relationWithOwner,

        });

         await familyMember.save();

        // create Signin entry
        const newSignIn = new SignIn({
            name,
            mobileNumber,
            password,
            flatId,
            role  // owner if its owner
        })

         await newSignIn.save();

        // const sign = await SignIn.create(req.body)

        // return success
        return res.status(200).json({
            success : true,
            message : 'family member registered successfully',

        })

    }catch(error){
        console.log(error);
        res.status(400).json({
            success : false,
            message : "Something went wrong",
          
        })
    }
}



// get family details

exports.getFamilyDetails = async (req, res) => {
    try{
        console.log("received: ", req.body);

        const user = await FamilyMember.find(req.body)

        if(!user){
           return res.status(404).json({
                success: false,
                message: "this user is not available in database, please register"

            })
        }

        res.status(200).json({
            success: true,
                message: "successfully fetch",
                data : user

        })

    }catch(error){
        console.log(error);
        res.status(404).json({
            success: false,
                message: "something went wrong",

        })
    }
}



exports.login = async (req, res) => {
    try {
        console.log(req.body);
        const {mobileNumber, password} = req.body;
        const loginUser = await SignIn.findOne({mobileNumber});

        if(!mobileNumber) {
            return res.status(404).json({
                success: false,
                message: "this user is not available in database"

            })
        }
        res.status(200).json({
            success: true,
            message: "Login Successfully",
            data : loginUser
        })
    } catch (error) {
        console.log(error);
        res.status(404).json({
            success: false,
                message: "something went wrong",
                data : user

        
    })
}
}