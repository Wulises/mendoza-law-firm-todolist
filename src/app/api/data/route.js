import { query } from "@/lib/db";  // Asumiendo que tienes una librería para conectar a DB

// Obtener todas las tareas
export async function GET() {
  try {
    const res = await query("SELECT * FROM tasks ORDER BY created_at DESC");
    return new Response(JSON.stringify(res), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error al obtener tareas" }), { status: 500 });
  }
}

// Crear una nueva tarea
export async function POST(request) {
  const { title, description, status } = await request.json();
  try {
    const res = await query(
      "INSERT INTO tasks (title, description, status) VALUES ($1, $2, $3) RETURNING *",
      [title, description, status]
    );
    return new Response(JSON.stringify(res[0]), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error al crear tarea" }), { status: 500 });
  }
}
