const torneos = [
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

export default function TorneosPage() {
  return (
    <div className="max-w-3xl mx-auto mt-12 p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Torneos Disponibles</h2>
      <div className="grid gap-6">
        {torneos.map((torneo, idx) => (
          <div key={idx} className="bg-white rounded shadow p-6 flex flex-col gap-2">
            <h3 className="text-lg font-semibold">{torneo.nombre}</h3>
            <span className="text-sm text-gray-600">Juego: {torneo.juego}</span>
            <span className="text-sm text-gray-600">Fecha: {torneo.fecha}</span>
            <p className="text-gray-800">{torneo.descripcion}</p>
            <button className="mt-2 bg-blue-600 text-white py-1 rounded hover:bg-blue-700 w-fit self-end">Inscribirse</button>
          </div>
        ))}
      </div>
    </div>
  );
}
