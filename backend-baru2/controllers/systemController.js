const healthCheck = (req, res) => {
  res.status(200).json({
    status: "Success",
    message: "API is healthy",
    isSuccess: true,
  });
};

const onLost = (req, res) => {
  res.status(404).json({
    status: "Failed",
    message: "Route not found",
    isSuccess: false,
  });
};

module.exports = {
  healthCheck,
  onLost,
};
