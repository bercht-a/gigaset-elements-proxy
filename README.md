# gigaset-elements-proxy v2.2.5

Is a very simple gateway to [gigaset-elements](https://www.gigaset.com/fr_fr/cms/objets-connectes-apercu.html) API:

-   periodic re-authentication
-   local proxy to the gigaset-elements APIs
-   gigaset-elements events are periodically fetched and pushed to a MQTT broker

As gigaset-elements does not provide local network APIs, I use it to access my equipement from https://home-assistant.io

[![Known Vulnerabilities](https://snyk.io/test/github/ycardon/gigaset-elements-proxy/badge.svg)](https://snyk.io/test/github/ycardon/gigaset-elements-proxy)

## raw Gigaset APIs

These are the API that are published on Gigaset Cloud, `gigaset-elements-proxy` only re-expose them locally without authentication.
Note that if you're reading this page on github, theses links does not work: you have to install the project.

-   [basestations](api/v1/me/basestations)

-   [events](api/v2/me/events)

    -   ?limit=
    -   ?group=
    -   ?from_ts= &to_ts=

-   [cameras](api/v1/me/cameras)

    -   /[id]/liveview/start
    -   /[id]/recording/[status|start|stop]

-   [health](api/v2/me/health)

-   [notification settings](api/v1/me/notifications/users/channels)

## convenience APIs

These extra APIs are based on raw Gigaset APIs and apply light treatment in order to make them easier to use in a 3rd party application.
Note that if you're reading this page on github, theses links does not work: you have to install the project.

-   [live camera (redirect to a cloud-based RTSP stream)](live): you have to set the camera id in the configuration file

-   [live camera (local MJPEG stream)](live-local): you have set your camera local infos in the configuration file

-   [all sensors status](sensors): online/offline and open/close/tilt status of all the sensors

-   [specific sensor status](sensors/<sensor-friendly-name>): online/offline and open/close/tilt status of one sensor

-   [intrusion settings](intrusion_settings): selected mode of the alarm system

-   [force refresh](force-refresh): send the actual status of the sensors and the alarm mode as mqtt events

## MQTT events

-   pushes event to queue `gigaset/<sensor_friendly_name>` with `true` or `false` payload
-   motions events (movement detector and camera) automatically generate a delayed `false` event
-   smoke detector test events automatically generate a delayed `default` event

| gigaset sensor type             | gigaset event type                 | mqtt topic                      | mqtt value             |
| ------------------------------- | ---------------------------------- | ------------------------------- | ---------------------- |
| `ds02` door sensor              | `open`                             | `gigaset/<sensor name>`         | `true`                 |
| `ds02` door sensor              | `close`                            | `gigaset/<sensor name>`         | `false`                |
| `ws02` window sensor            | `open`                             | `gigaset/<sensor name>`         | `true`                 |
| `ws02` window sensor            | `tilt`                             | `gigaset/<sensor name>`         | `true`                 |
| `ws02` window sensor            | `close`                            | `gigaset/<sensor name>`         | `false`                |
| `ps02` motion sensor            | `movement`                         | `gigaset/<sensor name>`         | `true`                 |
| `ps02` motion sensor            | delayed after `movement`           | `gigaset/<sensor name>`         | `false`                |
| `ycam` motion sensor            | `yc01.motion`                      | `gigaset/<sensor name>`         | `true`                 |
| `ycam` motion sensor            | delayed after `yc01.motion`        | `gigaset/<sensor name>`         | `false`                |
| `sp01` siren                    | `on`                               | `gigaset/<sensor name>`         | `true`                 |
| `sp01` siren                    | `off`                              | `gigaset/<sensor name>`         | `false`                |
| `sd01` smoke detector           | `smoke_detected`                   | `gigaset/<sensor name>`         | `alarm`                |
| `sd01` smoke detector           | `test`                             | `gigaset/<sensor name>`         | `test`                 |
| `sd01` smoke detector           | delayed after `test`               | `gigaset/<sensor name>`         | `default`              |
| `sd01` smoke detector           | `smoke_no_longer_detected`         | `gigaset/<sensor name>`         | `default`              |
| `sd01` smoke detector           | `end_sd01_smoke_detected`          | `gigaset/<sensor name>`         | `default`              |
| `sd01` smoke detector           | `end_sd01_test`                    | ignored                         |                        |
| `um01` universal sensor         | `open`                             | `gigaset/<sensor name>`         | `true`                 |
| `um01` universal sensor         | `tilt`                             | `gigaset/<sensor name>`         | `true`                 |
| `um01` universal sensor         | `close`                            | `gigaset/<sensor name>`         | `false`                |
| basestation: alarm mode changed | `isl01.bs01.intrusion_mode_loaded` | `gigaset/<base name>`           | `<new alarm mode>`     |
| any sensor                      | `battery_critical`                 | `gigaset/<sensor name>_battery` | `battery_critical`     |
| `allow_unknown_events` is true  | any other event                    | `gigaset/<sensor name>`         | `<gigaset event type>` |

## installation

### option 1 - as a Hassio addon

point to this custom repository

```txt
https://github.com/ycardon/hassio-addons
```

### option 2 - from git 

- (recommended if you have to customize the application to your needs)
- nodejs is required

```
> git clone https://github.com/ycardon/gigaset-elements-proxy
> cd gigaset-elements-proxy
> npm install
> vim config/default.yaml
> node app.js
```

### option 3 - from npm

```
install
> [sudo] npm install gigaset-elements-proxy -g

locate then edit config/default.yaml with
> npm list gigaset-elements-proxy

run
> ge-proxy
```

### then

Have a look on the `examples` directory for instructions on creating a service or configure the sensors inside home-assistant

You can get extra help on this [home-assistant community topic](https://community.home-assistant.io/t/help-needed-with-gigaset-elements/28201) or in the [issue section](https://github.com/ycardon/gigaset-elements-proxy/issues?utf8=✓&q=is%3Aissue)

You can also check https://github.com/lorenwest/node-config/wiki/Configuration-Files

## restrictions

-   only read events and states from the Gigaset Cloud API, no writes (eg. cannot change the status of the alarm system)
-   track `ds02` (door sensors) `ws02`(window sensors) and `yc01` / `ps02`(movement and camera movement sensors) event types
-   since v1.4, track `sp01` (siren command event)
-   since v1.5, track `sd01` (smoke detector event)

## improvements

### v1.3.2 Halloween (1 november 2018)

-   when the server starts, send the actual status of the sensors and the alarm mode
-   added the `/force-refresh` API to send again the actual status of the sensors and the alarm mode
-   added `examples` directory
-   added `ws02` window sensors type
-   added `/intrusion_settings` API to monitor selected alarm mode
-   added handling of basestation events (selected alarm mode)
-   added more options to configue MQTT broker connections
-   fixed CVE in dependency
-   logging server version

### v1.3.5 Armistice (11 november 2018)

-   logging mqtt connection errors
-   basestation event now returns the mode of the alarm mode instead of true for home

### v1.4.6 Happy new year (24 february 2019)

-   fire an mqtt event when an alarm is trigered (true) or acknowledged (false)
-   better handling of parsing errors when gigaset API returns unexpected message (try to re-authorize)
-   added sensor type in the /sensors API

### v1.5.5 Spring (5 april 2019)

-   added `sd01` smoke detector sensors
-   added a new configuration parameter to allow or not the propagation of unknown gigaset events
-   added `low battery` in the form of `topic: gigaset/<sensor name>_battery value: low_battery`
-   added an gigaset events to MQTT events table in the documentation (thanks to [@sracing](https://github.com/sracing))

### v2.0.0 Typescript (11 april 2019)

-   heavy code reorganization (moved to typescript, introduced modules)
-   no functionnality added

### v2.1.5 Labour Day (1 may 2019)

-   added a new API: `sensors/<sensor-friendly-name>` to ease treatment from home-assistant
-   now return initial state of smoke detectors (cf. this [issue](https://github.com/ycardon/gigaset-elements-proxy/issues/11#))
-   API `sensors/` no longer returns a array of objects but a plain object indexed with the sensor's friendly name
-   now using a proper build system for the project
-   filtering out the Philips Hue devices in the `sensors/` API

### v2.2.0 Hassio (24 sept 2019)

-   can now be installed as an Hassio Addon
-   _breaking change_ REST API port is now 8094 (and not 3000 as it used to be), can be changed in `config/default.yaml`

### v2.2.1 Universal (18 oct 2019)

-   added `um01` universal sensor

## credits

-   Strongly inspired by the Python command line version that can be find under https://github.com/dynasticorpheus/gigaset-elements (thank you !!)
-   Security audits
    -   https://www.iot-tests.org/2017/01/testing-gigaset-elements-camera/
    -   https://team-sik.org/sik-2016-044/
    -   https://team-sik.org/sik-2016-045/
    -   https://team-sik.org/sik-2016-046/
    -   https://team-sik.org/sik-2016-047/
    -   https://team-sik.org/sik-2016-048/
-   Thank you to [@h4nc](https://github.com/h4nc), [@dotvav](https://github.com/dotvav) and [@sracing](https://github.com/sracing) for their comments, suggestions and testing

## building the project

-   run
```
    > git clone https://github.com/ycardon/gigaset-elements-proxy
    > npm install
```
-   code new stuff
-   update version in `./package.json`
-   run either
```
    > npm run build
    > npm run dev
    > npm publish
```
