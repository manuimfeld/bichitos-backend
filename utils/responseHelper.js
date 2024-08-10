const handleSuccess = (res, data) => {
  if (!res.headersSent) {
    res.status(200).json(data);
  }
};

const handleError = (res, error, message) => {
  if (!res.headersSent) {
    res.status(500).json({ error: message, details: error.message });
  }
};

module.exports = { handleSuccess, handleError };
