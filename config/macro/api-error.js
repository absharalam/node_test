'use strict';

module.exports = {
    CODE_200: 200, // ok
    CODE_400: 400, // bad request
    CODE_401: 401, // unauthorized error
    CODE_403: 403, // forbidden
    CODE_404: 404, // not found
    CODE_405: 405, // method not allowed
    CODE_406: 406, // Not acceptable
    CODE_500: 500, // internal server error
    NO_AUTH_TOKEN: 'AUTH_TOKEN_NOT_FOUND',
    NO_TOKEN: '400|TOKEN_NOT_FOUND',
    WRONG_TOKEN: '401|WRONG_TOKEN',
    WRONG_AUTH_TOKEN: 'WRONG_AUTH_TOKEN',
    NO_APP_KEY: '400|APP_KEY_NOT_FOUND',
    WRONG_APP_KEY: '401|WRONG_APP_KEY',
    UNAUTHORIZED: 'UNAUTHORIZED',
    TOKEN_EXPIRED: 'TOKEN_EXPIRED',
    PASSWORD_NOT_MATCH: 'PASSWORD_MISMATCHED',
    PARAMETER_MISSING_CODE: '400|PARAMETER_MISSING',
    PARAMETER_REQUIRED_CODE: '400|EMPTY_PARAMETER',
    PARAMETER_BAD_REQUEST: '400|BAD_PARAMETER_REQUEST',
    TECHNICAL_ERROR: '500|TECHNICAL_ERROR',
    EMAIL_EXIST: '401|EMAIL_ALREADY_EXIST'
}