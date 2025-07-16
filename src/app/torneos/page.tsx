"use client";
import { useEffect, useState } from "react";
import { createClient, Session } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Torneo {
  id: string;
  name: string;
  game?: string;
  date?: string;
  description?: string;
}

export default function TorneosPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [torneos, setTorneos] = useState<Torneo[]>([]);
  const [inscritos, setInscritos] = useState<string[]>([]); // IDs de torneos inscritos
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedTorneo, setSelectedTorneo] = useState<Torneo | null>(null);
  // Formulario para crear torneo
  const [newTorneo, setNewTorneo] = useState({ name: "", game: "", date: "", description: "" });
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }: any) => {
      setSession(data.session);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event: any, session: any) => {
      setSession(session);
    });
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const fetchTorneos = async () => {
      setLoading(true);
      setError("");
      const { data, error } = await supabase.from("tournaments").select("id, name, game, date, description").order("date", { ascending: true });
      if (error) {
        setError("Error al cargar torneos");
        setLoading(false);
        return;
      }
      setTorneos(data || []);
      setLoading(false);
    };
    fetchTorneos();
  }, []);

  useEffect(() => {
    if (!session) return;
    const fetchInscritos = async () => {
      const { data, error } = await supabase
        .from("tournament_registrations")
        .select("tournament_id")
        .eq("user_id", session.user.id);
      if (!error && data) {
        setInscritos(data.map((d: any) => d.tournament_id));
      }
    };
    fetchInscritos();
  }, [session]);

  const handleInscribir = async (tournamentId: string) => {
    if (!session) return;
    const { error } = await supabase.from("tournament_registrations").insert([
      { user_id: session.user.id, tournament_id: tournamentId },
    ]);
    if (!error) {
      setInscritos((prev) => [...prev, tournamentId]);
    }
  };

  const handleDesinscribir = async (tournamentId: string) => {
    if (!session) return;
    const { error } = await supabase
      .from("tournament_registrations")
      .delete()
      .eq("user_id", session.user.id)
      .eq("tournament_id", tournamentId);
    if (!error) {
      setInscritos((prev) => prev.filter((id) => id !== tournamentId));
    }
  };

  if (!session) {
    return <div className="text-center mt-10">Inicia sesión para ver e inscribirte a torneos.</div>;
  }

  // Vista de detalles de torneo
  // Vista de detalles de torneo
  if (selectedTorneo) {
    return (
      <div className="max-w-xl mx-auto mt-12 p-6 bg-white rounded shadow">
        <button className="mb-4 text-blue-600 hover:underline" onClick={() => setSelectedTorneo(null)}>
          ← Volver a la lista
        </button>
        <h2 className="text-2xl font-bold mb-2">{selectedTorneo.name}</h2>
        {selectedTorneo.game && <div className="mb-1 text-gray-600">Juego: {selectedTorneo.game}</div>}
        {selectedTorneo.date && <div className="mb-1 text-gray-600">Fecha: {selectedTorneo.date}</div>}
        {selectedTorneo.description && <div className="mb-3 text-gray-800">{selectedTorneo.description}</div>}
        <div className="mt-4">
          {inscritos.includes(selectedTorneo.id) ? (
            <button
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              onClick={() => handleDesinscribir(selectedTorneo.id)}
            >
              Cancelar inscripción
            </button>
          ) : (
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={() => handleInscribir(selectedTorneo.id)}
            >
              Inscribirse
            </button>
          )}
        </div>
      </div>
    );
  }

  // Vista principal con lista y formulario


  return (
    <div className="max-w-3xl mx-auto mt-12 p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Torneos Disponibles</h2>
      {loading && <div className="text-center">Cargando torneos...</div>}
      {error && <div className="text-red-600 text-center">{error}</div>}
      <div className="grid gap-6">
        {torneos.map((torneo) => (
          <div key={torneo.id} className="bg-white rounded shadow p-6 flex flex-col gap-2">
            <h3 className="text-lg font-semibold">{torneo.name}</h3>
            {torneo.game && <span className="text-sm text-gray-600">Juego: {torneo.game}</span>}
            {torneo.date && <span className="text-sm text-gray-600">Fecha: {torneo.date}</span>}
            {torneo.description && <p className="text-gray-800">{torneo.description}</p>}
            <button
              className="mt-2 bg-blue-500 text-white py-1 rounded hover:bg-blue-700 w-fit self-end px-4"
              onClick={() => setSelectedTorneo(torneo)}
            >
              Ver más
            </button>
          </div>
        ))}
      </div>
      {/* Formulario para crear torneo */}
      <div className="mt-10 p-6 bg-gray-50 rounded shadow">
        <h3 className="text-lg font-bold mb-2">Crear nuevo torneo</h3>
        {createError && <div className="text-red-600 mb-2">{createError}</div>}
        <form
          className="flex flex-col gap-2"
          onSubmit={async (e) => {
            e.preventDefault();
            setCreating(true);
            setCreateError("");
            if (!newTorneo.name || !newTorneo.game || !newTorneo.date) {
              setCreateError("Todos los campos son obligatorios");
              setCreating(false);
              return;
            }
            const { error } = await supabase.from("tournaments").insert([
              { name: newTorneo.name, game: newTorneo.game, date: newTorneo.date, description: newTorneo.description },
            ]);
            if (error) {
              setCreateError("Error al crear torneo");
              setCreating(false);
              return;
            }
            setNewTorneo({ name: "", game: "", date: "", description: "" });
            setCreating(false);
            // Refresca la lista
            setLoading(true);
            const { data, error: fetchError } = await supabase.from("tournaments").select("id, name, game, date, description").order("date", { ascending: true });
            if (!fetchError) setTorneos(data || []);
            else setError("Error al recargar torneos");
          }}
        >
          <input
            className="border rounded px-2 py-1"
            placeholder="Nombre del torneo"
            value={newTorneo.name}
            onChange={e => setNewTorneo({ ...newTorneo, name: e.target.value })}
          />
          <input
            className="border rounded px-2 py-1"
            placeholder="Juego"
            value={newTorneo.game}
            onChange={e => setNewTorneo({ ...newTorneo, game: e.target.value })}
          />
          <input
            className="border rounded px-2 py-1"
            type="date"
            value={newTorneo.date}
            onChange={e => setNewTorneo({ ...newTorneo, date: e.target.value })}
          />
          <textarea
            className="border rounded px-2 py-1"
            placeholder="Descripción (opcional)"
            value={newTorneo.description}
            onChange={e => setNewTorneo({ ...newTorneo, description: e.target.value })}
          />
          <button
            type="submit"
            className="bg-green-600 text-white py-2 rounded hover:bg-green-700 mt-2"
            disabled={creating}
          >
            {creating ? "Creando..." : "Crear torneo"}
          </button>
        </form>
      </div>
      <div className="mt-10">
        <h3 className="text-lg font-bold mb-2">Mis torneos inscritos:</h3>
        <ul className="list-disc ml-6">
          {torneos.filter((t) => inscritos.includes(t.id)).map((t) => (
            <li key={t.id}>{t.name} ({t.game})</li>
          ))}
          {torneos.filter((t) => inscritos.includes(t.id)).length === 0 && (
            <li className="text-gray-500">No estás inscrito en ningún torneo.</li>
          )}
        </ul>
      </div>
    </div>
  );
}
