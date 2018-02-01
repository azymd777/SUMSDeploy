var mongoose = require('mongoose')

module.exports = mongoose.model('customer',{
    customerid: { type: Number, require:true, index: {unique: true, dropDups: true} },
    name: { type: String, require:true },
    contactno: Number,
    address: {
        add1: String,
        add2: String,
        pincode: Number
    },
    createddt: { type: Date, default: new Date().toISOString().substring(0,10) },
    active: { type: Boolean, default: true }

})