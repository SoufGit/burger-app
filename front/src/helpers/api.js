import {loggerTypes, logThat} from 'Helpers/consoleLogger';
//import {BACK_URL} from '../Configuration.js';

export const BACK_URL = 'http://localhost:3000/api/v1';

/**
 * @description Allowed request methods for fetch calls.
 * @type {{POST: string, GET: string, DELETE: string, PATCH: string}}
 */
export const requestMethods = {
    GET: 'GET',
    DELETE: 'DELETE',
    PATCH: 'PATCH',
    POST: 'POST'
};

/**
 * @description Allowed content-type for requests header.
 * @type {{formEncoded: string, json: string}}
 */
export const requestContentTypes = {
    formEncoded: 'application/x-www-form-urlencoded',
    json: 'application/json'
};

/**
 * @description Allowed status code for fetch calls.
 * @type {{SUCCESS: number, BAD_REQUEST: number, NOT_FOUND: number, SERVER_ERROR: number}}
 */
export const statusCode = {
    SUCCESS: 200,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    SERVER_ERROR: 500
};

const ERRORS = {
    noParameters: 'no argument URL provided',
};

const {protocol, host, pathname, search} = window.location;

const getRequestConfigHeader = (contentType, requestHeader) => ({
    //cache: 'no-cache',
    headers: {
        'Content-Type': contentType,
        //'CSRF-Token': null,
        ...requestHeader
    },
    //redirect: 'follow'
});

const getUrlEncodedData = requestBody => {
    const encodedBodyList = [];

    Object.keys(requestBody).forEach(objectKey => {
        encodedBodyList.push(`${objectKey}=${encodeURIComponent(requestBody[objectKey])}`);
    });

    return encodedBodyList.join('&');
};

const getRequestBody = (requestContentType, requestBody) => {
    const requestBodyType = {
        [requestContentTypes.json]: JSON.stringify,
        [requestContentTypes.formEncoded]: getUrlEncodedData
    };

    return JSON.stringify(requestBody); //requestBodyType[requestContentType](requestBody);
};

const getRequestConfig = ({
    requestMethod,
    requestBody,
    requestContentType,
    requestHeader
} = {}) => {
    const requestConfig = {
        ...getRequestConfigHeader(requestContentType, requestHeader),
        method: requestMethod
    };

    if(requestMethod !== requestMethods.GET && requestMethod !== requestMethods.DELETE) {
        requestConfig.body = getRequestBody(requestContentType, requestBody);
    }

    return requestConfig;
};

const getErrorMessage = (urlAPI, fetchStatus) => ({
    fetchStatus,
    message: `Erreur technique lors de l'appel au service : ${urlAPI}`,
    success: false
});

const getBuiltUrl = url => `${BACK_URL}${url}`.split('?');

const getMergedSearch = (locationSearch = '', requestSearch = '') => {
    const searchList = [
        locationSearch.replace('?', ''),
        requestSearch.replace('?', '')
    ];

    const searchString = searchList.join('&').replace(/(^&)|(&$)/gi, '');

    return searchString ? `?${searchString}` : '';
};

const getApiMergedUrl = (requestMethod, url) => {
    const [newUrl, newUrlSearch] = getBuiltUrl(url);
    if(requestMethod !== requestMethods.GET) {
        return newUrl;
    }
    return `${newUrl}${getMergedSearch(search, newUrlSearch)}`;
};

/**
 * @description Called when a fetch has fail.
 *
 * @param {string} message - Message to output.
 * @param {*} parameter - Error information to output.
 */
const dispatchFetchFailActions = parameter => {
    const failErrorMessage = 'Fetch error: can\'t fetch given URL';
    logThat(loggerTypes.error, failErrorMessage, parameter);
};

/**
 * @description Action for fetch when encounter an error.
 *
 * @param {object} data - Parameters object.
 * @param {boolean} data.willThrowInsteadOfRedirect - Disable slide redirect when encounter error. Function will throw an error to be catch at higher level.
 * @param {string} data.url - Url that has been called.
 * @param {Response} [data.promise={}] - The fetch promise if relevant.
 * @param {object} [data.fetchError={}] - Catch error.
 * @param {string} [data.fetchStatus] - The fetch resolve status code.
 * @returns {object} - TODO not sure to be relevant here to return anything.
 */
const triggerFetchError = ({url, promise = {}, fetchError = {}, fetchStatus}) => {
    dispatchFetchFailActions({fetchError, promise, url});
    return {...promise, ...getErrorMessage(url, fetchStatus)};
};

/**
 * @description Handle the fetch response (await fetch).
 * @param {Promise} fetchPromise - The fetch promise return.
 * @returns {object} - The json response .
 */
const getApiRequestProceed = async fetchPromise => {
    if(fetchPromise.ok) {
        const data = await fetchPromise.json();
        return data;
    }
    throw new Error(fetchPromise);
};

/**
 * @description Perform a fetch call on given resource.
 *
 * @param {object} data - Parameter object.
 * @param {string} data.url - Url to call.
 * @param {object} [data.requestHeader] - Header to send to api.
 * @param {object} [data.requestBody] - Body to send to api.
 * @param {string<requestContentTypes>} [data.requestContentType=requestContentTypes.json] - Header content type to use for request.
 * @param {string<requestMethods>} [data.requestMethod=requestMethods.GET] - Request method to call api.
 * @returns {Promise<{success: boolean, message: string}>} - The fetch promise.
 */
export const getApiRequest = async ({
    url,
    requestHeader = {},
    requestBody = {},
    requestContentType = requestContentTypes.json,
    requestMethod
}) => {
    if(!url) {
        throw new Error(ERRORS.noParameters);
    }
    let fetchPromise;
    try {
        fetchPromise = await fetch(
            getApiMergedUrl(requestMethod, url),
            getRequestConfig({requestMethod, requestBody, requestContentType, requestHeader})
        );

        return await getApiRequestProceed(fetchPromise);
    } catch(fetchError) {
        return triggerFetchError(getEnrichedFetchErrorDetails({
            fetchError,
            url
        }, fetchPromise));
    }
};

/**
 * @description Enrich error event arguments with fetch status when needed.
 *
 * @param {object} fetchErrorDetails - Parameter object.
 * @param {object} fetchPromise - Promise result with error object or response.
 * @returns {object} - Enriched parameter object.
 */
const getEnrichedFetchErrorDetails = (fetchErrorDetails, fetchPromise) => ({
    ...fetchErrorDetails,
    ...fetchPromise?.status && {
        fetchStatus: fetchPromise.status
    }
});

/*
 * @description Perform a fetch call on given resource.
 * @param {object} data - Parameter object.
 * @param {string} data.url - Url to call.
 * @param {string} data.redirectionUrl - Url to call.
 * @param {number} data.redirectionDelay - Delay for redirection in .
 * @param {object} [data.requestBody] - Body to send to api.
 * @param {string<requestContentTypes>} [data.requestContentType=requestContentTypes.json] - Header content type to use for request.
 * @param {string<requestMethods>} [data.requestMethod=requestMethods.GET] - Request method to call api.
 * @returns {Promise<any>|null} - The fetch promise.
 */
// eslint-disable-next-line max-statements
// export const getApiRequestWithRedirectUrlOnFail = async ({
//     url,
//     redirectionUrl,
//     redirectionDelay = 5,
//     requestHeader = {},
//     requestBody = {},
//     requestContentType = requestContentTypes.json,
//     requestMethod = requestMethods.GET
// }) => {
//     if(window.editMode) {
//         throw new Error(ERRORS.forbiddenInEditMode);
//     }

//     if(!url) {
//         throw new Error(ERRORS.noParameters);
//     }

//     const response = await fetch(
//         getApiMergedUrl(requestMethod, url),
//         getRequestConfig({requestMethod, requestBody, requestContentType, requestHeader})
//     );
//     if(response.ok) {
//         return response.json();
//     }
//     logThat(loggerTypes.log, `Call on '${url}' failed.  User is redirected to ${redirectionUrl}`);
//     if(redirectionUrl) {
//         setTimeout(() => {
//             window.location.replace(redirectionUrl);
//         }, redirectionDelay * 1000);
//     }
//     return null;
// };

/**
 * @deprecated Used only for sinister form. Todo migrate with HTTP error codes.
 *
 * @description Not to use.
 * @param {*} url - TODO.
 * @param {*} requestBody - TODO.
 * @param {*} requestMethod - TODO.
 * @returns {Promise<Response>} - TODO.
 */
export const APIRequestAllInformations = (url, requestBody = {}, requestMethod = requestMethods.GET) => {
    if(!url) {
        throw new Error(ERRORS.noParameters);
    }
    return fetch(
        getApiMergedUrl(requestMethod, url),
        getRequestConfig({
            requestMethod,
            requestBody,
            requestContentType: requestContentTypes.json,
            requestHeader: {}
        })
    );
};

export const getCsrfRequest = async () => {
    try {
        const fetchResult = await fetch(`${protocol}//${host}/libs/granite/csrf/token.json`);
        return await fetchResult.json();
    } catch(error) {
        logThat(loggerTypes.error, 'CSRF', error);

        return {};
    }
};

export const fetchApiRequest = async (url, requestMethod = requestMethods.GET, body = {}) => {
    const apiResponse = await getApiRequest({
        requestBody: body,
        // requestContentType: requestContentTypes.formEncoded,
        requestMethod,
        url
    });
    return await apiResponse;
}
