
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
  vitalSigns: VitalSigns;
  createdAt: Date;
  updatedAt: Date;
}

export interface VitalSigns {
  pulse?: number;
  systolicBP?: number;
  diastolicBP?: number;
  temperature?: number;
  weight?: number;
  height?: number;
  respiratoryRate?: number;
  oxygenSaturation?: number;
}

export interface AudioRecording {
  id: string;
  url: string;
  transcription: string;
  duration: number;
  createdAt: Date;
}
