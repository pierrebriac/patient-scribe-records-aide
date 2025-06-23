
export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'M' | 'F' | 'Autre';
  phone: string;
  email: string;
  cost: number;
  attentionLevel: 1 | 2 | 3 | 4 | 5;
  notes: string;
  images: string[];
  audioRecordings: AudioRecording[];
  createdAt: Date;
  updatedAt: Date;
}

export interface AudioRecording {
  id: string;
  url: string;
  transcription: string;
  duration: number;
  createdAt: Date;
}
