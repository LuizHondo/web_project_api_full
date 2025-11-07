import jwt from 'jsonwebtoken';const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token not provided' });
  }

  const token = authorization.replace('Bearer ', '');

  try {
    const secretKey = process.env.JWT_SECRET;
    if (!secretKey) {
    throw new Error('JWT secret key is not defined');
    }
    const payload = jwt.verify(token, secretKey);

    req.user = payload;

    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

export default auth;
