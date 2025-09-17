import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2024-06-20" })

export async function POST(req: NextRequest) {
  // TODO: récupérer le vrai customerId depuis ta DB / session
  const customerId = process.env.STRIPE_TEST_CUSTOMER_ID // temporaire en test
  if (!customerId) return NextResponse.json({ error: "Pas de customerId" }, { status: 400 })

  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${process.env.NEXT_PUBLIC_APP_URL}/billing`,
  })
  return NextResponse.redirect(session.url, { status: 303 })
}
