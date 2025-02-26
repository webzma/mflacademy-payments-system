import { supabase } from "../utils/supabase/client";
import Link from "next/link";

export default async function Home() {
  let { data } = await supabase.from("countries").select();

  console.log(data);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">
        Gestor de Pagos - Academia de Inglés
      </h1>
      <div className="flex space-x-4">
        <Link
          href="/login"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Iniciar Sesión
        </Link>
      </div>
    </main>
  );
}
