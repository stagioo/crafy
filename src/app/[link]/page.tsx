"use client";
import { supabase } from "@/lib/supabase";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

async function checkLinkExists(link: string): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from("user_page")
      .select("link")
      .eq("link", link)
      .single();

    return !error && data !== null;
  } catch (err) {
    return false;
  }
}

export default function LinkPage() {
  const params = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkLink() {
      if (!params?.link || typeof params.link !== 'string') {
        redirect("/not-found");
        return;
      }

      setLoading(true);
      const exists = await checkLinkExists(params.link);
      
      if (!exists) {
        redirect("/not-found");
        return;
      }

      setLoading(false);
    }

    checkLink();
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
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Hola Mundo</h1>
      </div>
    </div>
  );
}