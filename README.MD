#Debug

## Debug with React DevTools



1) install react-devtool global: 

npm install -g react-devtools@^3

2) execute app

expo start

3) execute react-devtools (in other terminal)

react-devtools

4) in your app select Debug remote JS (shake device to see more options)


source: https://docs.expo.io/workflow/debugging/?redirected#debugging-with-react-devtools


## Debug with Chrome Developer Tools


1) start your app (in YOUR LAN or WIFI)

expo start

2) in your app select Debug remote JS (shake device to see more options)


## Debug storage redux
1) install react-native-debugger (is an app installable in SO)
https://github.com/jhen0409/react-native-debugger/releases

2) open it

3) start your app in "Debug JS Remotely"

4) configure __REDUX_DEVTOOLS_EXTENSION__ see https://github.com/zalmoxisus/redux-devtools-extension#11-basic-store

note: if react native debugger do not connect with the device, try:
a) stops and restar deivce (expo start)
b) disable and enable "Debug JS Remotely"


source: https://docs.expo.io/workflow/debugging/?redirected
