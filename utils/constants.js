const customResourceResponse = {};

customResourceResponse.success = { statusCode: 200, message: 'Request has been processed successfully.' };
customResourceResponse.reqCreated = { statusCode: 201, message: 'Record has been created successfully.' };
customResourceResponse.recordNotFound = { statusCode: 404, message: 'No record found.' };
customResourceResponse.serverError = { statusCode: 500, message: 'Internal server error.' };
customResourceResponse.reqValidationError = { statusCode: 422, message: 'Data validation failed.' };
customResourceResponse.userExists = { statusCode: 409, message: 'User already exists.' };
customResourceResponse.userNotFound = { statusCode: 404, message: 'User not found.' };  
customResourceResponse.authError = { statusCode: 401, message: 'Authentication failed.' };
customResourceResponse.accoutnNotExisted = { statusCode: 409, message: 'Account not existed' };
customResourceResponse.loginSuccess = { statusCode: 200, message: 'Login success' };
customResourceResponse.passwordNotMatch = { statusCode: 409, message: 'Password not match' };
customResourceResponse.tokenNotValid = { statusCode: 401, message: 'Token not valid' };
customResourceResponse.tokenRequired = { statusCode: 401, message: 'Token required' };
customResourceResponse.tokenExpired = { statusCode: 401, message: 'Token expired' };
customResourceResponse.logoutSuccess = { statusCode: 200, message: 'Logout success' };

module.exports = customResourceResponse;
