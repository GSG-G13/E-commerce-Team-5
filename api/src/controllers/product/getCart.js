const getCartQuery = require('../../database/queries/product/getCartQuery');
const jwt = require('jsonwebtoken');

const getCart = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: true, message: 'Unauthorized' });
  }

  try {
    const decodedToken = jwt.verify(token, '123'); 
    const userId = decodedToken.id;
    getCartQuery(userId)
      .then((data) => res.json({ error: false, data: data.rows }))
      .catch((err) => next(err));
  } catch (err) {
    console.log(err);
    return res.status(401).json({ error: true, message: 'Unauthorized' });
  }
};


module.exports = getCart;
