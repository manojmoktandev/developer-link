const express = require('express');
const request = require('request');
const axios = require('axios');
const config = require('config'); 
const router = express.Router();
const auth = require('../../middleware/auth');

const { check, validationResult } = require('express-validator');
// bring in normalize to give us a proper url, regardless of what user entered
const normalize = require('normalize-url');

const Profile = require('../../models/Profile');
const Post = require('../../models/Post');
const User = require('../../models/Users');
const checkObjectId = require('../../middleware/checkObjectId');

// @route       GET api/profile/me
//@desc         Get Current users profile
//@access       Private
router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({
            user: req.user.id
        }).populate('user', ['name', 'avatar']);
        if (!profile) {
            return res.status(400).json({ msg: 'There is no profile for this user' });
        }
        res.json(profile);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
        
    }
    //res.send('Profile route');
});
// @route       POST api/profile
//@desc         Create users profile
//@access       Private
router.post('/', [
    auth,
    [
        check('status', 'Status is required')
            .not()
            .isEmpty(),
        check('skills', 'Skills is required')
            .not()
            .isEmpty()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ msg: errors.array() });
        }

        const {
            company,
            website,
            location,
            bio,
            status,
            githubusername,
            skills,
            youtube,
            facebook,
            twitter,
            instagram,
            linkedin
        } = req.body;

        const profileFields = {
            user: req.user.id,
            company,
            location,
            website: website && website !== '' ? normalize(website, { forceHttps: true }) : '',
            bio,
            skills: Array.isArray(skills) ? skills : skills.split(',').map((skills) =>  skills.trim()),
            status,
            githubusername
        };

        //Build social object and  add to  profileFields
        const socialfields = { youtube, twitter, instagram, linkedin, facebook };

        for (const [key, value] of Object.entries(socialfields)) {
            if (value && value.length > 0) {
                socialfields[key] = normalize(value, { forceHttps: true });
            }
        }
        profileFields.social = socialfields;

        try {
            //update profile if  found
            let profile = await Profile.findOne({ user: req.user.id });
            if (profile) {
                 //using upsert option (creates  new doc if no match is found):
                profile = await Profile.findOneAndUpdate(
                    { user: req.user.id },
                    { $set: profileFields },
                    { new: true, upsert: true}
                );     
                res.json(profile);
            }
            if (!profile) {
                profile = new Profile(profileFields);
                await profile.save();
                res.json(profile);
            }
        } catch (error) {
            console.log(errors);
            res.status(500).send('Server Error');
        }
    }
]);

//@route    GET api/profile
//@desc     GET all profile
//@access   Public
router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar']);
        res.json(profiles);
        
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

//@route    GET api/profile/user/:user_id
//@desc     GET profile by user id
//@access   Public
router.get('/user/:user_id',checkObjectId('id'), async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'avatar']);
        if (!profile) {
           return res.status(400).json({ msg: 'Profile not found' });
        }
        res.json(profile);
        
    } catch (err) {
        console.error(err.message);
        if (err.kind == 'ObjectId') {
            return res.status(400).json({ msg: 'Profile not found' });
        }
        res.status(500).send('Server Error');
    }
});
//@route    DELETE api/profile
//@desc     Delete profile,user and post
//@access   Private
router.delete('/',auth, async (req, res) => {
    try {
        //Remove user posts:
        await Post.deleteMany({ user: req.user.id });
        //Remove profile
        await Profile.findOneAndRemove({ user: req.user.id });
        await User.findOneAndRemove({ _id: req.user.id });
        res.json({ msg: 'User Deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//@route    PUT api/profile
//@desc    Add profile experiences
//@access   Private
router.put('/experience',
    [auth,
        [
            check('title', 'Title is required').not().isEmpty(),
            check('company', 'Company is required').not().isEmpty(),
            check('from', 'From is required').not().isEmpty(),
        ]
    ],
    async (req, res) => {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ error: error.array() });
        }
        const { title, company, location, from, to, current, description } = req.body;
        const newExp = {
            title, company, location, from, to, current, description
        }

        try {
            var profile = await Profile.findOne({ user: req.user.id });
            if (profile) {
                profile.experience.unshift(newExp);
                await profile.save();
                return res.send(profile);
            }
            else {
                res.status(400).json({ 'msg': 'profile is not found' });
            }
            
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server Error');
            
        }
    }
);

//@route    DELETE api/profile/experience/:exp_id
//@desc     Delete exprience from profile 
//@access   Private

router.delete('/experience/:exp_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });
        // Get remove index
        const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id);

        profile.experience.splice(removeIndex, 1);

        await profile.save();

        res.json(profile);
       
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});
    
//@route PUT api/profile/education
//@route Add profile education
//@route Private
router.put('/education',
    [
        auth, 
        [
            check('school', 'School is required').not().isEmpty(),
            check('degree', 'Degree is required').not().isEmpty(),
            check('fieldofstudy', 'Field of study is required').not().isEmpty(),
            check('from', 'From date is required and needs to be from the past')
            .not()
            .isEmpty()
            .custom((value, { req }) => (req.body.to ? value < req.body.to : true))
        ]
],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const {
            school,
            degree,
            fieldofstudy,
            from,
            to,
            current,
            description
        } = req.body;

        const newEdu = {
            school,
            degree,
            fieldofstudy,
            from,
            to,
            current,
            description
            };
        try {
            const profile = await Profile.findOne({ user: req.user.id });

            profile.education.unshift(newEdu);

            await profile.save();

            res.json(profile);
            
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);


// @route    DELETE api/profile/education/:edu_id
// @desc     Delete education from profile
// @access   Private
router.delete('/education/:edu_id', auth, async (req, res) => {
    try {
        const foundprofile = await Profile.findOne({ user: req.user.id });
        if (foundprofile) {
            foundprofile.education = foundprofile.education.filter((edu) => edu._id.toString() !== req.params.edu_id);
            await foundprofile.save();
            return res.status(200).send(foundprofile);    
        }
        else {
            return res.status(400).json({ msg: 'Education profile is not found' });
        }
        
        
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: 'Server error' });
    }
});

//@route Get api/profile/github/:username
//@desc get all repos from github
//@access Public
router.get('/github/:username', async (req, res) => {
    try {
        const options = {
            uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${config.get('gitClientId')}&client_secret=${config.get('githubSecret')}`,
            method: 'GET',
            headers: { 'user-agent': 'node.js' }
        };
        request(options, (error, response, body) => {
            if (error) {
                console.log(error);
            }
            if (response.statusCode !== 200) {
                return res.status(401).json({ 'msg': 'Github profile is not found' });
            }
            res.json(JSON.parse(body));
        })
        // const uri = encodeURI(
        //     `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc`
        //   );
        //   const headers = {
        //     'user-agent': 'node.js',
        //     Authorization: `token ${config.get('githubToken')}`
        //   };
      
        // const gitHubResponse = await axios.get(uri, { headers });
        //   return res.json(gitHubResponse.data);
        
    } catch (err) {
        console.error(err.message);
    return res.status(404).json({ msg: 'No Github profile found' });
    }
})

module.exports = router;