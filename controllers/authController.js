import User from '../models/user';

import catchAsyncErrors from '../middlewares/catchAsyncErrors';

/*--------------------------------------------------------------------------------------*/
// @desc    Register user
// @route   POST https://localhost:3000/api/auth/register
// @access  Public
const registerUser = catchAsyncErrors(async (req, res) => {
  const { name, email, password } = req.body;

  await User.create({
    name,
    email,
    password,
    avatar: { public_id: 'PUBLIC_ID', url: 'URL' },
  });

  res.status(201).json({ success: true, message: 'Registration successful!' });
});

export { registerUser };
