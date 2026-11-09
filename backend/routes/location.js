const {Location} = require('../models/location');
const express = require('express');
const router = express.Router();
const auth = require('../helpers/jwt');

// vendoremail  useremail  complaint mobile lat long status

router.get(`/`, auth, async (req, res) =>{
    const locationList = await Location.find();

    if(!locationList) {
        res.status(500).json({success: false})
    } 
    res.status(200).send(locationList);
})


    
router.get(`/:id`, auth, async (req, res) =>{
    const locationList = await Location.findById(req.params.id);
    if(!locationList) {
        res.status(500).json({success: false})
    } 
    res.send(locationList);
})

router.post('/', auth, async (req,res)=>{
    if (!req.user?.useremail || req.user.useremail !== req.body.useremail) {
        return res.status(403).json({ message: 'Access denied.' });
    }
    let location = new Location({
        vendoremail: req.body.vendoremail,
        useremail: req.body.useremail,
        complaint: req.body.complaint,
        mobile: req.body.mobile,
        lat: req.body.lat,
        long: req.body.long
    })
    location = await location.save();

    if(!location)
    return res.status(400).send('the location cannot be created!')
    res.send(location);
    
})




router.put('/:id', auth, async (req, res)=> {
    if (!req.user?.isAdmin && !req.user?.driveremail) return res.status(403).json({ message: 'Access denied.' });
    const location = await Location.findByIdAndUpdate(
        req.params.id,
        {        
            status: req.body.status
        },
        { new: true}
    )

    if(!location)
    return res.status(400).send('the location cannot be created!')

    res.send(location);
})



router.put('/map/:id', auth, async (req, res)=> {
    const location = await Location.findByIdAndUpdate(
        req.params.id,
        {        
            lat: req.body.lat,
            long: req.body.long
        },
        { new: true}
    )
    if(!location)
    return res.status(400).send('the business cannot be created!')

    res.send(location);
})


module.exports =router;
