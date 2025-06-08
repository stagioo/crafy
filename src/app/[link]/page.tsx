"use client";

import { supabase } from "@/lib/supabase";

async function getUserLink() {
  // obtener los datos del usuario de supabase.
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  // verificar si el usuario existe
  if (userError || !user) {
    return {
      link: null,
      email: null,
      error: userError?.message || "no hay usuario autenticado",
    };
  }

  // consultar la tabla user_page para extraer datos: link

  const { data, error } = await supabase
    .from("user_page")
    .select("link")
    .eq("user_id", user.id)
    .single();

  if (error) {
    return { link: null, email: user.email, error: error.message };
  }

  return { link: data.link, email: user.email, error: null };
}

export default async function LinkPage() {
  const { link, email, error } = await getUserLink();
  return (
    <>
      <div>
        <h1>Welcome</h1>
        {error ? (
          <p>Error: {error}</p>
        ) : (
          <p>
            {email ? `usuario: ${email}` : `no hay usuario logueado`}{" "}
            {link !== null ? `Link ${link}` : "Link no encontrado"}
          </p>
        )}
      </div>
    </>
  );
}
