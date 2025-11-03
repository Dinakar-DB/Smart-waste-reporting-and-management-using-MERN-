const {User} = require('../models/user');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.get(`/`, async (req, res) =>{
    const userList = await User.find().select('-passwordHash');
    if(!userList) {
        res.status(500).json({success: false})
    } 
    res.send(userList);
})



router.get(`/:id`, async (req, res) =>{
    const userList = await User.findById(req.params.id);
    if(!userList) {
        res.status(500).json({success: false})
    } 
    res.send(userList);
})

router.post(`/`, async (req, res) =>{
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        passwordHash: bcrypt.hashSync(req.body.passwordHash, 10),
        phone: req.body.phone,
        isAdmin: req.body.isAdmin,
        city: req.body.city,
        question1: req.body.question1,
        question2: req.body.question2,
    })
    user = await user.save();
    if(!user) 
    return res.status(500).send('The product cannot be created')

    res.send(user);
})



router.post('/login', async (req,res) => {
    const user = await User.findOne({email: req.body.email})
    const secret = process.env.secret;
    if(!user) {
        return res.status(400).send('The user not found');
    }

    if(user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
        const token = jwt.sign(
            {
                useremail: user.email,
                isAdmin: user.isAdmin
            },
            secret,
            {expiresIn : '1d'}
        )
       
        res.status(200).send({user: user.email , token: token}) 
    } else {
       res.status(400).send('password is wrong!');
    }

    
})



router.put('/:id',async (req, res)=> {

    const userExist = await User.findById(req.params.id);
    let newPassword
    if(req.body.password) {
        newPassword = bcrypt.hashSync(req.body.password, 10)
    } else {
        newPassword = userExist.passwordHash;
    }

    const user = await User.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            email: req.body.email,
            passwordHash: newPassword,
            phone: req.body.phone,
            city: req.body.city
            
        },
        { new: true}
    )

    if(!user)
    return res.status(400).send('the user cannot be created!')

    res.send(user);
})


router.post('/reset_password', async (req, res) => {
    const { question1, question2, newPassword } = req.body;
  
    try {
      // Find the user by email
      const user = await User.findOne({ email: req.body.email });
  
      // Check if the user exists
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      // Check if security questions match
      if (user.question1 !== question1 ||  user.question2 !== question2) {
        return res.status(400).json({ error: 'Security questions do not match' });
      }
            // Hash the new password
            
            const hashedPassword = bcrypt.hashSync(newPassword, 10);
            
            // Update the user's password
            user.passwordHash = hashedPassword;

            // Save the updated user
            await user.save();  
            res.status(200).json({ message: 'Password reset successful' });
            //res.send(user);


    } catch (error) {
      console.error('Error resetting password:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });




module.exports =router;