import { conf } from './utils'
import request = require('request')

// gigaset URLs
// prettier-ignore
export enum GIGASET_URL {
    LOGIN =   'https://im.gigaset-elements.de/identity/api/v1/user/login',
    MODE =    'https://api.gigaset-elements.de/api/v2/me/user/intrusion-settings/{id}',
    BASE =    'https://api.gigaset-elements.de',
    AUTH =    'https://api.gigaset-elements.de/api/v1/auth/openid/begin?op=gigaset',
    EVENTS =  'https://api.gigaset-elements.de/api/v2/me/events?from_ts=',
    CAMERA =  'https://api.gigaset-elements.de/api/v1/me/cameras/{id}/liveview/start',
    SENSORS = 'https://api.gigaset-elements.de/api/v1/me/basestations'
}

// a request wrapper that retains cookies
export const gigasetRequest = request.defaults({ jar: true })

/**
 * authorize on gigaset API
 */
export function authorize(callback = () => {}) {
    console.info('authorize on gigaset cloud api : starting')
   
    gigasetRequest.post(GIGASET_URL.LOGIN, { form: { email: conf('email'), password: conf('password') } }, (_,res) => {
        gigasetRequest.get(GIGASET_URL.AUTH, (_,res) => {
            console.info('authorize on gigaset cloud api : done')
            callback()
        })
    })
}

/**
 * log and try to recover from an unexpected gigaset response (ie. re-authorize)
 *
 * @remarks the gigaset connection tokens are sometimes reset on gigaset side at unexpectable time
 */
export function handleGigasetError(functionName: string, error: object, body: string) {
    console.error(functionName + ' | unexpected error:', error)
    console.error(functionName + ' | gigaset response:' + body)
    authorize()
}
