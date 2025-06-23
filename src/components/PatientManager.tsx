
import React, { useState } from 'react';
import { usePatients } from '../hooks/usePatients';
import { PatientList } from './PatientList';
import { PatientForm } from './PatientForm';
import { Patient } from '../types/Patient';

type View = 'list' | 'form';

export const PatientManager: React.FC = () => {
  const { patients, addPatient, updatePatient, deletePatient } = usePatients();
  const [currentView, setCurrentView] = useState<View>('list');
  const [editingPatient, setEditingPatient] = useState<Patient | undefined>();

  const handleNewPatient = () => {
    setEditingPatient(undefined);
    setCurrentView('form');
  };

  const handleEditPatient = (patient: Patient) => {
    setEditingPatient(patient);
    setCurrentView('form');
  };

  const handleSavePatient = (patientData: Omit<Patient, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingPatient) {
      updatePatient(editingPatient.id, patientData);
    } else {
      addPatient(patientData);
    }
    setCurrentView('list');
    setEditingPatient(undefined);
  };

  const handleCancel = () => {
    setCurrentView('list');
    setEditingPatient(undefined);
  };

  if (currentView === 'form') {
    return (
      <PatientForm
        patient={editingPatient}
        onSave={handleSavePatient}
        onCancel={handleCancel}
      />
    );
  }

  return (
    <PatientList
      patients={patients}
      onEditPatient={handleEditPatient}
      onDeletePatient={deletePatient}
      onNewPatient={handleNewPatient}
    />
  );
};
