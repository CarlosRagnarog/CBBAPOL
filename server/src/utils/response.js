const success = (res, data = null, message = 'Operación exitosa', status = 200) => {
  return res.status(status).json({
    ok: true,
    message,
    data
  });
};

const error = (res, message = 'Error', status = 500) => {
  return res.status(status).json({
    ok: false,
    message
  });
};

module.exports = {
  success,
  error
};