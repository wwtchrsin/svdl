import { writable } from "svelte/store"
import type { Writable } from "svelte/store"
import Cookies from "js-cookie"

export function createStore(key: string, value: string): Writable<string> {
  const { subscribe, set, update } = writable<string>(value)
  return {
    subscribe: subscribe,
    set: (value: string) => {
      Cookies.set(key, value, { expires: 30 })
      set(value)
    },
    update: update,
  }
}