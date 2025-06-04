"use client"

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/lib/supabase";
import { Google } from "@/components/app/icons/google";
  import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginSection() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) throw error;
      
      // El usuario será redirigido a Google para autenticarse
    } catch (error) {
      console.error('Error al iniciar sesión con Google:', error);
      setError('Error al iniciar sesión. Por favor, inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 max-w-sm mx-auto p-6">
      {/* Header section */}
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-semibold">Login to experience crafy</h1>
        <p className="text-muted-foreground">try game changing link</p>
      </div>

      {/* Google login button */}
      <Button 
        variant="outline" 
        className="w-full gap-2 cursor-pointer" 
        onClick={handleGoogleLogin}
        disabled={loading}
      >
        <Google />
        {loading ? "Cargando..." : "Login with Google"}
      </Button>

      {/* Error message */}
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}

      {/* Footer notice */}
      <p className="text-xs text-muted-foreground text-center">
        By signing in, you agree to our terms of service.
      </p>
    </div>
  );
}
