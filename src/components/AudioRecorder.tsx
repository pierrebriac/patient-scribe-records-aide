
import React, { useState, useRef } from 'react';
import { Mic, Square, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface AudioRecorderProps {
  onRecordingComplete: (audioBlob: Blob, transcription: string) => void;
}

export const AudioRecorder: React.FC<AudioRecorderProps> = ({ onRecordingComplete }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [transcription, setTranscription] = useState('');
  const [isTranscribing, setIsTranscribing] = useState(false);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/wav' });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        
        // Simulation de transcription (dans un vrai projet, utiliser une API comme OpenAI Whisper)
        setIsTranscribing(true);
        setTimeout(() => {
          const mockTranscription = "Transcription automatique : Le patient présente des symptômes de fatigue et des douleurs articulaires. Température normale. Recommander du repos et un suivi dans une semaine.";
          setTranscription(mockTranscription);
          setIsTranscribing(false);
          onRecordingComplete(audioBlob, mockTranscription);
        }, 2000);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Erreur lors de l\'accès au microphone:', error);
      alert('Impossible d\'accéder au microphone. Veuillez vérifier les permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      // Arrêter tous les tracks pour libérer le microphone
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
  };

  const playAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <Card className="p-4 space-y-4">
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <Mic className="h-5 w-5" />
        Enregistrement Audio
      </h3>
      
      <div className="flex gap-2">
        {!isRecording ? (
          <Button onClick={startRecording} className="bg-red-500 hover:bg-red-600">
            <Mic className="h-4 w-4 mr-2" />
            Commencer l'enregistrement
          </Button>
        ) : (
          <Button onClick={stopRecording} variant="outline">
            <Square className="h-4 w-4 mr-2" />
            Arrêter l'enregistrement
          </Button>
        )}
        
        {audioUrl && (
          <Button onClick={playAudio} variant="outline">
            {isPlaying ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
            {isPlaying ? 'Pause' : 'Écouter'}
          </Button>
        )}
      </div>

      {audioUrl && (
        <audio
          ref={audioRef}
          src={audioUrl}
          onEnded={() => setIsPlaying(false)}
          style={{ display: 'none' }}
        />
      )}

      {isTranscribing && (
        <div className="p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-600">Transcription en cours...</p>
        </div>
      )}

      {transcription && (
        <div className="p-3 bg-green-50 rounded-lg">
          <p className="text-sm font-medium text-green-800 mb-1">Transcription :</p>
          <p className="text-sm text-green-700">{transcription}</p>
        </div>
      )}
    </Card>
  );
};
