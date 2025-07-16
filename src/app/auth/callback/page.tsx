export default function CallbackPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="bg-white shadow rounded-lg p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-4 text-green-700">¡Correo validado correctamente!</h1>
        <p className="mb-6 text-gray-700">
          Tu correo ha sido confirmado. Ahora puedes iniciar sesión en la plataforma.
        </p>
        <a
          href="/login"
          className="inline-block px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Ir a iniciar sesión
        </a>
      </div>
    </div>
  );
}
