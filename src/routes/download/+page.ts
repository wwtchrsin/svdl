import type { PageLoad } from "./$types"
import { getVideoId } from "$lib/utils"
import { decodeUrl } from "$lib/utils"

export const load: PageLoad = async ({ url }) => {
  const encodedUrl = url.searchParams.get("url")
  if ( !encodedUrl ) {
    return { url: undefined, uid: undefined }
  }
  try {
    const decodedUrl = decodeUrl(encodedUrl)
    const uid = await getVideoId(decodedUrl)
    return { url: decodedUrl, uid }
  } catch (err) {
    return { url: undefined, uid: undefined }
  }
}