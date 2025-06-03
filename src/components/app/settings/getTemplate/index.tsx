import { Card } from "@/components/ui/card";

export default function TemplateSection() {
  const templates: Array<String> = ["row", "row reverse", "col", "col reverse"];

  return (
    <>
      <div className="flex gap-5 ">
        {templates.map((type, index) => (
          <Card key={index} className="p-4 cursor-pointer">
            {type}
          </Card>
        ))}
      </div>
    </>
  );
}
