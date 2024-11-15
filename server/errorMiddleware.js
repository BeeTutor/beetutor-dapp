function getStatusCode(err) {
  if (err.statusCode !== undefined) {
    return err.statusCode;
  }
  if (err.status !== undefined) {
    return err.status;
  }
  return 500;
}

export const errorHandler = () => {
  return (error, req, res, next) => {
    if (error) {
      console.error(error);

      const status = getStatusCode(error);

      res.status(status).send({
        title: error.title,
        status: error.name,
        code: error.code,
        message: error.message,
      });
    } else {
      next();
    }
  };
};
