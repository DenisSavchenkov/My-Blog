import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Registration
export const registration = async (req, res) => {
  try {
    const { username, password } = req.body;

    const isUser = await User.findOne({ username });
    if (isUser) {
      return res.json({ message: 'Такой пользователь уже существует' });
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const user = new User({
      username,
      password: hash,
    });

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: '30d',
    });

    await user.save();

    res.json({
      user,
      token,
      message: 'Регистрация прошла успешно',
    });
  } catch (error) {
    res.json({ message: 'Ошибка при создании пользователя' });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.json({ message: 'Неверный логин или пароль' });
    }

    const isCorrectPassword = await bcrypt.compare(password, user.password);

    if (!isCorrectPassword) {
      return res.json({ message: 'Неверный логин или пароль' });
    }

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: '30d',
    });

    res.json({ user, token, message: 'Вы успешно вошли' });
  } catch (error) {
    res.json({ message: 'Ошибка при авторизации' });
  }
};

// Get me
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.json({ message: 'Такого пользователя не существует' });
    }

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: '30d',
    });

    res.json({ user, token });
  } catch (error) {
    res.json({ message: 'Нет доступа' });
  }
};
