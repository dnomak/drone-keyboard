# Drone Keyboard for Tello

Drone Keyboard is a new way to control your Tello. A special design to have amazing experience with your pc and drone.

![](https://dnomak.com/img/drone-keyboard-for-tello--github.jpg)

# SAFETY FIRST!
Use the codebase or app as your own risk. The drone can hurt you and I'm not responsible for that. Always test commands with the props removed first. Don't be dumb! Also please make sure that Tello’s **firmware is updated!** If Tello does not receive any command input for **15 seconds**, it will land automatically.

### Test flight
![](https://dnomak.com/img/drone-keyboard-for-tello--github.gif)

## Software Used
* Vue
* Electron
* Node.js
* Socket.io
* VXG Media Player

## Hardware Used
* [DJI Tello Drone](https://click.dji.com/AGwCSSOFfGVw1JCaOzzEPA?pm=link)
* [Extra Batteries](https://store.dji.com/product/tello-battery)
* [Tello Battery Charging Hub](https://store.dji.com/product/tello-battery-charging-hub)

## Using This Code

### Development
1. `npm install`
1. `npm run serve` - Runs only Vue project on `http://localhost:8080`
1. Connect to drone via wifi
1. `npm run serve:electron` - Opens Electron project and runs Vue project in it on `http://localhost:8080`

### Start Stream
1. You need to add [VXG Media Player](https://chrome.google.com/webstore/detail/vxg-media-player/hncknjnnbahamgpjoafdebabmoamcnni) Chrome Extension to start Video Stream. Video Stream doesn't start on Electron. You should push 'Shift' button which opens new tab on Chrome to start Video Stream.
1. `npm run build` - For Video Stream in `main.js` there are 2 ports. On port `:2020`, Vue project which locates in `/dist` runs. On port `:2021` index.html which locates in `/stream` runs. This `:2021` port was called as iframe to Vue project which runs on `:2020` and Video Stream starts.

### Build Mac App
1. `npm run build` - Build Vue project in `/dist`.
1. Please comment `<script src="http://localhost:8080/app.js"></script>` in `/index.html`, change names of `app.***.css`, `chunk-vendors.***.js` and `app.***.js` with file names under `/dist` and remove comments.
1. `npm run build:electron:mac` - Extract the app to `release-builds`

## Troubleshooting
[Docs for Tello are available here](https://dl-cdn.ryzerobotics.com/downloads/tello/20180910/Tello%20SDK%20Documentation%20EN_1.3.pdf)

I had to update the firmware of my drone when it came in the mail before I could use this 1.3 API. Do this via the Tello app on your phone.

If you let the drone's WIFI connection lapse, you have to restart the server by typing `rs` into the terminal. This will re-run the `command command` that puts the drone in SDK mode. If you don't do this, it will ignore any commands you send it.

## License
Drone Keyboard for Tello app is licensed under the [MIT](http://opensource.org/licenses/MIT) license.

[VXG Media Player](https://www.videoexpertsgroup.com/vxg-chrome-plugin/) is licensed to [Video Experts Group](https://www.videoexpertsgroup.com/). MIT license is not run for `/stream` folder, usage is free. If you want to use this extension for your projects, I suggest you to contact with [Video Experts Group](https://www.videoexpertsgroup.com/).

## Examples & Resources
* [jsolderitsch/tello-nodejs](https://github.com/jsolderitsch/tello-nodejs) - very simple JavaScript examples
* [FFMpeg + Node.js Video in the browser complicated example](https://github.com/SovGVD/nodetello/)
* [Some Japanese Developer Figured out how to get video working with WebRTC](https://qiita.com/a-baba/items/d728d580f89473c5fd18)
* [JavaScript Drones](https://github.com/wesbos/javascript-drones)
* Link your repo here for others to learn!

## Inspired by
* [Wes Bos](https://github.com/wesbos/javascript-drones)
* [Pynoth](https://dribbble.com/shots/5126767-HHKB)