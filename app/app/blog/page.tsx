import { supabase } from "@/lib/supabaseClient";

export default async function Blog() {
  const { data } = await supabase
    .from("articles")
    .select("id, slug, title, seo_desc, published_at")
    .eq("status","published")
    .order("published_at", { ascending: false })
    .limit(20);

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Blog</h1>
      <ul className="space-y-4">
        {data?.map((a:any) => (
          <li key={a.id}>
            <a className="text-blue-600 underline" href={`/blog/${a.slug}`}>{a.title}</a>
            <p className="text-sm text-gray-600">{a.seo_desc}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
