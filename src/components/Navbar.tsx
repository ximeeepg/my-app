import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center shadow-md">
      <div className="font-bold text-xl tracking-tight">
        <Link href="/">Torneos Gamer</Link>
      </div>
      <div className="space-x-4">
        <Link href="/torneos" className="hover:underline">Torneos</Link>
        <Link href="/admin" className="hover:underline">Admin</Link>
        <Link href="/register" className="hover:underline">Registro</Link>
        <Link href="/login" className="hover:underline">Iniciar sesión</Link>
      </div>
    </nav>
  );
}
