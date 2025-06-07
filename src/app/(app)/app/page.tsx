"use client";

import TemplateSection from "@/components/app/settings/getTemplate";
import GetURLSection from "@/components/app/settings/getURL";
import { Progress } from "@/components/ui/progress";
import * as React from "react";
import { useState } from "react";

export default function SettingsSection() {
  const [progress, setProgress] = useState(50);
  const [showTemplate, setShowTemplate] = useState(false);

  const handleSave = (success: boolean) => {
    if (success) {
      setProgress(100);
      setShowTemplate(true);
    }
  };

  return (
    <div className="flex gap-5 flex-col">
      <div>
        <Progress value={progress} />
      </div>
      <div>
        {showTemplate ? <TemplateSection /> : <GetURLSection onSave={handleSave} />}
      </div>
    </div>
  );
}
