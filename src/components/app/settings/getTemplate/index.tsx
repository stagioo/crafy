"use client";
import { Card } from "@/components/ui/card";
import { useState } from "react";

export default function TemplateSection() {
  const templates: Array<string> = ["row", "row reverse", "col", "col reverse"];
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const handleSelect = (type: string) => {
    // Si ya está seleccionado, lo deselecciona, sino lo selecciona
    setSelectedTemplate(selectedTemplate === type ? null : type);
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
    </div>
  );
}
