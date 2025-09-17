"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"

export default function Home() {
  const [message, setMessage] = useState("")

  async function testSupabase() {
    const { data, error } = await supabase.from("profiles").select("*").limit(1)
    setMessage(error ? "Erreur Supabase: " + error.message : JSON.stringify(data, null, 2))
  }

  async function payWithStripe() {
    const res = await fetch("/api/stripe/checkout", { method: "POST" })
    const json = await res.json()
    if (json.url) window.location.href = json.url
    else setMessage("Erreur Stripe: " + (json.error || "inconnue"))
  }

  async function testPostiz() {
    const res = await fetch("/api/postiz/test")
    const data = await res.json()
    setMessage(JSON.stringify(data, null, 2))
  }

  return (
    <main className="p-10">
      <h1 className="text-2xl font-bold">Aeditus — MVP</h1>
      <p className="text-sm opacity-70">Next 14 • App Router • TS • Tailwind • ESLint</p>

      <div className="mt-6 flex gap-3">
        <button onClick={testSupabase} className="px-4 py-2 rounded bg-blue-600 text-white">Tester Supabase</button>
        <button onClick={payWithStripe} className="px-4 py-2 rounded bg-green-600 text-white">Payer avec Stripe</button>
        <button onClick={testPostiz} className="px-4 py-2 rounded bg-purple-600 text-white">Tester Postiz</button>
      </div>

      {message && <pre className="mt-6 p-4 bg-gray-100 rounded whitespace-pre-wrap">{message}</pre>}
    </main>
  )
}
