function App() {
  return (
    <div
      className="w-full h-full flex flex-col gap-16 text-white text-center"
      style={{
        backgroundImage: "url(/banner.png)",
        backgroundSize: "100vw auto",
        animation: "moveIt 90s linear infinite",
      }}
    >
      <div className="flex flex-col gap-8">
        <img
          className="rounded-full max-w-[12rem] self-center mt-24"
          src="/kuma-gee.png"
          alt="logo"
        />
        <div className="flex flex-col gap-2 text-3xl font-bold">
          <span>Kuma-Gee</span>
          <span>クマ・ゲー</span>
          <span className="text-sm font-light">Indie Game Developer</span>
        </div>
      </div>

      <div className="flex flex-col gap-4 justify-center items-center p-4">
        <img src="/construction.png" alt="construction sign" className="w-32"/>
        <img src="/construction-kuma.png" alt="construction bear bowing" className="w-32"/>
      </div>
    </div>
  );
}

export default App;
