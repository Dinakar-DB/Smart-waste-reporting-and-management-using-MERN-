const {User} = require('../models/user');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../helpers/jwt');

router.get(`/`, auth, async (req, res) =>{
    if (!req.user?.isAdmin) return res.status(403).json({ message: 'Admin access required.' });
    const userList = await User.find().select('-passwordHash -question1 -question2');
    if(!userList) {
        res.status(500).json({success: false})
    } 
    res.send(userList);
})

router.get('/me', auth, async (req, res) => {
    if (!req.user?.useremail) return res.status(403).json({ message: 'User access required.' });
    const user = await User.findOne({ email: req.user.useremail }).select('-passwordHash -question1 -question2');
    if (!user) return res.status(404).json({ message: 'User not found.' });
    return res.json(user);
});



router.get(`/:id`, auth, async (req, res) =>{
    const userList = await User.findById(req.params.id).select('-passwordHash -question1 -question2');
    if(!userList) {
        return res.status(404).json({success: false})
    } 
    if (!req.user?.isAdmin && req.user?.useremail !== userList.email) return res.status(403).json({ message: 'Access denied.' });
    res.send(userList);
})

router.post(`/`, async (req, res) =>{
    if (!req.body.passwordHash || !req.body.email) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }
    const email = req.body.email.trim().toLowerCase();
    if (await User.findOne({ email })) {
        return res.status(409).json({ message: 'An account with this email already exists.' });
    }
    let user = new User({
        name: req.body.name,
        email,
        passwordHash: bcrypt.hashSync(req.body.passwordHash, 10),
        phone: req.body.phone,
        isAdmin: false,
        city: req.body.city,
        question1: req.body.question1,
        question2: req.body.question2,
    })
    user = await user.save();
    if(!user) 
    return res.status(500).send('The product cannot be created')

    res.status(201).json({ id: user.id, name: user.name, email: user.email });
})



router.post('/login', async (req,res) => {
  try {
    const user = await User.findOne({email: (req.body.email || '').trim().toLowerCase()});
    const secret = process.env.secret;
    if (!req.body.password) return res.status(400).json({ message: 'Email and password are required.' });
    if (!secret) return res.status(500).json({ message: 'Server authentication is not configured.' });
    if (!user || !bcrypt.compareSync(req.body.password, user.passwordHash)) {
      return res.status(401).json({ message: 'Invalid user email or password.' });
    }

        const token = jwt.sign(
            {
                useremail: user.email,
                isAdmin: user.isAdmin
            },
            secret,
            {expiresIn : '1d'}
        )
       
        return res.status(200).send({user: user.email , token: token});
  } catch (error) {
    console.error('User login failed:', error.message);
    return res.status(503).json({ message: 'User sign-in is temporarily unavailable. Check the database connection and try again.' });
    }
})



router.put('/:id', auth, async (req, res)=> {

    const userExist = await User.findById(req.params.id);
    if (!userExist) return res.status(404).json({ message: 'User not found.' });
    if (!req.user?.isAdmin && req.user?.useremail !== userExist.email) return res.status(403).json({ message: 'Access denied.' });
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

    res.json({ id: user.id, name: user.name, email: user.email, phone: user.phone, city: user.city });
})


router.post('/reset_password', async (req, res) => {
    const { question1, question2, newPassword } = req.body;
  
    try {
      // Find the user by email
      if (!req.body.email || !newPassword) return res.status(400).json({ message: 'Email and new password are required.' });
      const user = await User.findOne({ email: req.body.email.trim().toLowerCase() });
  
      // Check if the user exists
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      // Check if security questions match
      const normalizeAnswer = (answer) => (answer || '').trim().toLowerCase();
      if (normalizeAnswer(user.question1) !== normalizeAnswer(question1) || normalizeAnswer(user.question2) !== normalizeAnswer(question2)) {
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
