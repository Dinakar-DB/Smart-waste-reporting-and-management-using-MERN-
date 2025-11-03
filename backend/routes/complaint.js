const {Complaint} = require('../models/complaint');
const express = require('express');
const router = express.Router();
const auth = require('../helpers/jwt');

// name description mechanicname service available  locality address city mobile 

router.get(`/`,  async (req, res) =>{
    const complaintList = await Complaint.find();

    if(!complaintList) {
        res.status(500).json({success: false})
    } 
    res.status(200).send(complaintList);
})



router.get(`/:id`, async (req, res) =>{
    const complaintList = await Complaint.findById(req.params.id);

    if(!complaintList) {
        res.status(500).json({success: false})
    } 
    res.send(complaintList);
})


router.post('/',  async (req,res)=>{
    let complaint = new Complaint({
            binarea: req.body.binarea,
            useremail: req.body.useremail,
            complaint: req.body.complaint
            
    })
    complaint = await complaint.save();

    if(!complaint)
    return res.status(400).send('the complaint cannot be created!')
    res.send(complaint);
    
})




router.put('/:id', auth, async (req, res)=> {
    const complaint = await Complaint.findByIdAndUpdate(
        req.params.id,
        {        
            status: req.body.status
        },
        { new: true}
    )

    if(!complaint)
    return res.status(400).send('the complaint cannot be created!')

    res.send(complaint);
})




module.exports =router;