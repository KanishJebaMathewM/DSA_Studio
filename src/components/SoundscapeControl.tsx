import { Music, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSoundscape } from "@/lib/soundscape";

export function SoundscapeControl() {
  const { isOn, toggle } = useSoundscape();

  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-[var(--ctrl-sm)] w-[var(--ctrl-sm)] sm:h-[var(--ctrl-md)] sm:w-[var(--ctrl-md)] text-muted-foreground hover:text-foreground cursor-pointer"
      onClick={toggle}
      aria-label={isOn ? "Turn off background music" : "Turn on background music"}
      title={isOn ? "Turn off background music" : "Turn on background music"}
    >
      {isOn ? (
        <Music className="h-[var(--icon-sm)] w-[var(--icon-sm)] text-primary" />
      ) : (
        <VolumeX className="h-[var(--icon-sm)] w-[var(--icon-sm)]" />
      )}
    </Button>
  );
}
