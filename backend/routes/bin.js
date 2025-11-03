const {Bin} = require('../models/bin');
const express = require('express');
const router = express.Router();
const auth = require('../helpers/jwt');

// name description mechanicname service available  locality address city mobile 

router.get(`/`,  async (req, res) =>{
    const binList = await Bin.find();

    if(!binList) {
        res.status(500).json({success: false})
    } 
    res.status(200).send(binList);
})



router.get(`/:id`, async (req, res) =>{
    const binList = await Bin.findById(req.params.id);

    if(!binList) {
        res.status(500).json({success: false})
    } 
    res.send(binList);
})


router.post('/',  async (req,res)=>{
    let bin = new Bin({
        adminemail: req.body.adminemail,
        area: req.body.area,
        locality: req.body.locality,
        landmark: req.body.landmark,
        city: req.body.city,
        loadtype: req.body.loadtype,
        driveremail: req.body.driveremail,
        cycleperiod: req.body.cycleperiod,
        bestroute: req.body.bestroute
        //mobile: req.body.mobile,
        //status: req.body.status
    })
    bin = await bin.save();

    if(!bin)
    return res.status(400).send('the Bin cannot be created!')
    res.send(bin);
    
})



router.delete('/:id', auth, (req, res)=>{
    Bin.findByIdAndRemove(req.params.id).then(bin =>{
        if(bin) {
            return res.status(200).json({success: true, message: 'the bin is deleted!'})
        } else {
            return res.status(404).json({success: false , message: "bin not found!"})
        }
    }).catch(err=>{
       return res.status(500).json({success: false, error: err}) 
    })
})



router.put('/:id',async (req, res)=> {
    const bin = await Bin.findByIdAndUpdate(
        req.params.id,
        {  
            adminemail: req.body.adminemail,
            area: req.body.area,
            locality: req.body.locality,
            landmark: req.body.landmark,
            city: req.body.city,
            loadtype: req.body.loadtype,
            driveremail: req.body.driveremail,
            cycleperiod: req.body.cycleperiod,
            bestroute: req.body.bestroute
        },
        { new: true}
    )

    if(!bin)
    return res.status(400).send('the Bin cannot be created!')

    res.send(bin);
})




router.put('/map/:id',async (req, res)=> {
    const bin = await Bin.findByIdAndUpdate(
        req.params.id,
        {        
            lat: req.body.lat,
            long: req.body.long
        },
        { new: true}
    )

    if(!bin)
    return res.status(400).send('the Bin cannot be created!')

    res.send(bin);
})



router.put('/status/:id', auth, async (req, res)=> {
    const bin = await Bin.findByIdAndUpdate(
        req.params.id,
        {        
            status: req.body.status
        },
        { new: true}
    )

    if(!bin)
    return res.status(400).send('the bin cannot be created!')

    res.send(bin);
})


module.exports =router;