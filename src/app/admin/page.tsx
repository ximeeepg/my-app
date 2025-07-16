export default function AdminPage() {
  return (
    <div className="max-w-lg mx-auto mt-12 p-8 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">Panel de Admin - Nuevo Torneo</h2>
      <form className="flex flex-col gap-4">
        <input type="text" placeholder="Nombre del torneo" className="border p-2 rounded" />
        <input type="text" placeholder="Juego" className="border p-2 rounded" />
        <input type="date" className="border p-2 rounded" />
        <textarea placeholder="Descripción" className="border p-2 rounded" rows={3}></textarea>
        <button type="submit" className="bg-green-600 text-white py-2 rounded hover:bg-green-700">Agregar Torneo</button>
      </form>
    </div>
  );
}
