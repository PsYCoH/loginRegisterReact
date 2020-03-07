const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Get Models
const User = require('../../models/User');

// @route   GET /api/users
// @desc    Get all users
// @access  Public
exports.getUsers = async (req, res, next) => {
    try {
        const users = await User.find();

        return res.status(200).json({
            success: true,
            count: users.length,
            data: users
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: 'Server Error: Cannot GET the Users.'
        });
    }
}

// @route   POST /api/users
// @desc    Register a new users
// @access  Public
exports.regUser = (req, res) => {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields.' });
    }

    // Check for existing User
    User.findOne({ email })
        .then(user => {
            if (user) return res.status(400).json({ msg: 'User already exists.' });

            const newUser = new User({
                name,
                email,
                password
            });

            // Create SALT & HASH
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user => {
                            jwt.sign(
                                { id: user.id },
                                process.env.JWT_SECRET,
                                { expiresIn: 2400 },
                                (err, token) => {
                                    if (err) throw err;
                                    res.json({
                                        token,
                                        user: {
                                            id: user.id,
                                            name: user.name,
                                            email: user.email
                                        }
                                    });
                                }
                            )
                        });
                })
            })
        })
}

