const SOUNDS = {
  correct: 'https://assets.mixkit.co/active_storage/sfx/2013/2013-preview.mp3',
  incorrect: 'https://assets.mixkit.co/active_storage/sfx/2018/2018-preview.mp3',
  click: 'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3',
  complete: 'https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3',
  pop: 'https://assets.mixkit.co/active_storage/sfx/2019/2019-preview.mp3'
};

class SoundManager {
  private enabled: boolean = true;

  setEnabled(enabled: boolean) {
    this.enabled = enabled;
  }

  play(soundName: keyof typeof SOUNDS) {
    if (!this.enabled) return;
    
    const audio = new Audio(SOUNDS[soundName]);
    audio.volume = 0.4;
    audio.play().catch(err => console.log('Sound play blocked:', err));
  }
}

export const soundManager = new SoundManager();
