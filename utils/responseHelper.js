const handleSuccess = (res, data) => {
  res.status(200).json(data);
};

const handleError = (res, error, message) => {
  console.error(message, error);
  res.status(500).json({ error: message });
};

module.exports = { handleSuccess, handleError };
