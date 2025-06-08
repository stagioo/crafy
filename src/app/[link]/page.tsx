"use client";
import { supabase } from "@/lib/supabase";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface UserPage {
  profile_name: string;
  profile_image: string | null;
  template_type: string;
}

export default function LinkPage() {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [userPage, setUserPage] = useState<UserPage | null>(null);

  useEffect(() => {
    async function loadUserPage() {
      console.log("1. Iniciando loadUserPage");
      console.log("2. Params recibidos:", params);

      if (!params?.link || typeof params.link !== 'string') {
        console.log("3. Error: No hay link en los parámetros");
        redirect("/not-found");
        return;
      }

      console.log("4. Link encontrado en params:", params.link);
      setLoading(true);

      try {
        console.log("5. Intentando consultar user_page");
        const { data, error } = await supabase
          .from("user_page")
          .select("profile_name, profile_image, template_type")
          .eq("link", params.link)
          .single();

        console.log("6. Resultado de la consulta:");
        console.log("- Data:", data);
        console.log("- Error:", error);

        if (error) {
          console.log("7. Error en la consulta:", error.message);
          redirect("/not-found");
          return;
        }

        if (!data) {
          console.log("8. No se encontraron datos");
          redirect("/not-found");
          return;
        }

        console.log("9. Datos encontrados:", data);
        setUserPage(data);
        setLoading(false);
      } catch (err) {
        console.log("10. Error general:", err);
        redirect("/not-found");
      }
    }

    loadUserPage();
  }, [params]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center bg-white p-8 rounded-lg shadow-lg max-w-md w-full mx-4">
        {userPage?.profile_image && (
          <div className="mb-6">
            <img 
              src={userPage.profile_image} 
              alt={userPage.profile_name}
              className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-blue-500"
            />
          </div>
        )}
        <h1 className="text-2xl font-bold mb-4 text-gray-800">
          Bienvenido a la página de {userPage?.profile_name}
        </h1>
        <p className="text-sm text-gray-500">
          Template: {userPage?.template_type}
        </p>
      </div>
    </div>
  );
}
