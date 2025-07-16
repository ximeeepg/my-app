import Image from "next/image";

const torneosDestacados = [
  {
    nombre: "Torneo Valorant",
    juego: "Valorant",
    fecha: "2025-08-01",
    descripcion: "Compite en el torneo más emocionante de Valorant del año.",
  },
  {
    nombre: "Torneo League of Legends",
    juego: "LoL",
    fecha: "2025-08-15",
    descripcion: "Demuestra tus habilidades en la Grieta del Invocador.",
  },
];

export default function Home() {
  return (
    <div className="max-w-3xl mx-auto mt-12 p-6">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold mb-2 text-blue-700">Torneos Gamer</h1>
        <p className="text-lg text-gray-700 mb-4">¡Bienvenido a la plataforma donde los gamers compiten y se divierten!</p>
        <p className="text-md text-gray-600">Regístrate, inicia sesión y participa en los torneos más emocionantes de tus juegos favoritos.</p>
      </div>
      <section>
        <h2 className="text-2xl font-bold mb-6 text-center">Torneos Destacados</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {torneosDestacados.map((torneo, idx) => (
            <div key={idx} className="bg-white rounded shadow p-6 flex flex-col gap-2">
              <h3 className="text-lg font-semibold">{torneo.nombre}</h3>
              <span className="text-sm text-gray-600">Juego: {torneo.juego}</span>
              <span className="text-sm text-gray-600">Fecha: {torneo.fecha}</span>
              <p className="text-gray-800">{torneo.descripcion}</p>
              <a href="/torneos" className="mt-2 bg-blue-600 text-white py-1 rounded hover:bg-blue-700 w-fit self-end px-4">Ver más</a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
    </div>
  );
}
