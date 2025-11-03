const {Driver} = require('../models/driver');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.get(`/`, async (req, res) =>{
    const driverList = await Driver.find().select('-passwordHash');
    if(!driverList) {
        res.status(500).json({success: false})
    } 
    res.send(driverList);
})

router.get(`/:id`, async (req, res) =>{
    const driverList = await Driver.findById(req.params.id);

    if(!driverList) {
        res.status(500).json({success: false})
    } 
    res.send(driverList);
})


router.post(`/`, async (req, res) =>{
    let driver = new Driver({
        adminemail:req.body.adminemail,
        name: req.body.name,
        email: req.body.email,
        passwordHash: bcrypt.hashSync(req.body.passwordHash, 10),
        mobile: req.body.mobile,
        address: req.body.address,
        area: req.body.area,
        aadharno: req.body.aadharno
    })
    driver = await driver.save();
    if(!driver) 
    return res.status(500).send('The Driver cannot be created')

    res.send(driver);
})



router.post('/login', async (req,res) => {
    const driver = await Driver.findOne({email: req.body.email})
    const secret = process.env.secret;
    if(!driver) {
        return res.status(400).send('The driver not found');
    }

    if(driver && bcrypt.compareSync(req.body.password, driver.passwordHash)) {
        const token = jwt.sign(
            {
                driveremail: driver.email
            },
            secret,
            {expiresIn : '1d'}
        )
       
        res.status(200).send({driver: driver.email , token: token}) 
    } else {
       res.status(400).send('password is wrong!');
    }

    
})

router.put('/:id',async (req, res)=> {

    const driverExist = await Driver.findById(req.params.id);
    let newPassword
    if(req.body.password) {
        newPassword = bcrypt.hashSync(req.body.password, 10)
    } else {
        newPassword = driverExist.passwordHash;
    }

    const driver = await Driver.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            email: req.body.email,
            passwordHash: newPassword,
            mobile: req.body.mobile,
            address: req.body.address,
            area: req.body.area,
            aadharno: req.body.aadharno,
        },
        { new: true}
    )

    if(!driver)
    return res.status(400).send('the driver cannot be created!')

    res.send(driver);
})


router.delete('/:id', (req, res)=>{
    Driver.findByIdAndRemove(req.params.id).then(driver =>{
        if(driver) {
            return res.status(200).json({success: true, message: 'the driver is deleted!'})
        } else {
            return res.status(404).json({success: false , message: "driver not found!"})
        }
    }).catch(err=>{
       return res.status(500).json({success: false, error: err}) 
    })
})

module.exports =router;