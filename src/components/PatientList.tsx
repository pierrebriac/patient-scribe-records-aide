
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Patient } from '../types/Patient';
import { Search, Plus, Edit, Trash2, User, Calendar, Euro, AlertTriangle } from 'lucide-react';

interface PatientListProps {
  patients: Patient[];
  onEditPatient: (patient: Patient) => void;
  onDeletePatient: (id: string) => void;
  onNewPatient: () => void;
}

export const PatientList: React.FC<PatientListProps> = ({
  patients,
  onEditPatient,
  onDeletePatient,
  onNewPatient,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.phone.includes(searchTerm) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getAttentionBadge = (level: number) => {
    const configs = {
      1: { label: 'Faible', variant: 'secondary' as const, color: 'bg-green-100 text-green-800' },
      2: { label: 'Modérée', variant: 'secondary' as const, color: 'bg-yellow-100 text-yellow-800' },
      3: { label: 'Normale', variant: 'secondary' as const, color: 'bg-blue-100 text-blue-800' },
      4: { label: 'Élevée', variant: 'destructive' as const, color: 'bg-orange-100 text-orange-800' },
      5: { label: 'Critique', variant: 'destructive' as const, color: 'bg-red-100 text-red-800' },
    };
    
    const config = configs[level as keyof typeof configs];
    return (
      <Badge className={config.color}>
        {level >= 4 && <AlertTriangle className="h-3 w-3 mr-1" />}
        {config.label}
      </Badge>
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Dossiers Patients</h1>
        <Button onClick={onNewPatient} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Nouveau Patient
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Rechercher par nom, téléphone ou email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="text-sm text-gray-600">
        {filteredPatients.length} patient{filteredPatients.length !== 1 ? 's' : ''} trouvé{filteredPatients.length !== 1 ? 's' : ''}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPatients.map((patient) => (
          <Card key={patient.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <User className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{patient.name}</h3>
                    <p className="text-sm text-gray-600">{patient.age} ans • {patient.gender}</p>
                  </div>
                </div>
                {getAttentionBadge(patient.attentionLevel)}
              </div>

              <div className="space-y-2 mb-4">
                {patient.phone && (
                  <p className="text-sm text-gray-600">📞 {patient.phone}</p>
                )}
                {patient.email && (
                  <p className="text-sm text-gray-600">✉️ {patient.email}</p>
                )}
                {patient.cost > 0 && (
                  <p className="text-sm text-gray-600 flex items-center gap-1">
                    <Euro className="h-3 w-3" />
                    {patient.cost.toFixed(2)} €
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                <Calendar className="h-3 w-3" />
                Créé le {patient.createdAt.toLocaleDateString('fr-FR')}
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={() => onEditPatient(patient)}
                  variant="outline"
                  size="sm"
                  className="flex-1"
                >
                  <Edit className="h-3 w-3 mr-1" />
                  Modifier
                </Button>
                <Button
                  onClick={() => {
                    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce dossier patient ?')) {
                      onDeletePatient(patient.id);
                    }
                  }}
                  variant="outline"
                  size="sm"
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPatients.length === 0 && patients.length > 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">Aucun patient trouvé pour cette recherche.</p>
        </div>
      )}

      {patients.length === 0 && (
        <div className="text-center py-12">
          <div className="bg-gray-100 p-8 rounded-lg">
            <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">Aucun dossier patient</h3>
            <p className="text-gray-500 mb-4">Commencez par créer votre premier dossier patient.</p>
            <Button onClick={onNewPatient} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Créer un dossier
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
