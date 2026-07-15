import { SocialIcon } from "react-social-icons";
import { Link } from "react-router-dom";

interface Game {
  id: number;
  title: string;
  description: string;
}

const games: Game[] = [
  {
    id: 2775220,
    title: "Inside the machine",
    description:
      "A simple puzzle platformer game where you control machines to reach the goal.",
  },
  {
    id: 3191960,
    title: "Office Overloaded",
    description:
      "A typing game where you climb the corporate ladder and become the next ceo.",
  },
  {
    id: 4797040,
    title: "One vs All",
    description:
      "Asymmetric local VR party game where the VR player plays against the non-VR players in various mini-games.",
  },
];

const socials = [
  "https://kuma-gee.itch.io/",
  "https://www.instagram.com/kuma_gee/",
  "https://bsky.app/profile/kuma-gee.com",
  "https://discord.gg/k2VP8hygme",
  "mailto:kumagee.dev@gmail.com",
];

const imageUrl = (id: number) =>
  `https://store.steampowered.com/gfxproxy/betagfx/apps/${id}/header.jpg`;
const storeUrl = (id: number) => `https://store.steampowered.com/app/${id}`;

function Home() {
  return (
    <div
      className="relative w-full h-full flex flex-col text-slate-200 text-center"
      style={{}}
    >
      <Link
        to="/blog"
        className="absolute right-4 top-4 z-10 text-sm text-slate-200/60 underline-offset-4 hover:text-slate-200 hover:underline"
      >
        Blogs
      </Link>

      <div
        className="flex flex-col gap-8 p-8 grow justify-center items-center"
        style={{
          backgroundImage: "url(/banner.png)",
          backgroundSize: "auto 30vh",
          animation: "moveIt 90s linear infinite",
        }}
      >
        <img
          className="rounded-full max-w-[8rem] md:max-w-[12rem] self-center"
          src="/kuma-gee.png"
          alt="logo"
        />
        <div className="flex flex-col gap-2 text-3xl font-bold">
          <span>Kuma-Gee</span>
          <span>クマ・ゲー</span>
          <span className="text-sm font-light">Indie Game Developer</span>
        </div>
      </div>

      <div className="flex flex-col gap-4 justify-center items-center p-4 bg-amber-950 bg-opacity-50">
        <h2 className="font-bold text-2xl">Steam Games</h2>
        <div className="flex gap-8 md:gap-12 p-4 flex-col md:flex-row">
          {games.map((game) => (
            <a
              key={game.id}
              href={storeUrl(game.id)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col gap-4 w-60 md:w-80"
            >
              <img
                src={imageUrl(game.id)}
                alt={game.title}
                width="460"
                height="215"
                className="aspect-[460/215] w-full rounded-md bg-slate-800 object-cover shadow-md"
              />
              <div className="flex flex-col gap-2">
                <span className="font-bold">{game.title}</span>
                <span className="text-sm font-light">{game.description}</span>
              </div>
            </a>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4 justify-center items-center">
        <div className="flex gap-8 p-4">
          {socials.map((link) => (
            <SocialIcon
              target="_blank"
              key={link}
              className="rounded-full transition hover:-translate-y-2 duration-300"
              bgColor="transparent"
              fgColor="white"
              style={{ width: "3.5em", height: "3.5em" }}
              url={link}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
