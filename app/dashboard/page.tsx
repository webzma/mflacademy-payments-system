import Link from "next/link";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-2xl font-bold mb-4">Panel de Control</h1>
      <div className="flex space-x-4">
        <Link
          href="/dashboard/report-payment"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Reportar Pago
        </Link>
        <Link
          href="/dashboard/admin"
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
        >
          Administración
        </Link>
      </div>
    </div>
  );
}
