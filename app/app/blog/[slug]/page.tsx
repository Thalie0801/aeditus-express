import { supabase } from "@/lib/supabaseClient";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";

export default async function Article({ params }: { params: { slug: string }}) {
  const { data: article } = await supabase
    .from("articles")
    .select("id, title, seo_title, seo_desc, cover_url, body_md, published_at")
    .eq("slug", params.slug)
    .eq("status","published")
    .single();

  if (!article) return notFound();

  const { data: media } = await supabase
    .from("media")
    .select("type, url, meta")
    .eq("article_id", article.id);

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
      {article.cover_url && <img src={article.cover_url} alt="" className="rounded mb-6" />}
      <article className="prose">
        <ReactMarkdown>{article.body_md || ''}</ReactMarkdown>
      </article>
      {media?.length ? (
        <section className="mt-10">
          <h2 className="text-xl font-semibold mb-3">Media</h2>
          <div className="grid grid-cols-2 gap-4">
            {media.map((m:any, i:number) =>
              m.type === 'image' ? (
                <img key={i} src={m.url} alt="" className="rounded" />
              ) : (
                <video key={i} src={m.url} controls className="rounded" />
              )
            )}
          </div>
        </section>
      ) : null}
    </main>
  );
}
