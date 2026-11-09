const {Driver} = require('../models/driver');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../helpers/jwt');
const adminOnly = (req, res, next) => req.user?.isAdmin
    ? next()
    : res.status(403).json({ message: 'Admin access required.' });

router.get(`/`, auth, async (req, res) =>{
    if (!req.user?.isAdmin) return res.status(403).json({ message: 'Admin access required.' });
    const driverList = await Driver.find().select('-passwordHash -aadharno');
    if(!driverList) {
        res.status(500).json({success: false})
    } 
    res.send(driverList);
})

router.get(`/:id`, auth, async (req, res) =>{
    const driverQuery = Driver.findById(req.params.id).select('-passwordHash');
    if (!req.user?.isAdmin) driverQuery.select('-aadharno');
    const driverList = await driverQuery;

    if(!driverList) {
        return res.status(404).json({success: false})
    } 
    if (!req.user?.isAdmin && req.user?.driveremail !== driverList.email) return res.status(403).json({ message: 'Access denied.' });
    res.send(driverList);
})


router.post(`/`, auth, adminOnly, async (req, res) =>{
    if (!req.body.passwordHash || !req.body.email) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }
    if (!req.user.adminemail) return res.status(403).json({ message: 'Admin identity is missing. Please sign in again.' });
    if (!req.body.name || !req.body.mobile || !req.body.aadharno) {
        return res.status(400).json({ message: 'Name, mobile number, and driver ID number are required.' });
    }
    try {
    const email = req.body.email.trim().toLowerCase();
    if (await Driver.findOne({ email })) {
        return res.status(409).json({ message: 'A driver with this email already exists.' });
    }
    let driver = new Driver({
        adminemail:req.user.adminemail,
        name: req.body.name,
        email,
        passwordHash: bcrypt.hashSync(req.body.passwordHash, 10),
        mobile: req.body.mobile,
        address: req.body.address,
        area: req.body.area,
        aadharno: req.body.aadharno
    })
    driver = await driver.save();
    if(!driver) 
    return res.status(500).send('The Driver cannot be created')

    res.status(201).json({ id: driver.id, email: driver.email, name: driver.name });
    } catch (error) {
        console.error('Driver creation failed:', error.message);
        return res.status(400).json({ message: 'Could not create the driver. Check all required fields.' });
    }
})



router.post('/login', async (req,res) => {
    try {
      const driver = await Driver.findOne({email: (req.body.email || '').trim().toLowerCase()});
      const secret = process.env.secret;
      if (!req.body.password) return res.status(400).json({ message: 'Email and password are required.' });
      if (!secret) return res.status(500).json({ message: 'Server authentication is not configured.' });
      if (!driver || !bcrypt.compareSync(req.body.password, driver.passwordHash)) {
        return res.status(401).json({ message: 'Invalid driver email or password.' });
      }

        const token = jwt.sign(
            {
                driveremail: driver.email
            },
            secret,
            {expiresIn : '1d'}
        )
       
        return res.status(200).send({driver: driver.email , token: token});
    } catch (error) {
        console.error('Driver login failed:', error.message);
        return res.status(503).json({ message: 'Driver sign-in is temporarily unavailable. Check the database connection and try again.' });
    }
})

router.put('/:id', auth, adminOnly, async (req, res)=> {

    const driverExist = await Driver.findById(req.params.id);
    if (!driverExist) return res.status(404).json({ message: 'Driver not found.' });
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
        { new: true, runValidators: true}
    )

    if(!driver)
    return res.status(400).send('the driver cannot be created!')

    res.json({ id: driver.id, email: driver.email, name: driver.name, mobile: driver.mobile, address: driver.address, area: driver.area });
})


router.delete('/:id', auth, adminOnly, (req, res)=>{
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
