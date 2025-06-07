"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
function CTASection({ h2 }: { h2: string }) {
  const [link, setInputValue] = useState("");

  // Cargar el valor guardado al montar el componente
  useEffect(() => {
    const savedValue = localStorage.getItem("savedInput");
    if (savedValue) {
      setInputValue(savedValue);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data } = await supabase.auth.getUser();
    const { user } = data;

    if (!user) {
      console.error("user dont authenticated");
      return;
    }

    const { error } = await supabase
      .from("user_page")
      .insert([{ user_id: user.id, link, template_type: "blog" }]);

    if (error) {
      alert(`${error.message}`);
    } else {
      alert("link saved");
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-medium">{h2}</h2>
      <div className="flex gap-2 w-full">
        <Input
          type="email"
          placeholder="Enter your link"
          className="w-xs"
          value={link}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Button
          onClick={handleSubmit}
          type="button"
          className="cursor-pointer"
          variant="default"
        >
          Submit
        </Button>
      </div>
    </div>
  );
}
export default function GetURLSection() {
  return (
    <>
      <div>
        <CTASection h2="Claim your link" />
      </div>
    </>
  );
}
