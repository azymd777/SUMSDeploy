var express = require('express')
var CustomerTranRouter = express.Router()
var Custtran = require('../models/custTransaction.js')
CustomerTranRouter.route('/')
.get(async (req,res) => { 
    var customertran = await Custtran.find({},{__v:0})
    .populate('customerid','name')
    .exec(function(err, result){
    if(err)
    {
        console.log(err);
        res.status(500).send("Error While fetching data")
    }
    else
    {
        res.status(200).send(result)
    }
 })
})

.post((req,res) => {
    var custtrandata = req.body
    var custtran = new Custtran(custtrandata)
    custtran.save((err,result)=>
    {
        if(err)
        {
            console.log(err)
            res.status(500).send("Error While fetching data")
        }
        res.sendStatus(200)
    }
    )
})

CustomerTranRouter.route('/:id')
.get(async (req,res) => {    
    var customertran = await Custtran.findById(req.params.id,{__v:0},(err,result)=>
    {
        if(err)
        {
            console.log(err);
            res.status(500).send("Error While fetching data")
        }
        else
        {
            res.status(200).send(result)
        }
    }
    );   
   
})
.put(function(req, res) {
    const custtran = {
      when: req.body.when,
      ltr: req.body.ltr
    }
    Custtran.update({_id: req.params.id}, custtran, function(err, raw) {
        if(err)
        {
            console.log(err);
            res.status(500).send("Error While Updating data")
        }
        else
        {
            res.sendStatus(200)
        }
    });
  });

  CustomerTranRouter.route('/search')
  .post(async (req,res) => { 
    searchdata = req.body
    var customertran = await Custtran.find({createddt:{$gte:searchdata.frmdate , $lte:searchdata.todate}},{__v:0})
    .populate('customerid')
    .exec(function(err, result){
    if(err)
    {
        console.log(err);
        res.status(500).send("Error While fetching data")
    }
    else
    {
        result = result.filter(function(tran){
            return tran.customerid.customerid == searchdata.customerid
          })
        res.status(200).send(result)
    }
 })
})
  module.exports = CustomerTranRouter
