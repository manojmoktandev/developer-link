const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/Users');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcyrpt = require('bcryptjs');
const { check, validationResult } = require('express-validator');


// @route       GET api/auth
//@desc         Test route
//@access       Public
router.get('/', auth, async(req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
        
    } catch (error) {
        res.status(500).send('Server Errror');
    }
});

// @route       POST api/auth
//@desc         Authentication user and get token
//@access       Public
router.post('/', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()  
], async(req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, password } = req.body;
        try {
            //see if user exists
            let user = await User.findOne({ email });
            if (!user) {
                return res.json({msg:'Invalid User Credentials',token:null});
            }

            //compare password
            const isMatch = await bcyrpt.compare(password, user.password);
            if (!isMatch) {
                return res.json({msg:'Invalid User Credentials',token:null});
            }

            // Return jsonwebtoken
            const payload = {
                user: {
                    id:user.id
                }
            }
            jwt.sign(payload, config.get('jwtSecret'),
                {expiresIn:360000},
                (err, token) => {
                    if (err) throw err;
                    res.json({
                        msg: 'authorized user',token:token
                    });
                }
            );
            //res.send('Users Registered');
        }
        catch (err) {
            console.log(err.message);
            res.status(500).send('Server error');

        }
});
module.exports = router;