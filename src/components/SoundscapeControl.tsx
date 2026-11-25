import { Music, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSoundscape } from "@/lib/soundscape";

export function SoundscapeControl() {
  const { isOn, toggle } = useSoundscape();

  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-9 w-9"
      onClick={toggle}
      aria-label={isOn ? "Turn off lofi music" : "Turn on lofi music"}
      title={isOn ? "Turn off lofi music" : "Turn on lofi music"}
    >
      {isOn ? (
        <Music className="h-4 w-4 text-primary" />
      ) : (
        <VolumeX className="h-4 w-4" />
      )}
    </Button>
  );
}
