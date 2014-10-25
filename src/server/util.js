module.exports.handleError = function (err, res) {
  if (err) console.log('err');
  res.status(500).end();
}
