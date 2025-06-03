import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function CTASection({ h2 }: { h2: string }) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-medium">{h2}</h2>
      <div className="flex gap-2 w-full">
        <Input type="email" placeholder="Enter your link" className="w-xs" />
        <Button type="submit" className="cursor-pointer" variant="default">
          Submit
        </Button>
      </div>
    </div>
  );
}
