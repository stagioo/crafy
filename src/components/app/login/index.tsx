import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Google } from "@/components/app/icons/google";
export default function LoginSection() {
  return (
    <div className="flex flex-col items-center gap-6 max-w-sm mx-auto p-6">
      {/* Header section */}
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-semibold">Login to experience crafy</h1>
        <p className="text-muted-foreground">try game changing link</p>
      </div>

      {/* Google login button */}
      <Button variant="outline" className="w-full gap-2 cursor-pointer">
        <Google />
        Login with Google
      </Button>

      {/* Footer notice */}
      <p className="text-xs text-muted-foreground text-center">
        By signing in, you agree to our terms of service.
      </p>
    </div>
  );
}
