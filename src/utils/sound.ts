// Client-side Web Audio API sound generator disabled as requested
class SoundManager {
  private ctx: AudioContext | null = null;

  private initCtx() {}

  setMuted(muted: boolean) {}

  isMuted() {
    return true;
  }

  playBoot() {}
  playClick() {}
  playHover() {}
  playSuccess() {}
  playTypeChirp() {}
}

export const sound = new SoundManager();
