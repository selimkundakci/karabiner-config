import {
  hyperLayer,
  ifApp,
  layer,
  map,
  modifierLayer,
  NumberKeyValue,
  rule,
  to$,
  toApp,
  toKey,
  withMapper,
  withModifier,
  writeToProfile,
} from 'karabiner.ts'
import { raycastWin, spotify } from './utils'

writeToProfile('Default', [
  hyper(),
  raycast(),
  layer_launchApp(),
  widnow_management(),
  spotify_commands(),
  symbol_layer(),
  intellijMehGitLayer(),
  intellijMeh(),

  // this has to be last thing otherwise the other layers are being ignored.
  quick_commands(),
])

function hyper() {
  return rule('HyperKey').manipulators([
    map('⇪').toHyper().toIfAlone('⎋'),
    map('fn').toMeh().toIfAlone('fn')
  ])
}

function quick_commands() {
  return rule('quick-commands').manipulators([
    withModifier('Hyper')({
      s: toKey('s', '⌘⇧'),
      c: toKey('v', '⌘⇧'),
      e: toKey('spacebar', '⌘⌃')
    }),
  ])
}

function raycast() {
  let layer = hyperLayer('r', 'Raycast')
  return layer.manipulators({
    n: to$('open raycast://extensions/raycast/raycast-notes/raycast-notes'),
    c: to$('open raycast://extensions/raycast/system/open-camera'),
    p: to$('open -g raycast://extensions/raycast/raycast/confetti'),
    a: toKey('k', '⌥'),
    ',': to$('open raycast://extensions/raycast/raycast-settings/extensions'),
  })
}

function widnow_management() {
  let layer = hyperLayer('w', 'Window Management')
  return layer.manipulators([
    {
      'j': raycastWin('left-half'),
      'k': raycastWin('right-half'),
      'd': raycastWin('next-display'),
      '→': raycastWin('next-desktop'),
      '←': raycastWin('previous-desktop'),
      'c': raycastWin('center'),
      'f': raycastWin('maximize'),
      '↑': raycastWin('make-larger'),
      '↓': raycastWin('make-smaller'),
      ';': toKey('h', '>⌘')
    },
  ])
}

function layer_launchApp() {
  let layer = hyperLayer('o', 'Launch App')
  return layer.manipulators({
    a: toApp("Arc"),
    c: toApp("ChatGPT"),
    i: toApp("IntelliJ IDEA"),
    v: to$(`open -a 'Visual Studio Code.app'`),
    w: to$(`open -a Whatsapp.app`),
    s: toApp("Slack"),
    d: toApp("Discord"),
    t: toApp("Warp"),
    f: toApp("Finder"),
    m: toApp("Spotify"),
    p: toApp("Postman"),
    ',': toApp('System Settings'),
  })
}

function symbol_layer() {
    // It is not required, but recommended to put symbol alias to layers,
  // to make it easier to write '←' instead of 'left_arrow'.
  // Supported alias: https://github.com/evan-liu/karabiner.ts/blob/main/src/utils/key-alias.ts
  return layer('/', 'symbol-layer').manipulators([
    //     / + [ 1    2    3    4    5 ] =>
    withMapper(['⌘', '⌥', '⌃', '⇧', '⇪'])((k, i) =>
      map((i + 1) as NumberKeyValue).toPaste(k),
    ),
    withMapper(['←', '→', '↑', '↓', '␣', '⏎', '⇥', '⎋', '⌫', '⌦', '⇪'])((k) =>
      map(k).toPaste(k),
    ),
  ])
}

function spotify_commands() {
  let layer = hyperLayer('m', 'Music')
  return layer.manipulators({
    l: spotify('like'),
    d: spotify('dislike'),
    '→': spotify('next'),
    '←': spotify('previous'), 
    r: spotify('startRadio'),
    n: spotify('nowPlaying'),
    s: spotify('search'),
    '␣': spotify('togglePlayPause'),
  })
}

function intellijMehGitLayer() {
  let layer = modifierLayer('Meh', 'g').manipulators([{
    n: toKey('b', '⌘⌥⌃⇧'),
    b: toKey('b', '⌘⌥⌃'),
  }]).condition(ifApp('^com.jetbrains.[\\w-]+$'))
  return layer
}

function intellijMeh() {
  return rule('intellij meh').manipulators([
    map('s', 'Meh').to('s', 'Meh'),
    map('f', 'Meh').to('f12', ['fn', '⌘', '⇧']),
    map('l', 'Meh').to('l', '⌘⌥'),
    map('t', 'Meh').to('f12', ['fn', '⌥']),
    map('␣', 'Meh').to('a', '⌘⇧'),
    map('a', 'Meh').to('a', '⌘⇧'),
    map('r', 'Meh').to('r', '⌥⌃'),
  ]).condition(ifApp('^com.jetbrains.[\\w-]+$'))
}