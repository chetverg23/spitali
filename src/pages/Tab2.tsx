import React, { useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonSearchbar,
  IonItem,
  IonGrid,
  IonRow,
  IonCol,
  IonModal,
  IonInput,
  IonLabel,
  IonItemDivider,
  IonAlert,
  IonText,
} from '@ionic/react';
import {
  searchOutline,
  addOutline,
  createOutline,
  trashOutline,
  closeOutline,
  arrowForwardOutline,
  documentTextOutline,
  closeCircleOutline,
  arrowForwardCircleOutline,
} from 'ionicons/icons';
import './Tab2.css';

interface Patient {
  name: string;
  id: string;
  status: string;
  clinicalRecords: string[];
}

const Tab2: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([
    { name: 'John Doe', id: 'P001', status: 'Admitted', clinicalRecords: ['Initial checkup', 'Follow-up X-ray'] },
    { name: 'Jane Smith', id: 'P002', status: 'Admitted', clinicalRecords: ['Blood test', 'MRI scan'] },
    { name: 'Michael Johnson', id: 'P003', status: 'Admitted', clinicalRecords: ['Physical therapy session'] },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  const [searchText, setSearchText] = useState('');

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchText.toLowerCase()) ||
    patient.id.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleDelete = (index: number) => {
    setDeleteIndex(index);
  };

  const handleDeleteConfirmed = () => {
    if (deleteIndex !== null) {
      const updatedPatients = patients.filter((_, i) => i !== deleteIndex);
      setPatients(updatedPatients);
      setDeleteIndex(null); // Reset delete index
    }
  };

  const handleEdit = (index: number) => {
    const newName = prompt("Enter new patient name:", patients[index].name);
    if (newName) {
      const updatedPatients = [...patients];
      updatedPatients[index] = { ...patients[index], name: newName };
      setPatients(updatedPatients);
    }
  };

  const handleDischarge = (index: number) => {
    const updatedPatients = [...patients];
    updatedPatients[index] = { ...patients[index], status: 'Discharged' };
    setPatients(updatedPatients);
  };

  const openClinicalRecords = (index: number) => {
    setSelectedPatient(patients[index]);
    setShowModal(true);
  };

  const handleNext = (index: number) => {
    alert(`Proceed to next action for ${patients[index].name}`);
    // Add logic for next action
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 2</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => setShowModal(true)}>
              <IonIcon icon={addOutline} />
              Add Patient
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="tab2-content">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 2</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonItem>
          <IonSearchbar
            placeholder="Search"
            value={searchText}
            onIonInput={(e: any) => setSearchText(e.target.value)}
          ></IonSearchbar>
          <IonButton slot="end">
            <IonIcon icon={searchOutline} />
          </IonButton>
        </IonItem>
        <IonGrid>
          <IonRow>
            <IonCol>#</IonCol>
            <IonCol>Name</IonCol>
            <IonCol>ID</IonCol>
            <IonCol>Status</IonCol>
            <IonCol>Actions</IonCol>
          </IonRow>
          {filteredPatients.map((patient, index) => (
            <IonRow key={index}>
              <IonCol>{index + 1}</IonCol>
              <IonCol>{patient.name}</IonCol>
              <IonCol>{patient.id}</IonCol>
              <IonCol>{patient.status}</IonCol>
              <IonCol>
                <IonButton onClick={() => handleEdit(index)} fill="clear">
                  <IonIcon icon={createOutline} />
                </IonButton>
                <IonButton onClick={() => handleDelete(index)} fill="clear">
                  <IonIcon icon={trashOutline} />
                </IonButton>
                <IonButton onClick={() => handleDischarge(index)} fill="clear">
                  <IonIcon icon={closeCircleOutline} />
                </IonButton>
                <IonButton onClick={() => handleNext(index)} fill="clear">
                  <IonIcon icon={arrowForwardCircleOutline} />
                </IonButton>
                <IonButton onClick={() => openClinicalRecords(index)} fill="clear">
                  <IonIcon icon={documentTextOutline} />
                </IonButton>
              </IonCol>
            </IonRow>
          ))}
        </IonGrid>

        {/* Modal for Clinical Records */}
        <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Clinical Records</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setShowModal(false)}>
                  <IonIcon icon={closeOutline} slot="icon-only" />
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            {selectedPatient && (
              <IonGrid>
                <IonRow>
                  <IonCol>
                    <IonItemDivider>Name:</IonItemDivider>
                    <IonText>{selectedPatient.name}</IonText>
                  </IonCol>
                  <IonCol>
                    <IonItemDivider>ID:</IonItemDivider>
                    <IonText>{selectedPatient.id}</IonText>
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol>
                    <IonItemDivider>Status:</IonItemDivider>
                    <IonText>{selectedPatient.status}</IonText>
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol>
                    <IonItemDivider>Clinical Records:</IonItemDivider>
                    {selectedPatient.clinicalRecords.map((record, index) => (
                      <IonItem key={index}>
                        <IonText>{record}</IonText>
                      </IonItem>
                    ))}
                  </IonCol>
                </IonRow>
              </IonGrid>
            )}
          </IonContent>
        </IonModal>

        {/* Confirmation Alert for Delete */}
        <IonAlert
          isOpen={deleteIndex !== null}
          onDidDismiss={() => setDeleteIndex(null)}
          header={'Confirm Delete'}
          message={'Are you sure you want to delete this patient?'}
          buttons={[
            {
              text: 'Cancel',
              role: 'cancel',
              handler: () => {
                setDeleteIndex(null);
              },
            },
            {
              text: 'Delete',
              handler: handleDeleteConfirmed,
            },
          ]}
        />
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
