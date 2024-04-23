const User = require('../model/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
	try {
		const { name, email, password } = req.body;
		if (!name) {
			return res.status(400).json({ message: 'Name is required' });
		}
		if (!password) {
			return res.status(400).json({ message: 'Password is required' });
		}

		let existingUser;
		if (email) {
			existingUser = await User.findOne({ email });
			if (existingUser) {
				return res.status(400).json({ message: 'Email already exists' });
			}
		}
		if (name) {
			existingUser = await User.findOne({ name });
			if (existingUser) {
				return res.status(400).json({ message: 'Username already exists' });
			}
		}

		const hashPassword = await bcrypt.hash(password, 10);
		const user = await User.create({
			name,
			email,
			password: hashPassword,
		});

		const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
			expiresIn: '1h',
		});

		const { password: userPassword, ...others } = user._doc;
		res.status(200).json({ data: others, token });
	} catch (error) {
		res.status(500).json({ message: 'Something went wrong' });
		console.log(error);
	}
};

const google = async (req, res) => {
	try {
		const { username, email, photo } = req.body;

		if (!email) {
			return res.status(400).json({ message: 'Email is required' });
		}

		let existingUser = await User.findOne({ email });

		if (!existingUser) {
			const generatedUsername = username
				? username.split(' ').join('').toLowerCase() +
				  Math.floor(Math.random() * 10000).toString()
				: null;

			const generatedPassword =
				Math.random().toString(36).slice(-8) +
				Math.random().toString(36).slice(-8);

			const hashPassword = bcrypt.hashSync(generatedPassword, 10);

			const newUser = await User.create({
				name: generatedUsername,
				email,
				password: hashPassword,
				profilePicture: photo,
			});

			const token = jwt.sign(
				{
					id: newUser._id,
					name: newUser.name,
				},
				process.env.JWT_SECRET,
				{
					expiresIn: '1h',
				}
			);

			const { password: hashedPassword, ...userData } = newUser._doc;
			return res.status(200).json({ data: userData, token });
		}

		const token = jwt.sign(
			{
				id: existingUser._id,
				name: existingUser.name,
			},
			process.env.JWT_SECRET,
			{
				expiresIn: '1h',
			}
		);

		const { password: hashedPassword, ...userData } = existingUser._doc;

		return res.status(200).json({ data: userData, token });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: 'Something went wrong' });
	}
};

const loginUser = async (req, res) => {
	try {
		const { username, email, password } = req.body;
		if (!username && !email) {
			return res.status(400).json({ message: 'Username or email is required' });
		}
		if (!password) {
			return res.status(400).json({ message: 'Password is required' });
		}

		let existingUser;
		if (email) {
			existingUser = await User.findOne({ email });
		} else {
			existingUser = await User.findOne({ name: username });
		}

		if (!existingUser) {
			return res.status(400).json({ message: 'User does not exist' });
		}

		const validPassword = await bcrypt.compare(password, existingUser.password);
		if (!validPassword) {
			return res.status(400).json({ message: 'Invalid password' });
		}

		const { password: userPassword, ...others } = existingUser._doc;

		const token = jwt.sign(
			{
				id: existingUser._id,
				name: existingUser.name,
			},
			process.env.JWT_SECRET,
			{
				expiresIn: '1h',
			}
		);

		res.status(200).json({ data: others, token });
	} catch (error) {
		res.status(500).json({ message: 'Something went wrong' });
		console.log(error);
	}
};

const getUser = async (req, res) => {
	try {
		const user = await User.find({});
		res.status(200).json(user);
	} catch (error) {
		console.log(error);
		res.status(500).json(error);
	}
};

const addOrRemoveMovieToWatchlist = async (req, res) => {
	try {
		const { id } = req.params;
		const { movie, action } = req.body;

    // console.log(action)

		const user = await User.findById(id);

		if (!user) {
			return res.status(404).json({ error: 'There is no such user' });
		}
		if (action === 'add') {
      if (user.watchlist.some(item => item.mal_id === movie.mal_id)) return;
			user.watchlist.push(movie);
		} else if (action === 'remove') {
			user.watchlist = user.watchlist.filter((item) => item.mal_id !== movie.mal_id);
		}
		await user.save();

		res.status(200).json(user);
	} catch (error) {
		console.log(error);
		res.status(500).json(error);
	}
};

const updateUser = async (req, res) => {
	const { id } = req.params;
	// if (req.user.id !== req.params.id) {
	//   return res
	//     .status(401)
	//     .json({ message: "You can update only your account" });
	// }
	try {
		let updatedData = req.body;
		if (updatedData.password) {
			updatedData.password = await bcrypt.hash(updatedData.password, 10);
		}
		const updatedUser = await User.findByIdAndUpdate(
			id,
			{
				$set: {
					name: updatedData.name,
					email: updatedData.email,
					password: updatedData.password,
					profilePicture: updatedData.profilePicture,
				},
			},
			{ new: true }
		);

		if (!updatedUser) {
			return res.status(404).json({ error: 'There is no such user' });
		}

		const { password, ...others } = updatedUser._doc;
		res.status(200).json(others);
	} catch (error) {
		console.log(error);
		res.status(500).json(error);
	}
};

const deleteUser = async (req, res) => {
	const { id } = req.params;
	try {
		const user = await User.findByIdAndDelete(id);
		if (!user) {
			return res.status(404).json({ error: 'There is no such user' });
		}
		res.status(200).json({ message: 'User deleted successfully' });
	} catch (error) {
		console.log(error);
		res.status(500).json(error);
	}
};

module.exports = {
	registerUser,
	loginUser,
	getUser,
	updateUser,
	deleteUser,
	google,
	addOrRemoveMovieToWatchlist,
};
