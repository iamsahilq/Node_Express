import { errorResponse } from '../helpers';

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  console.log('err :>> ', err);
  const status = err.status || 500;
  const message = err.message || '!!Something went wrong';
  return errorResponse(req, res, message, status, err);
};

export default errorHandler;
