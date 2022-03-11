import './App.css';

const games: { [s: string]: string[] } = {
  'In Development': ['dualist'],
  Finished: ['suicide-hero', 'robo-soul'],
  Addon: ['godot-css-theme'],
};

function App() {
  const gameItems = Object.keys(games).map((state) => {
    const items = games[state].map((game) => {
      return (
        <li>
          <a href={'https://github.com/kuma-gee/' + game}>{game}</a>
        </li>
      );
    });

    return (
      <article>
        <h2 className="text-xl font-bold">{state}</h2>
        <ul>{items}</ul>
      </article>
    );
  });

  return (
    <div className="flex flex-col items-center">
      <header className="flex flex-col items-center">
        <h1 className="text-3xl font-bold">Kuma Gee</h1>
        <p>wannabe indie game developer</p>
        <img src="logo.png" alt="logo" className="rounded-full w-1/2" />
      </header>

      {gameItems}
    </div>
  );
}

export default App;
