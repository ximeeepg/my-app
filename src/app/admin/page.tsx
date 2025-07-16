"use client";
import { useState, useEffect } from "react";
import { createClient, Session } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const ADMIN_EMAIL = "admin@admin.com"; // Cambia por el correo real del admin

export default function AdminPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [name, setName] = useState("");
  const [game, setGame] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    if (!session || session.user.email !== ADMIN_EMAIL) {
      setError("No tienes permisos de admin para crear torneos.");
      setLoading(false);
      return;
    }
    const { error } = await supabase.from("tournaments").insert([
      {
        name,
        description,
        game,
        date,
        created_by: session.user.id,
      },
    ]);
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      setSuccess("Torneo creado correctamente");
      setName(""); setGame(""); setDate(""); setDescription("");
    }
  };

  if (!session) {
    return <div className="text-center mt-10">Debes iniciar sesión como admin para crear torneos.</div>;
  }

  return (
    <div className="max-w-lg mx-auto mt-12 p-8 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">Panel de Admin - Nuevo Torneo</h2>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre del torneo"
          className="border p-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Juego"
          className="border p-2 rounded"
          value={game}
          onChange={(e) => setGame(e.target.value)}
          required
        />
        <input
          type="date"
          className="border p-2 rounded"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <textarea
          placeholder="Descripción"
          className="border p-2 rounded"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <button
          type="submit"
          className="bg-green-600 text-white py-2 rounded hover:bg-green-700"
          disabled={loading}
        >
          {loading ? "Agregando..." : "Agregar Torneo"}
        </button>
        {error && <div className="text-red-600 text-sm">{error}</div>}
        {success && <div className="text-green-600 text-sm">{success}</div>}
      </form>
    </div>
  );
}
