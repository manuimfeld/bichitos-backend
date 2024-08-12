const handleSuccess = (res, data) => {
  if (!res.headersSent) {
    res.status(200).json(data);
  }
};

const handleError = (res, error, message) => {
  if (!res.headersSent) {
    // Verifica si error es null o undefined y maneja la excepción
    const errorMessage = error ? error.message : "Unknown error";
    res.status(500).json({ error: message, details: errorMessage });
  }
};

module.exports = { handleSuccess, handleError };
