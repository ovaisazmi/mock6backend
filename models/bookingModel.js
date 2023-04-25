const mongoose=require("mongoose");

const bookingSchema=mongoose.Schema({
    user : { type: String, ref: 'User' },
	flight : { type: String, ref: 'Flight' }
})

const bookingModel=mongoose.model("bookingCollection",bookingSchema);

module.exports={bookingModel};