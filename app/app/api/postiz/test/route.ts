import { NextResponse } from "next/server"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const base = process.env.POSTIZ_API_BASE
    const key = process.env.POSTIZ_API_KEY
    if (!base || !key) return NextResponse.json({ error: "POSTIZ_API_BASE/KEY manquantes" }, { status: 500 })

    const res = await fetch(`${base}/me`, {
      headers: { Authorization: `Bearer ${key}` },
      cache: "no-store",
    })
    const data = await res.json()
    return NextResponse.json(data)
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
