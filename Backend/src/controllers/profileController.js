const User = require('../models/User');
const Restaurant = require('../models/Restaurant');

exports.getStudentProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming you have authentication middleware
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const profileData = {
      name: user.name,
      username: user.username,
      email: user.email,
      phone: user.phone,
      accountType: user.accountType
    };

    res.json(profileData);
  } catch (error) {
    console.error('Error fetching student profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getRestaurantProfile = async (req, res) => {
  try {
    const restaurantId = req.user.id; // Assuming you have authentication middleware
    const restaurant = await Restaurant.findById(restaurantId);
    
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    const profileData = {
      name: restaurant.name,
      username: restaurant.username,
      email: restaurant.email,
      phone: restaurant.phone,
      accountType: restaurant.accountType,
      logo: restaurant.logo
    };

    res.json(profileData);
  } catch (error) {
    console.error('Error fetching restaurant profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}; 