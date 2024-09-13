function App() {
  return (
    <div
      className="w-full h-full flex flex-col gap-10 text-white text-center"
      style={{
        backgroundImage: "url(/banner.png)",
        backgroundSize: "100vw auto",
        animation: "moveIt 90s linear infinite",
      }}
    >
      <div className="flex flex-col grow gap-8 100vh">
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
      <div className="p-2">\.Under Construction./</div>
    </div>
  );
}

export default App;
