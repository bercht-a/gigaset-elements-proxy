"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const request = require("request");
// a request wrapper that retains cookies
exports.gigasetRequest = request.defaults({ jar: true });
// gigaset URLs
// prettier-ignore
var GIGASET_URL;
(function (GIGASET_URL) {
    GIGASET_URL["LOGIN"] = "https://im.gigaset-elements.de/identity/api/v1/user/login";
    GIGASET_URL["BASE"] = "https://api.gigaset-elements.de";
    GIGASET_URL["AUTH"] = "https://api.gigaset-elements.de/api/v1/auth/openid/begin?op=gigaset";
    GIGASET_URL["EVENTS"] = "https://api.gigaset-elements.de/api/v2/me/events?from_ts=";
    GIGASET_URL["CAMERA"] = "https://api.gigaset-elements.de/api/v1/me/cameras/{id}/liveview/start";
    GIGASET_URL["SENSORS"] = "https://api.gigaset-elements.de/api/v1/me/basestations";
})(GIGASET_URL = exports.GIGASET_URL || (exports.GIGASET_URL = {}));
/**
 * authorize on gigaset API
 */
function authorize(callback = () => { }) {
    console.info('authorize on gigaset cloud api : starting');
    exports.gigasetRequest.post(GIGASET_URL.LOGIN, { form: { email: utils_1.conf('email'), password: utils_1.conf('password') } }, () => {
        exports.gigasetRequest.get(GIGASET_URL.AUTH, () => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2lnYXNldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9naWdhc2V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbUNBQThCO0FBQzlCLG1DQUFtQztBQUVuQyx5Q0FBeUM7QUFDNUIsUUFBQSxjQUFjLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFBO0FBRTdELGVBQWU7QUFDZixrQkFBa0I7QUFDbEIsSUFBWSxXQU9YO0FBUEQsV0FBWSxXQUFXO0lBQ25CLGtGQUFxRSxDQUFBO0lBQ3JFLHVEQUEyQyxDQUFBO0lBQzNDLDJGQUErRSxDQUFBO0lBQy9FLG1GQUFxRSxDQUFBO0lBQ3JFLCtGQUFpRixDQUFBO0lBQ2pGLGlGQUFrRSxDQUFBO0FBQ3RFLENBQUMsRUFQVyxXQUFXLEdBQVgsbUJBQVcsS0FBWCxtQkFBVyxRQU90QjtBQUVEOztHQUVHO0FBQ0gsU0FBZ0IsU0FBUyxDQUFDLFFBQVEsR0FBRyxHQUFHLEVBQUUsR0FBRSxDQUFDO0lBQ3pDLE9BQU8sQ0FBQyxJQUFJLENBQUMsMkNBQTJDLENBQUMsQ0FBQTtJQUN6RCxzQkFBYyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLEVBQUUsS0FBSyxFQUFFLFlBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxRQUFRLEVBQUUsWUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUU7UUFDeEcsc0JBQWMsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUU7WUFDdEMsT0FBTyxDQUFDLElBQUksQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFBO1lBQ3JELFFBQVEsRUFBRSxDQUFBO1FBQ2QsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDLENBQUMsQ0FBQTtBQUNOLENBQUM7QUFSRCw4QkFRQztBQUVEOzs7O0dBSUc7QUFDSCxTQUFnQixrQkFBa0IsQ0FBQyxZQUFvQixFQUFFLEtBQWEsRUFBRSxJQUFZO0lBQ2hGLE9BQU8sQ0FBQyxLQUFLLENBQUMsWUFBWSxHQUFHLHNCQUFzQixFQUFFLEtBQUssQ0FBQyxDQUFBO0lBQzNELE9BQU8sQ0FBQyxLQUFLLENBQUMsWUFBWSxHQUFHLHNCQUFzQixHQUFHLElBQUksQ0FBQyxDQUFBO0lBQzNELFNBQVMsRUFBRSxDQUFBO0FBQ2YsQ0FBQztBQUpELGdEQUlDIn0=