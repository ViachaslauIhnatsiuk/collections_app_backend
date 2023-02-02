const createError = (statusCode: number, message: string) => {
  return { statusCode, message };
};

const checkRequestBody = (body: object, keys: string[]): string | null => {
  const requestBodyKeys = Object.keys(body);

  if (!requestBodyKeys.length) {
    return 'request body is required';
  }

  for (const key of keys) {
    if (!body.hasOwnProperty(key)) {
      return `${key} is required`;
    }
  }

  if (requestBodyKeys.length > keys.length) {
    const extraProps = requestBodyKeys.filter((prop) => !keys.includes(prop));
    return `values [ ${extraProps.join(',')} ] shouldn't exist`;
  }

  return null;
};

export { createError, checkRequestBody };
