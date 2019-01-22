<template lang="pug">
.container
  .wrap.xl-table.xl-middle.xl-center
    .col
      .drone-keyboard-video
        .drone-keyboard-video__content
          .drone-keyboard-status-bar
            .wrap.xl-auto.xl-flexbox.xl-between
              .col
                .wrap.xl-auto.xl-left
                  .col.xl-lh0
                    template(v-if="!isUndefined(droneState)")
                      .drone-keyboard-status-bar__item
                        .icon
                          font-awesome-icon(:icon="['fas', 'plug']")
                        .text
                          span CONNECTED
                    template(v-else)
                      template(v-if="stream")
                        .drone-keyboard-status-bar__item
                          .icon
                            font-awesome-icon(:icon="['fas', 'plug']")
                          .text
                            span DISCONNECTED
                      template(v-else)
                        template(v-if="isElectron")
                          .drone-keyboard-status-bar__item.drone-keyboard-status-bar__item--link(@click="howToConnectInfoButton()")
                            .icon
                              font-awesome-icon(:icon="['fas', 'plug']")
                            .text
                              | HOW TO CONNECT
                        template(v-else)
                          .drone-keyboard-status-bar__item.drone-keyboard-status-bar__item--link(@click="downloadInfoButton()")
                            .icon
                              font-awesome-icon(:icon="['fas', 'download']")
                            .text
                              | DOWNLOAD
              .col
                .wrap.xl-auto.xl-right
                  .col.xl-lh0
                    .drone-keyboard-status-bar__item
                      .icon
                        font-awesome-icon(:icon="['fas', 'arrows-alt-v']")
                      .text
                        template(v-if="!isUndefined(droneState)")
                          template(v-if="droneState.h / 100 < 0 || droneState.h / 100 === 0")
                            | Height: <span>0.0m</span>
                          template(v-else)
                            | Height: <span>{{ droneState.h / 100 }}m</span>
                        template(v-else)
                          | Height: <span>0.0m</span>
                  .col.xl-lh0
                    .drone-keyboard-status-bar__item
                      .icon
                        font-awesome-icon(:icon="['fas', 'space-shuttle']")
                      .text
                        template(v-if="isUndefined(droneState)")
                          | Flight Speed: <span>0</span>
                        template(v-else)
                          | Flight Speed: <span>{{ flightSpeed }}</span>
                  .col.xl-lh0
                    .drone-keyboard-status-bar__item
                      .icon(v-if="!isUndefined(droneState)")
                        template(v-if="droneState.bat > 75")
                          font-awesome-icon(:icon="['fas', 'battery-full']")
                        template(v-else)
                          template(v-if="droneState.bat > 50")
                            font-awesome-icon(:icon="['fas', 'battery-three-quarters']")
                          template(v-else)
                            template(v-if="droneState.bat > 25")
                              font-awesome-icon(:icon="['fas', 'battery-half']")
                            template(v-else)
                              template(v-if="droneState.bat > 1")
                                font-awesome-icon(:icon="['fas', 'battery-quarter']")
                              template(v-else)
                                font-awesome-icon(:icon="['fas', 'battery-empty']")
                      .icon(v-else)
                        font-awesome-icon(:icon="['fas', 'battery-empty']")
                      .text
                        template(v-if="!isUndefined(droneState)")
                          | Battery: <span>{{ droneState.bat }}%</span>
                        template(v-else)
                          | Battery: <span>0%</span>
          .drone-keyboard-content
            template(v-if="!stream")
              template(v-if="downloadInfo")
                .drone-keyboard-content-inner.drone-keyboard-content-inner--center
                  .drone-keyboard-content__close(@click="downloadInfoButton()")
                    .icon
                      font-awesome-icon(:icon="['fas', 'times']")
                  .drone-keyboard-content__image(@click="openExternalLink('https://dnomak.com/drone-keyboard-download-mac-app')")
                    .icon
                      font-awesome-icon(:icon="['fab', 'apple']")
                    img(src="data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAA8AAD/4QOBaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzE0MCA3OS4xNjA0NTEsIDIwMTcvMDUvMDYtMDE6MDg6MjEgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6YzljMGE4MjgtMThiYy00ZmE1LTlmNGQtNWJkZjhhMzMzNGJiIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjYwNDEzMTExMEE3MzExRTlCNjYyRUI0REEzMjAyNDc0IiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjYwNDEzMTEwMEE3MzExRTlCNjYyRUI0REEzMjAyNDc0IiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6ZmFmMGQ1ZjYtYzg1OC00MzhhLWE0OWMtMjVjYTkyOTM0M2YyIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOmM5YzBhODI4LTE4YmMtNGZhNS05ZjRkLTViZGY4YTMzMzRiYiIvPiA8L3JkZjpEZXNjcmlwdGlv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PDuWqWGPRUAAAAAAABErVt4M07xplsUruTTe69UN6cl0BC5ikWpuRLrCQAAAAAAABCq28ZFm+3LWmoUeWItS3578yVbNAQ+l4IRh3pqSYeygAAAAAAAAAryw7enF6PczFkeeHctUsMeioAAAAAAACJWrbwZp3jTDYpXcmm916ob05LoCFzFItTciXWEgAAAAAAACFVt4ybN9uGtNQo8sRalObZrMa2KrSxX2pbSYuYpZJiaSwzIlPIQVylaaTTd5WgjTTTlUmVI84mxaYQbdZaUnKqs4nBqLAMyaiqKfo/1jHpxFd03W2kfDec3qK1KHEN03W2kfDec3qK1KHEN03W2kfDec3qK1KHEN03W2kfDec3qK1KHEN03W2kfDec3qK1KHEN03W2kfDec3qK1KHEN15cirYaxNqlUqqTHSp+JI21Rsal1pDaVFQaiW83DpSZc2k/qETiJil6VZhalZk9TLJedaZNFobXEtwRLNxuIJFCyS2RKc/iwCUSDJSaKaDwBWmqxMxabrbSPhvOb1FalF+Irum620j4bzm9RWpQ4hum620j4bzm9RWpQ4hum620j4bzm9RWpQ4hum620j4bzm9RWpQ4hum620j4bzm9RWpQ4hum620j4bzm9RWpQ4huv1NTbVbSX2JVFSN6q0gJxK46KjUrS4ZJwaEocJla/oSSaKcNQrVXamKbGNqWWvVFRrFF1ViawwkMZogY+Xk46lTRGdFJtoeMi5hKSkyE012E0ve620j4bzm9RWpRPERum620j4bzm9RWpQ4hum620j4bzm9RWpQ4hum620j4bzm9RWpQ4hum620j4bzm9RWpQ4hum620j4bzm9RWpQ4hum620n4bzi9RWpQ4hupLZrZrXesNd4KuVcoHWiXSjLyqVL/wAqncNClIPLJuTyxmqgzMiwKBSqq1aIsf/Z")
                  br
                  .drone-keyboard-content__button(@click="openExternalLink('https://dnomak.com/drone-keyboard-for-tello-app')")
                    | Download App for Mac only
                  .drone-keyboard-content__build-locally(@click="openExternalLink('https://github.com/dnomak/drone-keyboard')")
                    | or Build locally (README.md)
              template(v-else)
                template(v-if="!howToConnectInfo")
                  .drone-keyboard-content__title
                    | DRONE KEYBOARD
                  .drone-keyboard-content__subtitle
                    | for Tello
                  .drone-keyboard-content__watch-demo(@click="openExternalLink('https://www.youtube.com/watch?v=_MdNCSpX1Vg')")
                    | WATCH DEMO
                  .drone-keyboard__subtitles
                    | Video in Turkish, and English subtitles available.
                template(v-else)
                  .drone-keyboard-content-inner
                    .drone-keyboard-content__close(@click="howToConnectInfoButton()")
                      .icon
                        font-awesome-icon(:icon="['fas', 'times']")
                    .drone-keyboard-content__how-to-connect-desc
                      div <span>1.</span> To start video stream, please add <span class="link" @click="openExternalLink('https://chrome.google.com/webstore/detail/vxg-media-player/hncknjnnbahamgpjoafdebabmoamcnni')">VXG Media Player</span> Chrome Extension.
                      div <span>2.</span> Press the power button on the side to start the drone.
                      div <span>3.</span> Connect to the Tello network from your computer's Wi-Fi settings, then click Connect button at the bottom.
                    .xl-center
                      .drone-keyboard-content__button(@click="relunch()")
                        | CONNECT
                    .drone-keyboard-content__safety-first
                      .drone-keyboard-content__how-to-connect-title
                        | SAFETY FIRST!
                      .drone-keyboard-content__how-to-connect-desc
                        | Use the codebase or app as your own risk. The drone can hurt you and I'm not responsible for that. Always test commands with the props removed first. Don't be dumb! Also please make sure that Tello’s <span>firmware is updated!</span> If Tello does not receive any command input for <span>15 seconds</span>, it will land automatically.
                    .drone-keyboard-content__forgot-password-title
                      | Forgot Password?
                    .drone-keyboard-content__forgot-password-desc
                      | The drone has no password by default. If you set a password and forget it, press and hold the power button for <span>5 seconds</span> when the drone is powered on to restore default settings.
            template(v-else)
              .drone-keyboard-content__stream
                iframe(src="http://localhost:2021" width="582" height="437" frameborder="0")
  .drone-keyboard
    .drone-keyboard__top
      .drone-keyboard-key.drone-keyboard-key--first.drone-keyboard-key--selected(:class="{'drone-keyboard-key--active' : keyEscapeClass}")
        .drone-keyboard-key__header.drone-keyboard-key__header--middle
          | Esc
        .drone-keyboard-key__footer
          | Land
      .drone-keyboard-key
        .drone-keyboard-key__header
        .drone-keyboard-key__footer
      .drone-keyboard-key
        .drone-keyboard-key__header
        .drone-keyboard-key__footer
      .drone-keyboard-key
        .drone-keyboard-key__header
        .drone-keyboard-key__footer
      .drone-keyboard-key
        .drone-keyboard-key__header
        .drone-keyboard-key__footer
      .drone-keyboard-key
        .drone-keyboard-key__header
        .drone-keyboard-key__footer
      .drone-keyboard-key
        .drone-keyboard-key__header
        .drone-keyboard-key__footer
      .drone-keyboard-key
        .drone-keyboard-key__header
        .drone-keyboard-key__footer
      .drone-keyboard-key.drone-keyboard-key--selected(:class="{'drone-keyboard-key--active' : keyDigit8Class}")
        .drone-keyboard-key__header.drone-keyboard-key__header--key
          | 8
        .drone-keyboard-key__footer
          | Speed Down
      .drone-keyboard-key.drone-keyboard-key--selected(:class="{'drone-keyboard-key--active' : keyDigit9Class}")
        .drone-keyboard-key__header.drone-keyboard-key__header--key
          | 9
        .drone-keyboard-key__footer
          | Speed Up
      .drone-keyboard-key
        .drone-keyboard-key__header
        .drone-keyboard-key__footer
      .drone-keyboard-key
        .drone-keyboard-key__header
        .drone-keyboard-key__footer
      .drone-keyboard-key.drone-keyboard-key--active.drone-keyboard-key--buy-now(@click="openExternalLink('https://click.dji.com/AGwCSSOFfGVw1JCaOzzEPA?pm=link')", style="width: 216px;")
        .drone-keyboard-key__header.drone-keyboard-key__header--key
          | I don't have a Tello!
        .drone-keyboard-key__footer
          | BUY NOW
    div
      .drone-keyboard-key.drone-keyboard-key--first(style="width: 106px;")
        .drone-keyboard-key__header.drone-keyboard-key__header--middle
        .drone-keyboard-key__footer
      template(v-if="isUndefined(droneState)")
        .drone-keyboard-key.drone-keyboard-key--selected(:class="{'drone-keyboard-key--active' : keyQClass}")
          .drone-keyboard-key__header.drone-keyboard-key__header--key
            | Q
          .drone-keyboard-key__footer
            | Flip Left
      template(v-else)
        template(v-if="droneState.bat < 51")
          .drone-keyboard-key.drone-keyboard-key--disable
            .drone-keyboard-key__header.drone-keyboard-key__header--key
              | Q
            .drone-keyboard-key__footer
              | Flip Left
        template(v-else)
          .drone-keyboard-key.drone-keyboard-key--selected(:class="{'drone-keyboard-key--active' : keyQClass}")
            .drone-keyboard-key__header.drone-keyboard-key__header--key
              | Q
            .drone-keyboard-key__footer
              | Flip Left
      .drone-keyboard-key.drone-keyboard-key--selected(:class="{'drone-keyboard-key--active' : keyWClass}")
        .drone-keyboard-key__header.drone-keyboard-key__header--key
          | W
        .drone-keyboard-key__footer
          | Up
      template(v-if="isUndefined(droneState)")
        .drone-keyboard-key.drone-keyboard-key--selected(:class="{'drone-keyboard-key--active' : keyEClass}")
          .drone-keyboard-key__header.drone-keyboard-key__header--key
            | E
          .drone-keyboard-key__footer
            | Flip Right
        .drone-keyboard-key.drone-keyboard-key--selected(:class="{'drone-keyboard-key--active' : keyRClass}")
          .drone-keyboard-key__header.drone-keyboard-key__header--key
            | R
          .drone-keyboard-key__footer
            | Flip Back
      template(v-else)
        template(v-if="droneState.bat < 51")
          .drone-keyboard-key.drone-keyboard-key--disable
            .drone-keyboard-key__header.drone-keyboard-key__header--key
              | E
            .drone-keyboard-key__footer
              | Flip Right
          .drone-keyboard-key.drone-keyboard-key--disable
            .drone-keyboard-key__header.drone-keyboard-key__header--key
              | R
            .drone-keyboard-key__footer
              | Flip Back
        template(v-else)
          .drone-keyboard-key.drone-keyboard-key--selected(:class="{'drone-keyboard-key--active' : keyEClass}")
            .drone-keyboard-key__header.drone-keyboard-key__header--key
              | E
            .drone-keyboard-key__footer
              | Flip Right
          .drone-keyboard-key.drone-keyboard-key--selected(:class="{'drone-keyboard-key--active' : keyRClass}")
            .drone-keyboard-key__header.drone-keyboard-key__header--key
              | R
            .drone-keyboard-key__footer
              | Flip Back
      .drone-keyboard-key
        .drone-keyboard-key__header
        .drone-keyboard-key__footer
      .drone-keyboard-key
        .drone-keyboard-key__header
        .drone-keyboard-key__footer
      .drone-keyboard-key
        .drone-keyboard-key__header
        .drone-keyboard-key__footer
      .drone-keyboard-key
        .drone-keyboard-key__header
        .drone-keyboard-key__footer
      .drone-keyboard-key
        .drone-keyboard-key__header
        .drone-keyboard-key__footer
      .drone-keyboard-key.drone-keyboard-key--patreon(@click="openExternalLink('https://www.patreon.com/dnomak')")
        .drone-keyboard-key__header
          .icon
            img(src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OUQyNTFFNzMwOTUwMTFFOTg5NThDMTcxOTRGODE2RUEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OUQyNTFFNzQwOTUwMTFFOTg5NThDMTcxOTRGODE2RUEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo5RDI1MUU3MTA5NTAxMUU5ODk1OEMxNzE5NEY4MTZFQSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo5RDI1MUU3MjA5NTAxMUU5ODk1OEMxNzE5NEY4MTZFQSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Ph0KYkAAAALgSURBVHja7JtNaBNBFMcnoRa1VvEb/DaIgrWIetCTH6UqRTxoPAiaYqGXVnqoKIKIrQcPKn4cxB48qIh4UdBaSrEogh48CGqlItqCVkUPNkpVKAqN/8dOoRRJN+TNzhszD34kh9nM/jabnXlvJrFMJqMKKWLjyqvu4HU6+JWlXQK0/O5qP2voPJaD1WApWACmgfFgEHwDH8Ab8BS8yqejIrAZTAjRdgWzZDnYDbbr92HjJWgHN8CLXDuNg6GQbYeYRDeANtAFjuQoO3yhDoPnWnxTrsJRRQm4DB6CbUyfWQUegEugVJJwpf4N7jP0+bXgLdgqQbgJdII5hvuZDTrAcZvCV0FzxCPPMXDNhvBFUG1puN0LTkUpvBPUWZ5jHALJKIRngltCJlY3wSzTwq3CZpOtJoVrwDphwmv1eRkRPi80ZzhnQjgFJgsVngL2cAs3Cs8MGzmF54NVwoXXgLlcwklH8v8kh/A8sN4R4Y0cwit1xcKFSHAIJ/Rv2IWYyiFMU7eJjgiXcgiXKHeimEPYqTovh/APh3wHOYS/gAFHhAc4hHvBe0eE0xzCz1RQY3YhXnMIf1VBVdKF6OCaS991RLiNSzitghUAyUF34XfOfPikcOHT3AWAe4Kf1u+GnzPcNa2UUOEU50xrZDwC14XJ0vk8NiVMQcsr/UJk+9Wo5R4TwrRwXiFEuEKNWsg3tbZEM6/9lmVr/jUDNL16eMCS7EFwxVR6mC2o4l8ZYQpJO5G2gDMm8+Gx4j5YpsfpKPrpNF0ACBOfVbD/osFA7kzfar2+kz5FUfHIJS6AxSrYh/GR4SKeAItAS9iD4hYeKJRoNIOFYIcKtjL1hTyW2tG+kV36+KM6PQ0dRRaHDRofb2vKVFDQp22HM8AkUAz+6AdeWstSsaE7n05tCo+M7nxFJN/SVsMLe2Ev7IW9sBf2wl7YC5sUjhfSxaHk4YnOUH5mabcE9PwPwrFC+yveXwEGABGifWbqU4yeAAAAAElFTkSuQmCC")
        .drone-keyboard-key__footer
          | Patreon
      .drone-keyboard-key
        .drone-keyboard-key__header
        .drone-keyboard-key__footer
      .drone-keyboard-key
        .drone-keyboard-key__header
        .drone-keyboard-key__footer
      .drone-keyboard-key.drone-keyboard-key--selected(:class="{'drone-keyboard-key--active' : keyBackspaceClass}", style="width: 107px;")
        .drone-keyboard-key__header.drone-keyboard-key__header--middle
          | Backspace
        .drone-keyboard-key__footer
          | Emergency
    div
      .drone-keyboard-key.drone-keyboard-key--first(style="width: 126px;")
        .drone-keyboard-key__header
        .drone-keyboard-key__footer
      .drone-keyboard-key.drone-keyboard-key--selected(:class="{'drone-keyboard-key--active' : keyAClass}")
        .drone-keyboard-key__header.drone-keyboard-key__header--key
          | A
        .drone-keyboard-key__footer
          | Turn Left
      .drone-keyboard-key.drone-keyboard-key--selected(:class="{'drone-keyboard-key--active' : keySClass}")
        .drone-keyboard-key__header.drone-keyboard-key__header--key
          | S
        .drone-keyboard-key__footer
          | Down
      .drone-keyboard-key.drone-keyboard-key--selected(:class="{'drone-keyboard-key--active' : keyDClass}")
        .drone-keyboard-key__header.drone-keyboard-key__header--key
          | D
        .drone-keyboard-key__footer
          | Turn Right
      .drone-keyboard-key
        .drone-keyboard-key__header
        .drone-keyboard-key__footer
      .drone-keyboard-key.drone-keyboard-key--github(@click="openExternalLink('https://github.com/dnomak/drone-keyboard')")
        .drone-keyboard-key__header
          .icon
            font-awesome-icon(:icon="['fab', 'github']")
        .drone-keyboard-key__footer
          | GitHub
      .drone-keyboard-key
        .drone-keyboard-key__header
        .drone-keyboard-key__footer
      .drone-keyboard-key
        .drone-keyboard-key__header
        .drone-keyboard-key__footer
      .drone-keyboard-key
        .drone-keyboard-key__header
        .drone-keyboard-key__footer
      .drone-keyboard-key
        .drone-keyboard-key__header
        .drone-keyboard-key__footer
      .drone-keyboard-key
        .drone-keyboard-key__header
        .drone-keyboard-key__footer
      .drone-keyboard-key
        .drone-keyboard-key__header
        .drone-keyboard-key__footer
      .drone-keyboard-key.drone-keyboard-key--selected(:class="{'drone-keyboard-key--active' : keyEnterClass}", style="width: 160px;")
        .drone-keyboard-key__header.drone-keyboard-key__header--middle
          | Enter
        .drone-keyboard-key__footer
          | Takeoff
    div
      .drone-keyboard-key.drone-keyboard-key--first(v-if="stream" :class="{'drone-keyboard-key--disable' : stream}", style="width: 107px;")
        .drone-keyboard-key__header.drone-keyboard-key__header--middle
          | Shift
        .drone-keyboard-key__footer
          | Start Stream
      .drone-keyboard-key.drone-keyboard-key--first.drone-keyboard-key--selected(v-else, :class="{'drone-keyboard-key--active' : keyShiftLeftClass}", style="width: 107px;")
        .drone-keyboard-key__header.drone-keyboard-key__header--middle
          | Shift
        .drone-keyboard-key__footer
          | Start Stream
      .drone-keyboard-key
        .drone-keyboard-key__header
        .drone-keyboard-key__footer
      .drone-keyboard-key
        .drone-keyboard-key__header
        .drone-keyboard-key__footer
      .drone-keyboard-key
        .drone-keyboard-key__header
        .drone-keyboard-key__footer
      .drone-keyboard-key
        .drone-keyboard-key__header
        .drone-keyboard-key__footer
      .drone-keyboard-key
        .drone-keyboard-key__header
        .drone-keyboard-key__footer
      .drone-keyboard-key.drone-keyboard-key--bug-report(@click="openExternalLink('https://github.com/dnomak/drone-keyboard/issues/new?template=bug_report.md')")
        .drone-keyboard-key__header.drone-keyboard-key__header--key
          | B
        .drone-keyboard-key__footer
          | Bug Report
      .drone-keyboard-key
        .drone-keyboard-key__header
        .drone-keyboard-key__footer
      .drone-keyboard-key
        .drone-keyboard-key__header
        .drone-keyboard-key__footer
      .drone-keyboard-key
        .drone-keyboard-key__header
        .drone-keyboard-key__footer
      .drone-keyboard-key
        .drone-keyboard-key__header
        .drone-keyboard-key__footer
      .drone-keyboard-key(style="width: 106px;")
        .drone-keyboard-key__header
        .drone-keyboard-key__footer
      .drone-keyboard-key.drone-keyboard-key--selected(:class="{'drone-keyboard-key--active' : arrowUpClass}")
        .drone-keyboard-key__header
          .icon
            font-awesome-icon(:icon="['fas', 'caret-up']")
        .drone-keyboard-key__footer
          | Forward
      .drone-keyboard-key
        .drone-keyboard-key__header
        .drone-keyboard-key__footer
    .drone-keyboard__bottom
      .drone-keyboard-key.drone-keyboard-key--first
        .drone-keyboard-key__header
        .drone-keyboard-key__footer
      .drone-keyboard-key
        .drone-keyboard-key__header
        .drone-keyboard-key__footer
      .drone-keyboard-key
        .drone-keyboard-key__header
        .drone-keyboard-key__footer
      .drone-keyboard-key(style="width: 90px;")
        .drone-keyboard-key__header
        .drone-keyboard-key__footer
      template(v-if="isUndefined(droneState)")
        .drone-keyboard-key.drone-keyboard-key--selected(:class="{'drone-keyboard-key--active' : keySpaceClass}", style="width: 395px;")
          .drone-keyboard-key__header.drone-keyboard-key__header--center
            | Space
          .drone-keyboard-key__footer
            | Flip Forward
      template(v-else)
        template(v-if="droneState.bat < 51")
          .drone-keyboard-key.drone-keyboard-key--disable(style="width: 395px;")
            .drone-keyboard-key__header.drone-keyboard-key__header--center
              | Space
            .drone-keyboard-key__footer
              | Flip Forward
        template(v-else)
          .drone-keyboard-key.drone-keyboard-key--selected(:class="{'drone-keyboard-key--active' : keySpaceClass}", style="width: 395px;")
            .drone-keyboard-key__header.drone-keyboard-key__header--center
              | Space
            .drone-keyboard-key__footer
              | Flip Forward
      .drone-keyboard-key(style="width: 90px;")
        .drone-keyboard-key__header
        .drone-keyboard-key__footer
      .drone-keyboard-key
        .drone-keyboard-key__header
        .drone-keyboard-key__footer
      .drone-keyboard-key.drone-keyboard-key--selected(:class="{'drone-keyboard-key--active' : arrowLeftClass}")
        .drone-keyboard-key__header
          .icon
            font-awesome-icon(:icon="['fas', 'caret-left']")
        .drone-keyboard-key__footer
          | Left
      .drone-keyboard-key.drone-keyboard-key--selected(:class="{'drone-keyboard-key--active' : arrowDownClass}")
        .drone-keyboard-key__header
          .icon
            font-awesome-icon(:icon="['fas', 'caret-down']")
        .drone-keyboard-key__footer
          | Back
      .drone-keyboard-key.drone-keyboard-key--selected(:class="{'drone-keyboard-key--active' : arrowRightClass}")
        .drone-keyboard-key__header
          .icon
            font-awesome-icon(:icon="['fas', 'caret-right']")
        .drone-keyboard-key__footer
          | Right
  .drone-keyboard-footer
    .drone-keyboard-developer
      .drone-keyboard-developer__image(@click="openExternalLink('https://dnomak.com')")
        img(src="data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABkAAD/4QMqaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzE0MCA3OS4xNjA0NTEsIDIwMTcvMDUvMDYtMDE6MDg6MjEgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjRDN0IwNUZBMEFCNTExRTk4RjQ5Q0Q2MUVFNTUxNDdDIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjRDN0IwNUY5MEFCNTExRTk4RjQ5Q0Q2MUVFNTUxNDdDIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyBNYWNpbnRvc2giPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpFMTQ3RkM1M0IyQzExMUU3OTk1RDlFQzVCMEFDNTJCQyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpFMTQ3RkM1NEIyQzExMUU3OTk1RDlFQzVCMEFDNTJCQyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pv/uAA5BZG9iZQBkwAAAAAH/2wCEAAEBAQEBAQEBAQEBAQEBAQEBAQEB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")
      .drone-keyboard-developer__desc.drone-keyboard-developer__desc--developed-by(@click="openExternalLink('https://dnomak.com')")
        | developed by
      .drone-keyboard-developer__title(@click="openExternalLink('https://dnomak.com')")
        | Doğukan Güven Nomak
      .drone-keyboard-developer__desc(@click="openExternalLink('https://www.edelkrone.com?utm_source=dronekeyboard&utm_medium=footer')")
        | Senior Frontend Developer at <span>edelkrone</span>
      .inspired-by
        | Inspired by
        .icon
          font-awesome-icon(:icon="['fas', 'heart']")
        | <span class="link" @click="openExternalLink('https://github.com/wesbos/javascript-drones')">Wes Bos</span> and <span class="link" @click="openExternalLink('https://dribbble.com/shots/5126767-HHKB')">Pynoth</span>
</template>

<script>
import isUndefined from 'lodash/isUndefined'
import { useState, useEffect } from 'vue-hooks'
import io from 'socket.io-client'
const socket = io('http://localhost:6767')

function useDroneState () {
  const [droneState, updateDroneState] = useState()
  useEffect(() => {
    socket.on('dronestate', updateDroneState)
    return () => socket.removeListener('dronestate')
  }, [])
  return droneState
}

export default {
  data () {
    return {
      stream: false,
      isElectron: false,
      howToConnectInfo: false,
      downloadInfo: false,
      flightSpeed: 60,
      a: 0,
      b: 0,
      c: 0,
      d: 0,
      arrowLeft: 37,
      arrowLeftClass: false,
      arrowRight: 39,
      arrowRightClass: false,
      arrowUp: 38,
      arrowUpClass: false,
      arrowDown: 40,
      arrowDownClass: false,
      keyW: 87,
      keyWClass: false,
      keyS: 83,
      keySClass: false,
      keyA: 65,
      keyAClass: false,
      keyD: 68,
      keyDClass: false,
      keyEscape: 27,
      keyEscapeClass: false,
      keySpace: 32,
      keySpaceClass: false,
      keyBackspace: 8,
      keyBackspaceClass: false,
      keyEnter: 13,
      keyEnterClass: false,
      keyQ: 81,
      keyQClass: false,
      keyE: 69,
      keyEClass: false,
      keyR: 82,
      keyRClass: false,
      keyDigit8: 56,
      keyDigit8Class: false,
      keyDigit9: 57,
      keyDigit9Class: false,
      keyShiftLeft: 16,
      keyShiftLeftClass: false
    }
  },
  mounted () {
    /* eslint-disable no-undef */
    if (electron) {
      this.isElectron = true
    } else {
      this.isElectron = false
    }
    if (this.getParameterByName('stream') === 'on') {
      this.stream = true
    } else {
      this.stream = false
    }
    window.addEventListener('keydown', (e) => {
      if (e.keyCode === 80) {
        this.openExternalLink('https://www.patreon.com/dnomak')
      }
      if (e.keyCode === 71) {
        this.openExternalLink('https://github.com/dnomak/drone-keyboard')
      }
      if (e.keyCode === 66) {
        this.openExternalLink('https://github.com/dnomak/drone-keyboard/issues/new?template=bug_report.md')
      }
      if (e.keyCode === this.keyDigit8) {
        this.keyDigit8Class = true
        if (this.flightSpeed > 10) {
          this.flightSpeed = this.flightSpeed - 10
        }
      }
      if (e.keyCode === this.keyDigit9) {
        this.keyDigit9Class = true
        if (this.flightSpeed < 100) {
          this.flightSpeed = this.flightSpeed + 10
        }
      }
      if (e.keyCode === this.keyShiftLeft) {
        this.keyShiftLeftClass = true
      }
      if (e.keyCode === this.keyEscape) {
        this.keyEscapeClass = true
        socket.emit('command', `land`)
      }
      if (e.keyCode === this.keySpace) {
        e.preventDefault()
        this.keySpaceClass = true
        socket.emit('command', `flip f`)
      }
      if (e.keyCode === this.keyQ) {
        this.keyQClass = true
        socket.emit('command', `flip l`)
      }
      if (e.keyCode === this.keyE) {
        this.keyEClass = true
        socket.emit('command', `flip r`)
      }
      if (e.keyCode === this.keyR) {
        this.keyRClass = true
        socket.emit('command', `flip b`)
      }
      if (e.keyCode === this.keyBackspace) {
        this.keyBackspaceClass = true
        socket.emit('command', `emergency`)
      }
      if (e.keyCode === this.keyEnter) {
        this.keyEnterClass = true
        socket.emit('command', `takeoff`)
      }
      if (e.keyCode === this.arrowLeft) {
        this.arrowLeftClass = true
        this.a = `-${this.flightSpeed}`
      }
      if (e.keyCode === this.arrowRight) {
        this.arrowRightClass = true
        this.a = `${this.flightSpeed}`
      }
      if (e.keyCode === this.arrowUp) {
        e.preventDefault()
        this.arrowUpClass = true
        this.b = `${this.flightSpeed}`
      }
      if (e.keyCode === this.arrowDown) {
        e.preventDefault()
        this.arrowDownClass = true
        this.b = `-${this.flightSpeed}`
      }
      if (e.keyCode === this.keyW) {
        this.keyWClass = true
        this.c = `${this.flightSpeed}`
      }
      if (e.keyCode === this.keyS) {
        this.keySClass = true
        this.c = `-${this.flightSpeed}`
      }
      if (e.keyCode === this.keyA) {
        this.keyAClass = true
        this.d = `-${this.flightSpeed}`
      }
      if (e.keyCode === this.keyD) {
        this.keyDClass = true
        this.d = `${this.flightSpeed}`
      }
      socket.emit('command', `rc ${this.a} ${this.b} ${this.c} ${this.d}`)
    })
    window.addEventListener('keyup', (e) => {
      if (e.keyCode === this.keyDigit8) {
        this.keyDigit8Class = false
      }
      if (e.keyCode === this.keyDigit9) {
        this.keyDigit9Class = false
      }
      if (e.keyCode === this.keyShiftLeft) {
        this.keyShiftLeftClass = false
        socket.emit('command', `streamon`)
        if (!this.stream && this.isElectron) {
          this.openExternalLink('http://localhost:2020?stream=on')
        }
      }
      if (e.keyCode === this.keyEscape) {
        this.keyEscapeClass = false
      }
      if (e.keyCode === this.keySpace) {
        e.preventDefault()
        this.keySpaceClass = false
      }
      if (e.keyCode === this.keyQ) {
        this.keyQClass = false
      }
      if (e.keyCode === this.keyE) {
        this.keyEClass = false
      }
      if (e.keyCode === this.keyR) {
        this.keyRClass = false
      }
      if (e.keyCode === this.keyBackspace) {
        this.keyBackspaceClass = false
      }
      if (e.keyCode === this.keyEnter) {
        this.keyEnterClass = false
      }
      if (e.keyCode === this.keyW) {
        this.keyWClass = false
      }
      if (e.keyCode === this.keyS) {
        this.keySClass = false
      }
      if (e.keyCode === this.keyA) {
        this.keyAClass = false
      }
      if (e.keyCode === this.keyD) {
        this.keyDClass = false
      }
      if (e.keyCode === this.arrowLeft) {
        this.arrowLeftClass = false
      }
      if (e.keyCode === this.arrowRight) {
        this.arrowRightClass = false
      }
      if (e.keyCode === this.arrowUp) {
        e.preventDefault()
        this.arrowUpClass = false
      }
      if (e.keyCode === this.arrowDown) {
        e.preventDefault()
        this.arrowDownClass = false
      }
      if (e.keyCode === this.arrowLeft || e.keyCode === this.arrowRight) {
        this.a = 0
      }
      if (e.keyCode === this.arrowUp || e.keyCode === this.arrowDown) {
        this.b = 0
      }
      if (e.keyCode === this.keyW || e.keyCode === this.keyS) {
        this.c = 0
      }
      if (e.keyCode === this.keyA || e.keyCode === this.keyD) {
        this.d = 0
      }
      socket.emit('command', `rc ${this.a} ${this.b} ${this.c} ${this.d}`)
    })
  },
  hooks () {
    const droneState = useDroneState()
    return {
      droneState
    }
  },
  methods: {
    howToConnectInfoButton () {
      this.howToConnectInfo = !this.howToConnectInfo
    },
    downloadInfoButton () {
      this.downloadInfo = !this.downloadInfo
    },
    sendCommand (command) {
      socket.emit('command', command)
    },
    openExternalLink (link) {
      if (this.isElectron) {
        socket.emit('link', link)
      } else {
        window.open(link, '_blank')
      }
    },
    relunch () {
      socket.emit('relunch', 'relunch')
    },
    isUndefined: (data) => {
      return isUndefined(data)
    },
    getParameterByName: (name) => {
      /* eslint-disable no-useless-escape */
      const url = window.location.href
      name = name.replace(/[\[\]]/g, '\\$&')
      const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)')
      const results = regex.exec(url)
      if (!results) return null
      if (!results[2]) return ''
      return decodeURIComponent(results[2].replace(/\+/g, ' '))
    }
  }
}
</script>

<style lang="scss">
::selection {
  background: white;
}
.xl-lh0 {
  line-height: 0;
}
html,
body {
  background: #E8E8E8;
  text-align: left;
  font-family: 'Roboto', sans-serif;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  height: 100vh;
  overflow: auto;
  display: table;
  text-align: center;
  width: 100%;
  min-width: 1116px;
}
.container {
  width: 1116px;
  display: table-cell;
  vertical-align: middle;
}
.drone-keyboard-status-bar {
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  right: 0;
  display: block;
  background: #222222;
  color: #ffffff;
  line-height: 16px;
  padding: 6px 3px 0 3px;
  height: 24px;
}
.drone-keyboard-status-bar__item {
  color: #a1a1a1;
  position: relative;
  display: inline-block;
  font-size: 11px;
  padding: 0 6px;
  height: 14px;
  line-height: 14px;
  span {
    font-weight: 700;
    color: #ffffff;
  }
  .icon {
    vertical-align: middle;
    display: inline-block;
    line-height: 0;
    svg {
      width: auto !important;
      height: 14px !important;
    }
    svg,
    path {
      fill: #a1a1a1;
    }
  }
  .text {
    padding-left: 6px;
    vertical-align: middle;
    display: inline-block;
  }
}
.drone-keyboard-content__close {
  position: absolute;
  cursor: pointer;
  top: 36px;
  right: 12px;
  .icon {
    vertical-align: middle;
    display: inline-block;
    line-height: 0;
    svg {
      width: auto !important;
      height: 30px !important;
    }
    svg,
    path {
      fill: #222222;
    }
  }
}
.drone-keyboard-status-bar__item--link {
  cursor: pointer;
  color: #ffffff;
  .text {
    text-decoration: underline;
  }
}
.drone-keyboard-content {
  display: table-cell;
  vertical-align: middle;
  padding-top: 24px;
}
.drone-keyboard-content-inner {
  padding: 0 24px;
  text-align: left;
}
.drone-keyboard-content-inner--center {
  text-align: center;
}
.drone-keyboard-content__how-to-connect-title {
  font-weight: 700;
  margin-bottom: 3px;
  font-size: 16px;
  line-height: 20px;
}
.drone-keyboard-content__how-to-connect-desc {
  font-size: 14px;
  line-height: 20px;
  span {
    font-weight: 700;
  }
  .link {
    text-decoration: underline;
    cursor: pointer;
  }
}
.drone-keyboard-content__safety-first {
  margin-bottom: 12px;
  .drone-keyboard-content__how-to-connect-title {
    font-size: 12px;
    line-height: 18px;
  }
  .drone-keyboard-content__how-to-connect-desc {
    font-size: 12px;
    line-height: 18px;
  }
}
.drone-keyboard-content__image {
  margin: 0 auto;
  display: inline-block;
  line-height: 0;
  width: 108px;
  position: relative;
  img {
    width: 108px;
  }
  .icon {
    z-index: 2;
    position: absolute;
    top: -28px;
    right: -16px;
    vertical-align: middle;
    display: inline-block;
    line-height: 0;
    svg {
      width: auto !important;
      height: 48px !important;
    }
    svg,
    path {
      fill: #222222;
    }
  }
}
.drone-keyboard-content__button {
  cursor: pointer;
  display: inline-block;
  padding: 8px 24px;
  background: #222222;
  color: #ffffff;
  border-radius: 100px;
  margin-top: 12px;
  margin-bottom: 10px;
  border: 3px solid #222222;
}
.drone-keyboard-content__build-locally {
  cursor: pointer;
  text-align: center;
  font-size: 14px;
  color: #222222;
  line-height: 28px;
  cursor: pointer;
  text-decoration: underline;
  font-weight: 700;
}
.drone-keyboard-content__forgot-password-title {
  font-weight: 700;
  margin-bottom: 3px;
  font-size: 12px;
  line-height: 18px;
}
.drone-keyboard-content__forgot-password-desc {
  font-size: 12px;
  line-height: 18px;
  span {
    font-weight: 700;
  }
}
.drone-keyboard-content__title {
  position: relative;
  z-index: 2;
  display: block;
  text-align: center;
  font-weight: 700;
  font-size: 40px;
  line-height: normal;
  color: #ffffff;
  text-shadow: 0 0 16px #000000;
}
.drone-keyboard-content__subtitle {
  position: relative;
  z-index: 2;
  font-family: 'Kaushan Script', cursive;
  display: block;
  font-weight: 700;
  padding-left: 4px;
  font-size: 37px;
  color: #ffffff;
  text-shadow: 0 0 16px #000000;
}
.drone-keyboard-content__watch-demo {
  position: relative;
  z-index: 2;
  cursor: pointer;
  display: inline-block;
  padding: 12px 24px;
  background: #0089D6;
  color: #ffffff;
  font-weight: 700;
  border-radius: 100px;
  margin-top: 24px;
  margin-bottom: 10px;
  border: 3px solid #ffffff;
  box-shadow: 0 0 16px #000000;
}
.drone-keyboard__subtitles {
  position: relative;
  z-index: 2;
  color: #ffffff;
  font-weight: 400;
  display: block;
  margin-top: 4px;
  font-size: 12px;
  text-shadow: 0 0 16px #000000;
}
.drone-keyboard-content__stream {
  background: #222222;
  line-height: 0;
  width: 100%;
  img {
    max-width: 100%;
  }
}
.drone-keyboard-video {
  background: #F5F5F5;
  border: 3px solid #222222;
  border-bottom: 0;
  border-radius: 12px 12px 0 0;
  width: 600px;
  margin: 0 auto;
  margin-bottom: -3px;
  position: relative;
  z-index: 2;
  margin-top: 24px;
}
.drone-keyboard-video__content {
  border: 3px solid #222222;
  border-radius: 8px 8px 0 0;
  margin: 6px 6px 0 6px;
  width: 582px;
  height: 461px;
  position: relative;
  display: table;
  background: #222222;
  &::after {
    content: "";
    background: #222222 url(https://media.giphy.com/media/1jkXOfaXWm12cJK79u/giphy.gif) center bottom no-repeat;
    background-size: 584px auto;
    opacity: 0.2;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    position: absolute;
    z-index: 1;
  }
}
.drone-keyboard {
  background: #F5F5F5;
  border: 3px solid #222222;
  border-radius: 12px;
  font-size: 0;
  margin: 0 auto;
  overflow: hidden;
  display: inline-block;
  padding: 9px 6px 6px 9px;
  text-align: left;
}
.drone-keyboard-key {
  position: relative;
  display: inline-block;
  width: 70px;
  background: #E8E8E8;
  border: 3px solid #222222;
  margin-left: -3px;
  margin-top: -3px;
  padding: 0;
  border-radius: 8px;
  vertical-align: top;
  &:after {
    position: absolute;
    left: -4px;
    bottom: -3px;
    z-index: 1;
    content: "";
    width: 5px;
    height: 5px;
    border-radius: 5px;
    background: #222222;
  }
  &:before {
    position: absolute;
    left: -4px;
    top: -3px;
    z-index: 1;
    content: "";
    width: 5px;
    height: 5px;
    border-radius: 5px;
    background: #222222;
  }
}
.drone-keyboard__top {
  .drone-keyboard-key {
    &:before {
      display: none;
    }
  }
}
.drone-keyboard__bottom {
  .drone-keyboard-key {
    &:after {
      display: none;
    }
  }
}
.drone-keyboard-key--first {
  &:before {
    display: none;
  }
  &:after {
    display: none;
  }
}
.drone-keyboard-key--selected {
  background: #A2A9B8;
  .drone-keyboard-key__header {
    background: #CDD0D9;
  }
}
.drone-keyboard-key--active {
  background: #0085DB;
  .drone-keyboard-key__header {
    background: #0097F7;
    color: #ffffff;
    .icon {
      svg,
      path {
        fill: #ffffff;
      }
    }
  }
  .drone-keyboard-key__footer {
    color: #ffffff;
  }
}
.drone-keyboard-key--disable.drone-keyboard-key--active,
.drone-keyboard-key--disable {
  background: #E8E8E8;
  .drone-keyboard-key__header {
    background: #FFFFFF;
    color: rgba(34, 34, 34, 0.5);
  }
  .drone-keyboard-key__footer {
    color: rgba(34, 34, 34, 0.5);
  }
}
.drone-keyboard-key__header {
  background: #ffffff;
  border-radius: 6px;
  height: 30px;
  margin: 3px 6px 0 6px;
  color: #222222;
  display: block;
  text-align: center;
  padding: 6px;
  .icon {
    vertical-align: middle;
    display: inline-block;
    line-height: 0;
    svg {
      width: auto !important;
      height: 30px !important;
    }
    svg,
    path {
      fill: #222222;
    }
  }
}
.drone-keyboard-key--bug-report {
  cursor: pointer;
}
.drone-keyboard-key--github {
  cursor: pointer;
  .icon {
    vertical-align: middle;
    display: inline-block;
    line-height: 0;
    svg {
      width: auto !important;
      height: 30px !important;
    }
    svg,
    path {
      fill: #222222;
    }
  }
}
.drone-keyboard-key--patreon {
  background: #e86056;
  cursor: pointer;
  .drone-keyboard-key__header {
    background: #FF6A5E;
  }
  .drone-keyboard-key__footer {
    color: #FFFFFF;
  }
  .icon {
    vertical-align: middle;
    display: inline-block;
    line-height: 0;
    img {
      width: auto !important;
      height: 30px !important;
    }
  }
}
.drone-keyboard-key__header--middle {
  font-size: 14px;
  font-weight: 700;
  line-height: 30px;
}
.drone-keyboard-key__header--center {
  font-size: 14px;
  font-weight: 700;
  line-height: 30px;
}
.drone-keyboard-key__header--key {
  font-size: 18px;
  font-weight: 700;
  line-height: 30px;
}
.drone-keyboard-key__footer {
  font-size: 10px;
  color: #222222;
  font-weight: 400;
  line-height: 19px;
  height: 19px;
  text-align: center;
}
.drone-keyboard-key--buy-now {
  cursor: pointer;
}
.drone-keyboard-footer {
  text-align: center;
  font-size: 14px;
  color: #222222;
  line-height: 28px;
  .inspired-by {
    margin-top: 8px;
    color: #222222;
    .link {
      cursor: pointer;
      text-decoration: underline;
      font-weight: 700;
    }
  }
  .icon {
    vertical-align: middle;
    display: inline-block;
    line-height: 0;
    padding-left: 4px;
    padding-right: 4px;
    svg {
      width: auto !important;
      height: 14px !important;
    }
    svg,
    path {
      fill: #F72848;
    }
  }
}
.drone-keyboard-developer {
  padding: 24px 0 24px 80px;
  width: 254px;
  margin: 0 auto;
  position: relative;
  text-align: left;
}
.drone-keyboard-developer__image {
  cursor: pointer;
  position: absolute;
  line-height: 0;
  top: 24px;
  left: 0;
  border-radius: 50%;
  overflow: hidden;
  img {
    width: 68px;
  }
}
.drone-keyboard-developer__title {
  cursor: pointer;
  font-size: 18px;
  line-height: 28px;
}
.drone-keyboard-developer__desc {
  cursor: pointer;
  line-height: 20px;
  font-weight: 400;
  span {
    text-decoration: underline;
    font-weight: 700;
  }
}
.drone-keyboard-developer__desc--developed-by {
  line-height: 18px;
}
</style>
