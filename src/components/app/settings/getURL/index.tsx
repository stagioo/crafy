"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

function CTASection({
  h2,
  onSave,
}: {
  h2: string;
  onSave: (success: boolean, link?: string, id?: string) => void;
}) {
  const [link, setInputValue] = useState("");

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
      console.error("user not authenticated");
      onSave(false);
      return;
    }

    const { data: insertedData, error } = await supabase
      .from("user_page")
      .insert([{ user_id: user.id, link, template_type: "blog" }])
      .select("id")
      .single();

    if (error) {
      alert(`Error: ${error.message}`);
      onSave(false);
    } else {
      alert("Link saved");
      onSave(true, link, insertedData.id); // Pasa link y id
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-medium">{h2}</h2>
      <div className="flex gap-2 w-full">
        <Input
          type="text" // Cambiado de email a text, ya que es un link
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

export default function GetURLSection({
  onSave,
}: {
  onSave: (success: boolean, link?: string, id?: string) => void;
}) {
  return (
    <div>
      <CTASection h2="Claim your link" onSave={onSave} />
    </div>
  );
}
