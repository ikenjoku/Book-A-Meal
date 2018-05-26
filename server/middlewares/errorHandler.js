/**
 * catches errors
 *
 * @param {Object} error error object being passed
 * @param {Object} req express http request obect
 * @param {Object} res express http response obect
 */
const errorHandler = (error, req, res) => {
  if (error.statusText && error.statusText === 'Bad Request') {
    let messages = [];

    error.errors.forEach((err) => {
      messages = [...messages, ...err.messages];
    });

    return res.status(400).json({
      statusText: error.statusText,
      errors: {
        messages,
      },
    });
  }

  if (error.name === 'SequelizeDatabaseError' && error.parent.routine === 'DateTimeParseError') {
    return res.status(400).send({
      message: 'Invalid date. Use this format YYYY-MM-DD',
    });
  }
  res.status(error.status || 500);
  res.send({ Error: error });
};

export default errorHandler;
