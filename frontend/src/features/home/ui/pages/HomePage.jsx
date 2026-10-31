import { Headphones, Music2 } from "lucide-react";
import { useNavigate } from "react-router";

const featuredSearches = [
  { title: "Samjho Na", query: "samjho_na", color: "from-emerald-700 to-emerald-950" },
  { title: "Bheege Honth", query: "bheege", color: "from-blue-700 to-blue-950" },
  { title: "Blinding Lights", query: "blinding_lights", color: "from-fuchsia-700 to-fuchsia-950" },
  { title: "Starboy", query: "starboy", color: "from-amber-700 to-amber-950" },
];

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
      <header className="space-y-2">
        <p className="text-sm font-semibold text-[#1ed760]">Your music, your mood</p>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Good evening
        </h1>
      </header>

      <section aria-labelledby="featured-heading">
        <div className="mb-4 flex items-center gap-2">
          <Headphones size={20} className="text-[#1ed760]" aria-hidden="true" />
          <h2 id="featured-heading" className="text-xl font-bold">
            Jump back in
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {featuredSearches.map(({ title, query, color }) => (
            <button
              key={query}
              type="button"
              onClick={() => navigate(`/main/songs/${query}`)}
              className={`group flex min-h-20 items-center gap-4 overflow-hidden rounded-md bg-gradient-to-r ${color} text-left transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white`}
            >
              <span className="grid size-20 shrink-0 place-items-center bg-black/20">
                <Music2 size={26} aria-hidden="true" />
              </span>
              <span className="min-w-0 pr-3 font-bold">{title}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="rounded-lg bg-white/[0.04] p-5 sm:p-7">
        <h2 className="text-xl font-bold">Find your next favorite</h2>
        <p className="mt-2 max-w-xl text-sm leading-6 text-[#b3b3b3]">
          Search for a track and discover music to add to your listening queue.
          Pick one of the featured searches above to get started.
        </p>
      </section>
    </div>
  );
};

export default HomePage;
