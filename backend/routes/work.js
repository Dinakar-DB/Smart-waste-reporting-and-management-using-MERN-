
const {Work} = require('../models/work');
const express = require('express');
const router = express.Router();
const auth = require('../helpers/jwt');

// name description mechanicname service available  locality address city mobile 

router.get(`/`, auth, async (req, res) =>{
    let workList;
    if (req.user?.isAdmin) workList = await Work.find();
    else if (req.user?.driveremail) workList = await Work.find({ driveremail: req.user.driveremail });
    else return res.status(403).json({ message: 'Access denied.' });

    if(!workList) {
        res.status(500).json({success: false})
    } 
    res.status(200).send(workList);
})



router.get(`/:id`, auth, async (req, res) =>{
    const workList = await Work.findById(req.params.id);

    if(!workList) {
        return res.status(404).json({success: false})
    } 
    if (!req.user?.isAdmin && req.user?.driveremail !== workList.driveremail) return res.status(403).json({ message: 'Access denied.' });
    res.send(workList);
})


router.post('/', auth, async (req,res)=>{
    const driveremail = req.user?.isAdmin ? req.body.driveremail : req.user?.driveremail;
    if (!driveremail || !req.body.binarea?.trim()) {
        return res.status(400).json({ message: 'Driver and bin area are required.' });
    }
    let work = new Work({
        binarea: req.body.binarea.trim(),
        driveremail,
        status: req.body.status
    })
    work = await work.save();

    if(!work)
    return res.status(400).send('the work cannot be created!')
    res.status(201).send(work);
    
})


router.put('/status/:id', auth, async (req, res)=> {
    const isAdmin = Boolean(req.user?.isAdmin);
    const isAssignedDriver = req.user?.driveremail &&
        (await Work.findById(req.params.id))?.driveremail === req.user.driveremail;
    if (!isAdmin && !isAssignedDriver) return res.status(403).json({ message: 'Access denied.' });
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
