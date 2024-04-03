
const expModel = require("../models/expModel.js")
const expData = async(req,res) =>{
    try {
        const expData = new expModel(req.body);
        await expData.save();
        return res.status(200).send({
            message:"Data saved succesfully",
            success:true
        })
    } catch (error) {
        return res.status(501).send({
            message:"Unable to save your experience please try again...",
            success:true
        })
    }
}
module.exports = {expData}