const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcyrpt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const Users = require('../../models/Users');

// @route       GET api/users
//@desc         Test route
//@access       Public
router.post('/', [
    check('name', 'Name is required')
        .not()
        .isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })  
], async(req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { name, email, password } = req.body;
        try {
            //see if user exists
            let user = await Users.findOne({ email });
            if (user) {
                return res.status(400).json({ errors });
                // return res.json({msg:'User already exists',success:false});
            }
            //Get user gravatar
            const avatar = gravatar.url(email, {
                s: "200",//size
                r: "pg",//radiant
                d:"mm"
            })

            user = new Users({
                name,
                email,
                avatar,
                password
            });

            //Encrypt Password
            const salt = await bcyrpt.genSalt(10);
            user.password = await bcyrpt.hash(password, salt);
            await user.save();
            
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
                    res.json({ token ,msg:'User Registration Success',success:true});
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