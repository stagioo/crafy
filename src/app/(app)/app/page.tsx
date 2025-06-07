"use client";

import TemplateSection from "@/components/app/settings/getTemplate";
import GetURLSection from "@/components/app/settings/getURL";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";

export default function SettingsSection() {
  const [progress, setProgress] = useState(50);
  const [showTemplate, setShowTemplate] = useState(false);
  const [link, setLink] = useState<string | null>(null);
  const [pageId, setPageId] = useState<string | null>(null);

  const handleSave = (success: boolean, link?: string, id?: string) => {
    if (success && link && id) {
      setProgress(100);
      setShowTemplate(true);
      setLink(link);
      setPageId(id);
    }
  };

  return (
    <div className="flex gap-5 flex-col">
      <div>
        <Progress value={progress} />
      </div>
      <div>
        {showTemplate ? (
          <TemplateSection link={link} pageId={pageId} />
        ) : (
          <GetURLSection onSave={handleSave} />
        )}
      </div>
    </div>
  );
}
