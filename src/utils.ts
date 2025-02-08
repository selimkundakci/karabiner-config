import exp from 'constants'
import {
    KeyAlias,
    LetterKeyCode,
    map,
    mapSimultaneous,
    ModifierKeyAlias,
    modifierKeyAliases,
    MultiModifierAlias,
    multiModifierAliases,
    SideModifierAlias,
    to$,
    ToEvent,
    toRemoveNotificationMessage,
  } from 'karabiner.ts'
  
  /** Back/Forward history in most apps. */
  export function historyNavi() {
    return [
      map('h', '⌃').to('[', '⌘'), //
      map('l', '⌃').to(']', '⌘'),
    ]
  }
  
  /** Pre/Next tab in most apps. */
  export function tabNavi() {
    return [
      map('h', '⌥').to('[', '⌘⇧'), //
      map('l', '⌥').to(']', '⌘⇧'),
    ]
  }
  
  /** Pre/Next switcher in most apps. */
  export function switcher() {
    return [
      map('h', '⌘⌥⌃').to('⇥', '⌃⇧'), //
      map('l', '⌘⌥⌃').to('⇥', '⌃'),
    ]
  }
  
  /**
   * Map when tap a modifier key; keep as modifier when hold.
   *
   * - ‹⌘ Show/Hide UI (e.g. left sidebars, or all UI)
   * - ‹⌥ Run current task (re-run)
   * - ‹⌃ Run list
   *
   * - ›⌘ Show/Hide UI (e.g. right sidebars, or terminal)
   * - ›⌥ Command Palette (e.g. ⌘K, ⌘P)
   * - ›⌃ History (e.g. recent files)
   */
  export function tapModifiers(
    v: Partial<Record<SideModifierAlias | 'fn', ToEvent>>,
  ) {
    return Object.entries(v).map(([k, to]) => {
      let key = k as SideModifierAlias | 'fn'
      return map(key).to(key).toIfAlone(to)
    })
  }
  
  export function raycastExt(name: string) {
    return to$(`open raycast://extensions/${name}`)
  }
  
  export function raycastWin(name: string) {
    return to$(`open -g raycast://extensions/raycast/window-management/${name}`)
  }

  export function spotify(name: string) {
    return to$(`open -g raycast://extensions/mattisssa/spotify-player/${name}`)
  }