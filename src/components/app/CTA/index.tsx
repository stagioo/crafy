"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export function CTASection({ h2 }: { h2: string }) {
  const [inputValue, setInputValue] = useState("");

  // Cargar el valor guardado al montar el componente
  useEffect(() => {
    const savedValue = localStorage.getItem("savedInput");
    if (savedValue) {
      setInputValue(savedValue);
    }
  }, []);

  const handleSubmit = () => {
    // Guardar en localStorage
    localStorage.setItem("savedInput", inputValue);
    // Aquí podrías añadir más lógica de envío si es necesario
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-medium">{h2}</h2>
      <div className="flex gap-2 w-full">
        <Input
          type="email"
          placeholder="Enter your link"
          className="w-xs"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Button
          type="button"
          className="cursor-pointer"
          variant="default"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}
