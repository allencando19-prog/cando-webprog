import { useEffect, useState } from "react";
import Button from "../../components/Button.jsx";
import {
  fetchArticles,
  mapArticleFromApi,
} from "../../services/ArticleService";
import fallbackArticles from "../../data/article-content.js";
import { Link } from "react-router-dom";

const ArticleListPage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError("");
        const { data } = await fetchArticles();
        const mapped = (data.articles ?? [])
          .map((a) => ({ ...mapArticleFromApi(a), id: a._id }))
          .filter((a) => a.isActive);
        setArticles(mapped);
      } catch (err) {
        console.error("Unable to load articles:", err);
        setError("Unable to load articles. Showing featured articles instead.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const displayArticles = articles.length ? articles : fallbackArticles;

  return (
    <div className="flex w-full flex-col gap-6">
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
          Articles
        </p>

        <h1 className="max-w-xl text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
          Featured here are my skills that I have developed so far.
        </h1>

        <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
          These platforms and languages are the ones I've learned from school
          coursework as well as self-learning.
        </p>

        <div className="mt-6">
          <Button to="/">Back Home</Button>
        </div>
      </section>

      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            Featured Articles
          </p>

          <h2 className="mt-2 text-2xl font-semibold text-zinc-900">
            Platforms and Languages I Use:
          </h2>
        </div>

        {error && (
          <div className="mb-5 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            {error}
          </div>
        )}

        {loading ? (
          <div className="rounded-2xl border border-zinc-200 bg-white p-8 text-center text-zinc-700">
            Loading articles...
          </div>
        ) : displayArticles.length === 0 ? (
          <div className="rounded-2xl border border-zinc-200 bg-white p-8 text-center text-zinc-700">
            No articles available.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {displayArticles.map((article) => (
              <Link
                key={article.id ?? article.name}
                to={`/articles/${article.name}`}
                className="group flex flex-col overflow-hidden rounded-2xl border-2 border-zinc-900 bg-white transition hover:shadow-md"
              >
                <div className="aspect-video overflow-hidden bg-zinc-200">
                  {article.imageUrl || article.image ? (
                    <img
                      src={article.imageUrl || article.image}
                      alt={article.title}
                      className="h-full w-full object-cover transition group-hover:scale-105"
                    />
                  ) : (
                    <div className="h-full w-full bg-zinc-100" />
                  )}
                </div>

                <div className="flex flex-1 flex-col gap-2 p-4">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-400">
                    {article.name}
                  </p>
                  <h3 className="text-base font-bold text-zinc-900 group-hover:underline">
                    {article.title}
                  </h3>
                  {article.description && (
                    <p className="line-clamp-2 text-sm leading-6 text-zinc-600">
                      {article.description}
                    </p>
                  )}
                  <div className="mt-auto pt-3">
                    <span className="inline-block rounded-lg border-2 border-zinc-900 px-3 py-1.5 text-xs font-semibold text-zinc-900 transition group-hover:bg-zinc-900 group-hover:text-white">
                      Read More →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default ArticleListPage;
