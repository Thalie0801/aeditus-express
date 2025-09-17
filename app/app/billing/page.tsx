export default function Billing() {
  return (
    <main className="max-w-xl mx-auto p-8">
      <h1 className="text-2xl font-bold">Facturation</h1>
      <p className="mt-2">Gérez votre abonnement et vos factures Stripe.</p>
      <form action="/api/stripe/portal" method="POST" className="mt-6">
        <button className="px-4 py-2 bg-black text-white rounded">Ouvrir le portail Stripe</button>
      </form>
    </main>
  )
}
