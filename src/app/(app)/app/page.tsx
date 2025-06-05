"use client";

import TemplateSection from "@/components/app/settings/getTemplate";
import GetURLSection from "@/components/app/settings/getURL";
import { Progress } from "@/components/ui/progress";
import * as React from "react";

export default function SettingsSection() {
  return (
    <div className="flex gap-5 flex-col">
      <div>
        <Progress value={50} />
      </div>
      <div>
        <TemplateSection />
      </div>
    </div>
  );
}
