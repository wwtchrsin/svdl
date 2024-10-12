import { PUBLIC_BACKEND_SERVER } from "$env/static/public"

export const getVideoId = async (url: string) => {
  const request = {
    method: "POST",
    body: JSON.stringify({ url }),
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
  const response = await fetch(`${PUBLIC_BACKEND_SERVER}/video/${uid}`)
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

export const sleep = async (ms: number) => {
  return new Promise((res, rej) => {
    setTimeout(() => res(true), ms)
  })
}

export const encodeUrl = (url: string) => (new TextEncoder()).encode(url).join("F")

export const decodeUrl = (url: string) => {
  const charArray = new Uint8Array(url.split("F").map(v => +v))
  for ( let i=0; i < charArray.length; i++ ) {
    if ( isNaN(charArray[i]) || charArray[i] < 1 || charArray[i] > 255 ) {
      throw new Error()
    }
  }
  return (new TextDecoder()).decode(charArray)
}

export const getFileName = (url: string | undefined) => url?.split("/").at(-1)