"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const request = require("request");
// gigaset URLs
// prettier-ignore
var GIGASET_URL;
(function (GIGASET_URL) {
    GIGASET_URL["LOGIN"] = "https://im.gigaset-elements.de/identity/api/v1/user/login";
    GIGASET_URL["MODE"] = "https://api.gigaset-elements.de/api/v2/me/user/intrusion-settings/{id}";
    GIGASET_URL["BASE"] = "https://api.gigaset-elements.de";
    GIGASET_URL["AUTH"] = "https://api.gigaset-elements.de/api/v1/auth/openid/begin?op=gigaset";
    GIGASET_URL["EVENTS"] = "https://api.gigaset-elements.de/api/v2/me/events?from_ts=";
    GIGASET_URL["CAMERA"] = "https://api.gigaset-elements.de/api/v1/me/cameras/{id}/liveview/start";
    GIGASET_URL["SENSORS"] = "https://api.gigaset-elements.de/api/v1/me/basestations";
})(GIGASET_URL = exports.GIGASET_URL || (exports.GIGASET_URL = {}));
// a request wrapper that retains cookies
exports.gigasetRequest = request.defaults({ jar: true });
/**
 * authorize on gigaset API
 */
function authorize(callback = () => { }) {
    console.info('authorize on gigaset cloud api : starting');
    exports.gigasetRequest.post(GIGASET_URL.LOGIN, { form: { email: utils_1.conf('email'), password: utils_1.conf('password') } }, (_, res) => {
        exports.gigasetRequest.get(GIGASET_URL.AUTH, (_, res) => {
            console.info('authorize on gigaset cloud api : done');
            callback();
        });
    });
}
exports.authorize = authorize;
/**
 * log and try to recover from an unexpected gigaset response (ie. re-authorize)
 *
 * @remarks the gigaset connection tokens are sometimes reset on gigaset side at unexpectable time
 */
function handleGigasetError(functionName, error, body) {
    console.error(functionName + ' | unexpected error:', error);
    console.error(functionName + ' | gigaset response:' + body);
    authorize();
}
exports.handleGigasetError = handleGigasetError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2lnYXNldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9naWdhc2V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbUNBQThCO0FBQzlCLG1DQUFtQztBQUVuQyxlQUFlO0FBQ2Ysa0JBQWtCO0FBQ2xCLElBQVksV0FRWDtBQVJELFdBQVksV0FBVztJQUNuQixrRkFBcUUsQ0FBQTtJQUNyRSw4RkFBa0YsQ0FBQTtJQUNsRix1REFBMkMsQ0FBQTtJQUMzQywyRkFBK0UsQ0FBQTtJQUMvRSxtRkFBcUUsQ0FBQTtJQUNyRSwrRkFBaUYsQ0FBQTtJQUNqRixpRkFBa0UsQ0FBQTtBQUN0RSxDQUFDLEVBUlcsV0FBVyxHQUFYLG1CQUFXLEtBQVgsbUJBQVcsUUFRdEI7QUFFRCx5Q0FBeUM7QUFDNUIsUUFBQSxjQUFjLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFBO0FBRTdEOztHQUVHO0FBQ0gsU0FBZ0IsU0FBUyxDQUFDLFFBQVEsR0FBRyxHQUFHLEVBQUUsR0FBRSxDQUFDO0lBQ3pDLE9BQU8sQ0FBQyxJQUFJLENBQUMsMkNBQTJDLENBQUMsQ0FBQTtJQUV6RCxzQkFBYyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLEVBQUUsS0FBSyxFQUFFLFlBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxRQUFRLEVBQUUsWUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBQyxHQUFHLEVBQUUsRUFBRTtRQUM3RyxzQkFBYyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxFQUFDLEdBQUcsRUFBRSxFQUFFO1lBQzNDLE9BQU8sQ0FBQyxJQUFJLENBQUMsdUNBQXVDLENBQUMsQ0FBQTtZQUNyRCxRQUFRLEVBQUUsQ0FBQTtRQUNkLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQyxDQUFDLENBQUE7QUFDTixDQUFDO0FBVEQsOEJBU0M7QUFFRDs7OztHQUlHO0FBQ0gsU0FBZ0Isa0JBQWtCLENBQUMsWUFBb0IsRUFBRSxLQUFhLEVBQUUsSUFBWTtJQUNoRixPQUFPLENBQUMsS0FBSyxDQUFDLFlBQVksR0FBRyxzQkFBc0IsRUFBRSxLQUFLLENBQUMsQ0FBQTtJQUMzRCxPQUFPLENBQUMsS0FBSyxDQUFDLFlBQVksR0FBRyxzQkFBc0IsR0FBRyxJQUFJLENBQUMsQ0FBQTtJQUMzRCxTQUFTLEVBQUUsQ0FBQTtBQUNmLENBQUM7QUFKRCxnREFJQyJ9