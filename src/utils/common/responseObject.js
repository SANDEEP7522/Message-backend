// that component we use again and again in our code that make that type of code

export const internalErrorResponse = (error) => {
  return {
    success: false,
    err: error,
    data: {},
    message: 'Internal Server Error'
  };
};

export const customErrorRespose = (error) => {
  if (!error.message && !error.explanation) {
    return internalErrorResponse(error);
  }
  return {
    success: false,
    err: error.explanation,
    data: {},
    message: error.message
  };
};

export const successResponce = (data, message) => {
  return {
    success: true,
    message,
    data,
    err: {}
  };
};
