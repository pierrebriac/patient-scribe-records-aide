
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity } from 'lucide-react';
import { VitalSigns } from '../types/Patient';

interface VitalSignsFormProps {
  vitalSigns: VitalSigns;
  onChange: (vitalSigns: VitalSigns) => void;
}

export const VitalSignsForm: React.FC<VitalSignsFormProps> = ({ vitalSigns, onChange }) => {
  const handleChange = (field: keyof VitalSigns, value: string) => {
    const numericValue = value === '' ? undefined : parseFloat(value);
    onChange({
      ...vitalSigns,
      [field]: numericValue,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Signes Vitaux
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="pulse">Pouls (bpm)</Label>
          <Input
            id="pulse"
            type="number"
            value={vitalSigns.pulse || ''}
            onChange={(e) => handleChange('pulse', e.target.value)}
            placeholder="Ex: 72"
            min="0"
            max="300"
          />
        </div>

        <div>
          <Label htmlFor="temperature">Température (°C)</Label>
          <Input
            id="temperature"
            type="number"
            step="0.1"
            value={vitalSigns.temperature || ''}
            onChange={(e) => handleChange('temperature', e.target.value)}
            placeholder="Ex: 36.5"
            min="30"
            max="45"
          />
        </div>

        <div>
          <Label htmlFor="systolicBP">Tension systolique (mmHg)</Label>
          <Input
            id="systolicBP"
            type="number"
            value={vitalSigns.systolicBP || ''}
            onChange={(e) => handleChange('systolicBP', e.target.value)}
            placeholder="Ex: 120"
            min="50"
            max="300"
          />
        </div>

        <div>
          <Label htmlFor="diastolicBP">Tension diastolique (mmHg)</Label>
          <Input
            id="diastolicBP"
            type="number"
            value={vitalSigns.diastolicBP || ''}
            onChange={(e) => handleChange('diastolicBP', e.target.value)}
            placeholder="Ex: 80"
            min="30"
            max="200"
          />
        </div>

        <div>
          <Label htmlFor="weight">Poids (kg)</Label>
          <Input
            id="weight"
            type="number"
            step="0.1"
            value={vitalSigns.weight || ''}
            onChange={(e) => handleChange('weight', e.target.value)}
            placeholder="Ex: 70.5"
            min="0"
            max="500"
          />
        </div>

        <div>
          <Label htmlFor="height">Taille (cm)</Label>
          <Input
            id="height"
            type="number"
            value={vitalSigns.height || ''}
            onChange={(e) => handleChange('height', e.target.value)}
            placeholder="Ex: 175"
            min="0"
            max="250"
          />
        </div>

        <div>
          <Label htmlFor="respiratoryRate">Fréquence respiratoire (/min)</Label>
          <Input
            id="respiratoryRate"
            type="number"
            value={vitalSigns.respiratoryRate || ''}
            onChange={(e) => handleChange('respiratoryRate', e.target.value)}
            placeholder="Ex: 16"
            min="0"
            max="100"
          />
        </div>

        <div>
          <Label htmlFor="oxygenSaturation">Saturation O2 (%)</Label>
          <Input
            id="oxygenSaturation"
            type="number"
            value={vitalSigns.oxygenSaturation || ''}
            onChange={(e) => handleChange('oxygenSaturation', e.target.value)}
            placeholder="Ex: 98"
            min="0"
            max="100"
          />
        </div>
      </CardContent>
    </Card>
  );
};
