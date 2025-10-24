const jwt = require('jsonwebtoken');
module.exports = (req,res,next) => {
  const {authorization} = req.headers;
  if(!authorization || !authorization.startsWith('Bearer ')){
    return res.status(401).json({message:'Token not found'});
  }
  const token = authorization.replace('Bearer ','');
  try {
    const payload = jwt.verify(token,'chave-super-secreta');
    req.user = payload;
    next();
  }
  catch(err){
    return res.status(401).json({message: 'Invalid token'})
  }
}