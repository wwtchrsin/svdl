import { PUBLIC_BACKEND_SERVER } from "$env/static/public"

export interface File {
  src: string
  quality: string
  url: string
  message: string
  error: boolean
}

export const getVideoId = async (url: string, quality: "high" | "medium" | "low", label: string | undefined) => {
  const request = {
    method: "POST",
    body: JSON.stringify({ url, quality, label }),
    headers: { "Content-Type": "application/json" },
  }
  const response = await fetch(`${PUBLIC_BACKEND_SERVER}/url`, request)
  if ( !response.ok || response.status > 299 ) {
    return undefined
  }
  try {
    const responseData = await response.json()
    if ( responseData.uid ) {
      return responseData.uid
    }
  } catch (err) {}
  return undefined
}

export const checkVideoStatus = async (uid: string) => {
  const timestamp = (new Date()).valueOf()
  const response = await fetch(`${PUBLIC_BACKEND_SERVER}/video/${uid}?timestamp=${timestamp}`)
  if ( !response.ok || response.status > 299 ) {
    return {
      error: true,
      url: undefined,
      message: undefined,
    }
  }
  try {
    const responseData = await response.json()
    return {
      error: !!responseData.error,
      url: responseData.url,
      message: responseData.message,
    }
  } catch (err) {}
  return {
    error: true,
    url: undefined,
    message: undefined,
  }
}

export const getVideoSet = async (label: string) => {
  const timestamp = (new Date()).valueOf()
  const response = await fetch(`${PUBLIC_BACKEND_SERVER}/sets/${label}?timestamp=${timestamp}`)
  if ( !response.ok || response.status > 299 ) {
    return {
      files: [],
      error: true,
    }
  }
  try {
    const data = await response.json()
    if ( data.files && (data.files.length || data.files.length === 0) ) {
      return {
        files: data.files as File[],
        error: false,
      }
    }
  } catch(err) {}
  return {
    files: [],
    error: true,
  }
}

export const sleep = async (ms: number) => {
  return new Promise((res, rej) => {
    setTimeout(() => res(true), ms)
  })
}

export const encodeString = (str: string) => (new TextEncoder()).encode(str).join("F")

export const decodeString = (str: string) => {
  const charArray = new Uint8Array(str.split("F").map(v => +v))
  for ( let i=0; i < charArray.length; i++ ) {
    if ( isNaN(charArray[i]) || charArray[i] < 1 ) {
      throw new Error()
    }
  }
  return (new TextDecoder()).decode(charArray)
}

export const getFileName = (url: string) => 
  decodeURIComponent(url.split("/").at(-1) ?? "<empty>")

export const truncString = (str: string, maxlen: number) => {
  if ( str.length <= maxlen ) {
    return str
  }
  return str.substring(0, maxlen - 3) + "..."
}