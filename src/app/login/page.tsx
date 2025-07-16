export default function LoginPage() {
  return (
    <div className="max-w-md mx-auto mt-12 p-8 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>
      <form className="flex flex-col gap-4">
        <input type="email" placeholder="Correo electrónico" className="border p-2 rounded" />
        <input type="password" placeholder="Contraseña" className="border p-2 rounded" />
        <button type="submit" className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Entrar</button>
      </form>
    </div>
  );
}
