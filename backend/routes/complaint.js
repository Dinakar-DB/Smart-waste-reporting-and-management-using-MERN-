const {Complaint} = require('../models/complaint');
const express = require('express');
const router = express.Router();
const auth = require('../helpers/jwt');

// name description mechanicname service available  locality address city mobile 

router.get(`/`, auth, async (req, res) =>{
    let complaintList;
    if (req.user?.isAdmin || req.user?.driveremail) complaintList = await Complaint.find();
    else if (req.user?.useremail) complaintList = await Complaint.find({ useremail: req.user.useremail });
    else return res.status(403).json({ message: 'Access denied.' });

    if(!complaintList) {
        res.status(500).json({success: false})
    } 
    res.status(200).send(complaintList);
})



router.get(`/:id`, auth, async (req, res) =>{
    const complaintList = await Complaint.findById(req.params.id);

    if(!complaintList) {
        return res.status(404).json({success: false})
    } 
    if (!req.user?.isAdmin && !req.user?.driveremail && req.user?.useremail !== complaintList.useremail) {
        return res.status(403).json({ message: 'Access denied.' });
    }
    res.send(complaintList);
})


router.post('/', auth, async (req,res)=>{
    if (!req.user?.useremail) {
        return res.status(403).json({ message: 'Access denied.' });
    }
    if (!req.body.binarea?.trim() || !req.body.complaint?.trim()) {
        return res.status(400).json({ message: 'Bin area and complaint are required.' });
    }
    let complaint = new Complaint({
            binarea: req.body.binarea.trim(),
            useremail: req.user.useremail,
            complaint: req.body.complaint.trim()
            
    })
    complaint = await complaint.save();

    if(!complaint)
    return res.status(400).send('the complaint cannot be created!')
    res.status(201).send(complaint);
    
})




router.put('/:id', auth, async (req, res)=> {
    if (!req.user?.isAdmin) return res.status(403).json({ message: 'Admin access required.' });
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
