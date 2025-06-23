
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Patient, AudioRecording } from '../types/Patient';
import { AudioRecorder } from './AudioRecorder';
import { ImageUploader } from './ImageUploader';
import { Save, ArrowLeft } from 'lucide-react';

interface PatientFormProps {
  patient?: Patient;
  onSave: (patientData: Omit<Patient, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
}

export const PatientForm: React.FC<PatientFormProps> = ({ patient, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    age: 0,
    gender: 'M' as 'M' | 'F' | 'Autre',
    phone: '',
    email: '',
    cost: 0,
    attentionLevel: 3 as 1 | 2 | 3 | 4 | 5,
    notes: '',
    images: [] as string[],
    audioRecordings: [] as AudioRecording[],
  });

  useEffect(() => {
    if (patient) {
      setFormData({
        name: patient.name,
        age: patient.age,
        gender: patient.gender,
        phone: patient.phone,
        email: patient.email,
        cost: patient.cost,
        attentionLevel: patient.attentionLevel,
        notes: patient.notes,
        images: patient.images,
        audioRecordings: patient.audioRecordings,
      });
    }
  }, [patient]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleAudioRecording = (audioBlob: Blob, transcription: string) => {
    const audioUrl = URL.createObjectURL(audioBlob);
    const newRecording: AudioRecording = {
      id: crypto.randomUUID(),
      url: audioUrl,
      transcription,
      duration: 0, // À implémenter si nécessaire
      createdAt: new Date(),
    };

    setFormData(prev => ({
      ...prev,
      audioRecordings: [...prev.audioRecordings, newRecording],
      notes: prev.notes + (prev.notes ? '\n\n' : '') + `[Audio ${new Date().toLocaleString()}] ${transcription}`,
    }));
  };

  const attentionLevels = [
    { value: 1, label: '1 - Faible', color: 'text-green-600' },
    { value: 2, label: '2 - Modérée', color: 'text-yellow-600' },
    { value: 3, label: '3 - Normale', color: 'text-blue-600' },
    { value: 4, label: '4 - Élevée', color: 'text-orange-600' },
    { value: 5, label: '5 - Critique', color: 'text-red-600' },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Button onClick={onCancel} variant="outline">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour
        </Button>
        <h1 className="text-2xl font-bold text-gray-800">
          {patient ? 'Modifier le dossier patient' : 'Nouveau dossier patient'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Informations Personnelles</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Nom complet *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                required
                placeholder="Nom et prénom du patient"
              />
            </div>
            
            <div>
              <Label htmlFor="age">Âge *</Label>
              <Input
                id="age"
                type="number"
                value={formData.age}
                onChange={(e) => setFormData(prev => ({ ...prev, age: parseInt(e.target.value) || 0 }))}
                required
                min="0"
                max="150"
              />
            </div>
            
            <div>
              <Label htmlFor="gender">Genre</Label>
              <Select 
                value={formData.gender} 
                onValueChange={(value: 'M' | 'F' | 'Autre') => setFormData(prev => ({ ...prev, gender: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="M">Masculin</SelectItem>
                  <SelectItem value="F">Féminin</SelectItem>
                  <SelectItem value="Autre">Autre</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="phone">Téléphone</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                placeholder="Numéro de téléphone"
              />
            </div>
            
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="Adresse email"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Informations Médicales</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="cost">Coût de la consultation (€)</Label>
              <Input
                id="cost"
                type="number"
                step="0.01"
                value={formData.cost}
                onChange={(e) => setFormData(prev => ({ ...prev, cost: parseFloat(e.target.value) || 0 }))}
                min="0"
                placeholder="0.00"
              />
            </div>
            
            <div>
              <Label htmlFor="attention">Niveau d'attention</Label>
              <Select 
                value={formData.attentionLevel.toString()} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, attentionLevel: parseInt(value) as 1 | 2 | 3 | 4 | 5 }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {attentionLevels.map(level => (
                    <SelectItem key={level.value} value={level.value.toString()}>
                      <span className={level.color}>{level.label}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notes et Observations</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="Notes médicales, observations, symptômes, diagnostics..."
              rows={6}
              className="resize-vertical"
            />
          </CardContent>
        </Card>

        <ImageUploader
          images={formData.images}
          onImagesChange={(images) => setFormData(prev => ({ ...prev, images }))}
        />

        <AudioRecorder onRecordingComplete={handleAudioRecording} />

        <div className="flex justify-end gap-4 pt-6">
          <Button type="button" onClick={onCancel} variant="outline">
            Annuler
          </Button>
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
            <Save className="h-4 w-4 mr-2" />
            {patient ? 'Mettre à jour' : 'Créer le dossier'}
          </Button>
        </div>
      </form>
    </div>
  );
};
