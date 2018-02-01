var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var custTransaction = new Schema(
    {
        customerid : {type: mongoose.Schema.Types.ObjectId, ref: 'customer'},
        when: {type:String},
        ltr: {type:Number},
        createddt: { type: Date, default:new Date().toISOString().substring(0,10) }    
        }
)
custTransaction.index({ customerid: 1, when: 1, createddt: 1}, { unique: true })
module.exports = mongoose.model('custTransaction',custTransaction)