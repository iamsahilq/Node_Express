import { errorResponse } from '../helpers';

export default (schema) => {
  return (req, res, next) => {
    // schema options
    const options = {
      abortEarly: false, // include all errors
      allowUnknown: true, // ignore unknown props
      stripUnknown: false, // remove unknown props
    };
    const result = schema.validate(req.body, options);
    if (result.error) {
      const error = new Error('validation error');
      error.message = result.error.details.map((e) => e.message);
      return errorResponse(req, res, error.message, 400, error);
    }
    if (!req.value) {
      req.value = {};
    }
    req['body'] = result.value;
    next();
  };
};
