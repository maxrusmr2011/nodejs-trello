module.exports = (err, req, res) => {
  if (err) {
    res.status(500).send('Server error...');
  }
};
