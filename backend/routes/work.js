
const {Work} = require('../models/work');
const express = require('express');
const router = express.Router();
const auth = require('../helpers/jwt');

// name description mechanicname service available  locality address city mobile 

router.get(`/`,  async (req, res) =>{
    const workList = await Work.find();

    if(!workList) {
        res.status(500).json({success: false})
    } 
    res.status(200).send(workList);
})



router.get(`/:id`, async (req, res) =>{
    const workList = await Work.findById(req.params.id);

    if(!workList) {
        res.status(500).json({success: false})
    } 
    res.send(workList);
})


router.post('/',  async (req,res)=>{
    let work = new Work({
        binarea: req.body.binarea,
        driveremail: req.body.driveremail,
        status: req.body.status
    })
    work = await work.save();

    if(!work)
    return res.status(400).send('the work cannot be created!')
    res.send(work);
    
})


router.put('/status/:id', auth, async (req, res)=> {
    const work = await Work.findByIdAndUpdate(
        req.params.id,
        {        
            status: req.body.status
        },
        { new: true}
    )

    if(!work)
    return res.status(400).send('the work cannot be created!')

    res.send(work);
})


module.exports =router;