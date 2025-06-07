"use client";

import { Card } from "@/components/ui/card";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function TemplateSection({
  link,
  pageId,
}: {
  link: string | null;
  pageId: string | null;
}) {
  const templates: Array<string> = ["row", "row reverse", "col", "col reverse"];
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const router = useRouter();

  const handleSelect = (type: string) => {
    setSelectedTemplate(selectedTemplate === type ? null : type);
  };

  const handleTemplate = async () => {
    if (!selectedTemplate || !pageId) {
      alert("Please select a template and ensure a link is provided.");
      return;
    }

    const { error } = await supabase
      .from("user_page")
      .update({ template_type: selectedTemplate })
      .eq("id", pageId);

    if (error) {
      alert(`Error: ${error.message}`);
    } else {
      alert("Template saved");
      router.push("/dashboard"); // Redirige a /dashboard
    }
  };

  return (
    <div className="flex gap-5">
      {templates.map((type, index) => (
        <Card
          key={index}
          className={`p-4 cursor-pointer ${
            selectedTemplate === type
              ? "bg-primary text-primary-foreground"
              : ""
          }`}
          onClick={() => handleSelect(type)}
        >
          {type}
        </Card>
      ))}
      <Button onClick={handleTemplate}>Send</Button>
    </div>
  );
}
