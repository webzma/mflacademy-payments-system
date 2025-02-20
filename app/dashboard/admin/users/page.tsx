import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
export default function ManageUsers() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-800">
          Gestionar Usuarios
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">
          Aquí se implementará la gestión de usuarios.
        </p>
      </CardContent>
    </Card>
  );
}
