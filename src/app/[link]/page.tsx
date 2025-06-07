"use client";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import React from "react";
export default function LinkPage({
  params: paramsPromise,
}: {
  params: Promise<{ link: string }>;
}) {
  const params = React.use(paramsPromise);
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLink = async () => {
      try {
        const { data, error } = await supabase
          .from("user_page")
          .select("link")
          .eq("link", params.link)
          .single();

        if (error || !data) {
          router.push("/not-found");
          return;
        }
      } catch (err) {
        router.push("/not-found");
      } finally {
        setLoading(false);
      }
    };

    checkLink();
  }, [params.link, router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Cargando...
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <h1 className="text-2xl font-bold">Hello World</h1>
    </div>
  );
}
