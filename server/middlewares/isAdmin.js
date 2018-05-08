const isAdmin = (req, res, next) => (
  req.user && req.user.isAdmin ?
    next() :
    res.status(401).send({
      message: 'Unauthorized access',
    })
);

export default isAdmin;
