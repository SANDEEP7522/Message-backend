// that component we use again and again in our code that make that type of code

export const internalErrorResponse = (error) => {
  return {
    success: false,
    err: error,
    data: {},
    message: 'Internal Server Error'
  };
};

export const customErrorResponse = (error) => {
  if (!error.message && !error.explanation) {
    return internalErrorResponse(error);
  }
  return {
    success: false,
    err: error.explanation || 'No explanation provided',
    data: {},
    message: error.message || 'No message provided'
  };
};

export const successResponse = (data, message) => {
  return {
    success: true,
    message,
    data,
    err: {}
  };
};
