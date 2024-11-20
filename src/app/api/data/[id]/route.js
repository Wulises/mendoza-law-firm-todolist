import { query } from "@/lib/db";  // Conexión a DB

// Obtener tarea por ID
export async function GET({ params }) {
  const { id } = params;
  try {
    const res = await query("SELECT * FROM tasks WHERE id = $1", [id]);
    if (res.length === 0) {
      return new Response(JSON.stringify({ error: "Tarea no encontrada" }), { status: 404 });
    }
    return new Response(JSON.stringify(res[0]), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error al obtener tarea" }), { status: 500 });
  }
}

// Actualizar tarea por ID
export async function PUT({ params, request }) {
  const { id } = params;
  const { title, description, status } = await request.json();
  try {
    const res = await query(
      "UPDATE tasks SET title = $1, description = $2, status = $3, updated_at = CURRENT_TIMESTAMP WHERE id = $4 RETURNING *",
      [title, description, status, id]
    );
    if (res.length === 0) {
      return new Response(JSON.stringify({ error: "Tarea no encontrada" }), { status: 404 });
    }
    return new Response(JSON.stringify(res[0]), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error al actualizar tarea" }), { status: 500 });
  }
}

// Eliminar tarea por ID
export async function DELETE({ params }) {
  const { id } = params;
  try {
    const res = await query("DELETE FROM tasks WHERE id = $1 RETURNING *", [id]);
    if (res.length === 0) {
      return new Response(JSON.stringify({ error: "Tarea no encontrada" }), { status: 404 });
    }
    return new Response(JSON.stringify({ success: "Tarea eliminada" }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error al eliminar tarea" }), { status: 500 });
  }
}
