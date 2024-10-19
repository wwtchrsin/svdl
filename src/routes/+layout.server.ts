import type { LayoutServerLoad } from "./$types"

export const load: LayoutServerLoad = async ({ cookies }) => {
  const label = cookies.get("label") ?? ""
  let quality = cookies.get("quality") ?? ""
  if ( !["high", "medium", "low"].includes(quality) ) {
    quality = "medium"
  }
  const options = { httpOnly: false,  path: "/", maxAge: 86400 * 30 }
  cookies.set("label", label, options)
  cookies.set("quality", quality, options)
  return { 
    label: label,
    quality: quality as "high" | "medium" | "low"
  }
}