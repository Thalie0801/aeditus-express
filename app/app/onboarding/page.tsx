"use client"
import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"

export default function Onboarding() {
  const [brand, setBrand] = useState({ name:"", color:"#6b46c1", linkedin:"" })
  const [msg, setMsg] = useState("")

  async function save() {
    try {
      const { data, error } = await supabase.from("brands").insert({
        name: brand.name, primary_color: brand.color, linkedin: brand.linkedin
      }).select().single()
      if (error) throw error
      setMsg("✅ Marque enregistrée. Vous pouvez aller au Dashboard.")
    } catch (e:any) {
      setMsg("❌ " + (e.message || e))
    }
  }

  return (
    <main className="max-w-xl mx-auto p-8">
      <h1 className="text-2xl font-bold">Onboarding marque</h1>
      <label className="block mt-4">
        <span>Nom</span>
        <input className="border px-3 py-2 w-full" value={brand.name}
               onChange={e=>setBrand({...brand, name:e.target.value})}/>
      </label>
      <label className="block mt-4">
        <span>Couleur primaire</span>
        <input type="color" className="border px-3 py-2" value={brand.color}
               onChange={e=>setBrand({...brand, color:e.target.value})}/>
      </label>
      <label className="block mt-4">
        <span>LinkedIn</span>
        <input className="border px-3 py-2 w-full" value={brand.linkedin}
               onChange={e=>setBrand({...brand, linkedin:e.target.value})}/>
      </label>
      <div className="mt-6 flex gap-3">
        <button onClick={save} className="px-4 py-2 bg-purple-600 text-white rounded">Enregistrer</button>
        <a href="/dashboard" className="px-4 py-2 border rounded">Aller au Dashboard</a>
      </div>
      {msg && <p className="mt-4">{msg}</p>}
    </main>
  )
}
