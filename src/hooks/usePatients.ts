
import { useState, useEffect } from 'react';
import { Patient } from '../types/Patient';

export const usePatients = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [currentPatient, setCurrentPatient] = useState<Patient | null>(null);

  // Charger les patients depuis le localStorage au démarrage
  useEffect(() => {
    const savedPatients = localStorage.getItem('patients');
    if (savedPatients) {
      const parsedPatients = JSON.parse(savedPatients).map((p: any) => ({
        ...p,
        createdAt: new Date(p.createdAt),
        updatedAt: new Date(p.updatedAt),
      }));
      setPatients(parsedPatients);
    }
  }, []);

  // Sauvegarder dans localStorage quand les patients changent
  useEffect(() => {
    localStorage.setItem('patients', JSON.stringify(patients));
  }, [patients]);

  const addPatient = (patientData: Omit<Patient, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newPatient: Patient = {
      ...patientData,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setPatients(prev => [...prev, newPatient]);
    return newPatient;
  };

  const updatePatient = (id: string, updates: Partial<Patient>) => {
    setPatients(prev => prev.map(patient => 
      patient.id === id 
        ? { ...patient, ...updates, updatedAt: new Date() }
        : patient
    ));
  };

  const deletePatient = (id: string) => {
    setPatients(prev => prev.filter(patient => patient.id !== id));
    if (currentPatient?.id === id) {
      setCurrentPatient(null);
    }
  };

  const getPatient = (id: string) => {
    return patients.find(patient => patient.id === id) || null;
  };

  return {
    patients,
    currentPatient,
    setCurrentPatient,
    addPatient,
    updatePatient,
    deletePatient,
    getPatient,
  };
};
