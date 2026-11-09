const {Bin} = require('../models/bin');
const {Driver} = require('../models/driver');
const express = require('express');
const router = express.Router();
const auth = require('../helpers/jwt');

const adminOnly = (req, res, next) => req.user?.isAdmin
    ? next()
    : res.status(403).json({ message: 'Admin access required.' });

// name description mechanicname service available  locality address city mobile 

router.get(`/`,  async (req, res) =>{
    const binList = await Bin.find();

    if(!binList) {
        res.status(500).json({success: false})
    } 
    res.status(200).send(binList);
})



router.get('/assigned', auth, async (req, res) => {
    if (req.user?.isAdmin) return res.json(await Bin.find());
    if (!req.user?.driveremail) return res.status(403).json({ message: 'Driver access required.' });
    return res.json(await Bin.find({ driveremail: req.user.driveremail }));
})

router.get(`/:id`, async (req, res) =>{
    const binList = await Bin.findById(req.params.id);

    if(!binList) {
        res.status(500).json({success: false})
    } 
    res.send(binList);
})


router.post('/', auth, adminOnly, async (req,res)=>{
    if (!req.user.adminemail) return res.status(403).json({ message: 'Admin identity is missing. Please sign in again.' });
    const requiredFields = ['area', 'locality', 'landmark', 'city', 'loadtype', 'driveremail', 'cycleperiod', 'bestroute'];
    if (requiredFields.some((field) => !String(req.body[field] || '').trim())) {
        return res.status(400).json({ message: 'Complete all bin fields before submitting.' });
    }
    const driveremail = req.body.driveremail.trim().toLowerCase();
    try {
    if (!await Driver.findOne({ email: driveremail })) {
        return res.status(400).json({ message: 'The assigned driver account does not exist. Create the driver first.' });
    }
    let bin = new Bin({
        adminemail: req.user.adminemail,
        area: req.body.area,
        locality: req.body.locality,
        landmark: req.body.landmark,
        city: req.body.city,
        loadtype: req.body.loadtype,
        driveremail,
        cycleperiod: req.body.cycleperiod,
        bestroute: req.body.bestroute
        //mobile: req.body.mobile,
        //status: req.body.status
    })
    bin = await bin.save();

    if(!bin)
    return res.status(400).send('the Bin cannot be created!')
    res.status(201).send(bin);
    } catch (error) {
        console.error('Bin creation failed:', error.message);
        return res.status(400).json({ message: 'Could not create the bin. Check all fields and assigned driver email.' });
    }
    
})



router.delete('/:id', auth, adminOnly, (req, res)=>{
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



router.put('/:id', auth, adminOnly, async (req, res)=> {
    const requiredFields = ['area', 'locality', 'landmark', 'city', 'loadtype', 'driveremail', 'cycleperiod', 'bestroute'];
    if (requiredFields.some((field) => !String(req.body[field] || '').trim())) {
        return res.status(400).json({ message: 'Complete all bin fields before saving.' });
    }
    try {
    const driveremail = req.body.driveremail.trim().toLowerCase();
    if (!await Driver.findOne({ email: driveremail })) {
        return res.status(400).json({ message: 'The assigned driver account does not exist.' });
    }
    const bin = await Bin.findByIdAndUpdate(
        req.params.id,
        {  
            adminemail: req.user.adminemail,
            area: req.body.area,
            locality: req.body.locality,
            landmark: req.body.landmark,
            city: req.body.city,
            loadtype: req.body.loadtype,
            driveremail,
            cycleperiod: req.body.cycleperiod,
            bestroute: req.body.bestroute
        },
        { new: true, runValidators: true}
    )

    if(!bin)
    return res.status(400).send('the Bin cannot be created!')

    res.send(bin);
    } catch (error) {
        console.error('Bin update failed:', error.message);
        return res.status(400).json({ message: 'Could not update the bin. Check all fields and assigned driver email.' });
    }
})




router.put('/map/:id', auth, async (req, res)=> {
    const existingBin = await Bin.findById(req.params.id);
    if (!existingBin) return res.status(404).json({ message: 'Bin not found.' });
    if (!req.user?.isAdmin && existingBin.driveremail !== req.user?.driveremail) {
        return res.status(403).json({ message: 'Access denied.' });
    }
    const bin = await Bin.findByIdAndUpdate(
        req.params.id,
        {        
            lat: req.body.lat,
            long: req.body.long
        },
        { new: true, runValidators: true}
    )

    if(!bin)
    return res.status(400).send('the Bin cannot be created!')

    res.send(bin);
})



router.put('/status/:id', auth, async (req, res)=> {
    const bin = await Bin.findById(req.params.id);
    if (!bin) return res.status(404).json({ message: 'Bin not found.' });
    if (!req.user?.isAdmin && !req.user?.driveremail) {
        return res.status(403).json({ message: 'Access denied.' });
    }
    if (!req.user?.isAdmin && bin.driveremail !== req.user.driveremail) return res.status(403).json({ message: 'Access denied.' });
    const updatedBin = await Bin.findByIdAndUpdate(
        req.params.id,
        {        
            status: req.body.status
        },
        { new: true}
    )

    if(!updatedBin)
    return res.status(400).send('the bin cannot be created!')

    res.send(updatedBin);
})


module.exports =router;
