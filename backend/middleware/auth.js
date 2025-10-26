const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  // 1. Extrair o token do header
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  const token = authorization.replace('Bearer ', '');

  try {
    // 2. Verificar e decodificar o token
    // Usar variável de ambiente para a chave secreta
    const secretKey = process.env.NODE_ENV === 'production'
      ? process.env.JWT_SECRET
      : 'dev-secret-key';

    const payload = jwt.verify(token, secretKey);

    // 3. Adicionar todo o payload ao req.user
    req.user = payload;

    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido' });
  }
};

module.exports = auth;