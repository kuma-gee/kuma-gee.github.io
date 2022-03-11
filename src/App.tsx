import './App.css';

const org = 'kuma-gee';
const games: { [s: string]: string[] } = {
  'In Development': ['dualist'],
  Finished: ['robo-soul', 'suicide-hero'],
  Addon: ['godot-css-theme'],
};

const createPin = (repo: string) =>
  `https://github-readme-stats.vercel.app/api/pin?username=${org}&repo=${repo}`;

function App() {
  const gameItems = Object.keys(games).map((state) => {
    const items = games[state].map((game) => {
      return (
        <li className="py-2">
          <a
            href={'https://github.com/kuma-gee/' + game}
            target="_blank"
            rel="noreferrer"
          >
            <img src={createPin(game)} alt={game} />
          </a>
        </li>
      );
    });

    return (
      <article className="p-4">
        <h2 className="text-xl font-bold">{state}</h2>
        <ul>{items}</ul>
      </article>
    );
  });

  return (
    <div className="flex flex-col items-center p-4 bg-slate-50 h-full">
      <header className="flex flex-col items-center">
        <h1 className="text-3xl font-bold">Kuma Gee</h1>
        <p>wannabe indie game developer</p>
        <img src="logo.png" alt="logo" className="rounded-full w-1/2 p-4" />
      </header>

      <a href="https://ko-fi.com/L4L8BJI9A" target="_blank">
        <img
          height="36"
          style={{ border: '0px', height: '32px' }}
          src="https://ko-fi.com/img/githubbutton_sm.svg"
          alt="Buy Me a Coffee"
        />
      </a>

      <div className="flex flex-col lg:flex-row">{gameItems}</div>
    </div>
  );
}

export default App;
