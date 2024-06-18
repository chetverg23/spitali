import React, { useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonIcon,
  IonList,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonAlert,
} from '@ionic/react';
import { addOutline, closeCircleOutline } from 'ionicons/icons';
import './Tab3.css';

interface Patient {
  name: string;
  id: string;
  status: string;
}

const Tab3: React.FC = () => {
  const [admittedPatients, setAdmittedPatients] = useState<Patient[]>([
    { name: 'John Doe', id: 'P001', status: 'Admitted' },
    { name: 'Jane Smith', id: 'P002', status: 'Admitted' },
    { name: 'Michael Johnson', id: 'P003', status: 'Admitted' },
  ]);

  const [dischargedPatients, setDischargedPatients] = useState<Patient[]>([]);
  const [dischargeReason, setDischargeReason] = useState<string>('');
  const [dischargeIndex, setDischargeIndex] = useState<number | null>(null);

  const dischargeReasons = ['Healthy', 'Transfer', 'Death'];

  const handleAdmit = (index: number) => {
    const patientToAdmit = admittedPatients[index];
    setAdmittedPatients(prevPatients => prevPatients.filter((_, i) => i !== index));
    setDischargedPatients(prevPatients => [...prevPatients, patientToAdmit]);
  };

  const handleDischarge = (index: number) => {
    setDischargeIndex(index);
  };

  const handleDischargeConfirmed = () => {
    if (dischargeIndex !== null && dischargeReason !== '') {
      const patientToDischarge = admittedPatients[dischargeIndex];
      setDischargedPatients(prevPatients => [...prevPatients, { ...patientToDischarge, status: dischargeReason }]);
      setAdmittedPatients(prevPatients => prevPatients.filter((_, i) => i !== dischargeIndex));
      setDischargeIndex(null);
      setDischargeReason('');
    } else {
      console.log('Please select a discharge reason.');
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 3</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 3</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonGrid>
          <IonRow>
            <IonCol size="6">
              <IonTitle>Admitted Patients</IonTitle>
              <IonList>
                {admittedPatients.map((patient, index) => (
                  <IonItem key={index}>
                    <IonLabel>{patient.name}</IonLabel>
                    <IonButton onClick={() => handleAdmit(index)} fill="clear">
                      Admit
                      <IonIcon icon={addOutline} slot="end" />
                    </IonButton>
                  </IonItem>
                ))}
              </IonList>
            </IonCol>

            <IonCol size="6">
              <IonTitle>Discharged Patients</IonTitle>
              <IonList>
                {dischargedPatients.map((patient, index) => (
                  <IonItem key={index}>
                    <IonLabel>{patient.name}</IonLabel>
                    <IonLabel>Status: {patient.status}</IonLabel>
                    <IonButton fill="clear">
                      <IonIcon icon={closeCircleOutline} slot="end" />
                    </IonButton>
                  </IonItem>
                ))}
              </IonList>
            </IonCol>
          </IonRow>
        </IonGrid>

        <IonAlert
          isOpen={dischargeIndex !== null}
          onDidDismiss={() => setDischargeIndex(null)}
          header={'Confirm Discharge'}
          buttons={[
            {
              text: 'Cancel',
              role: 'cancel',
              handler: () => {
                setDischargeIndex(null);
                setDischargeReason('');
              },
            },
            {
              text: 'Confirm',
              handler: handleDischargeConfirmed,
            },
          ]}
        >
          <div>
            <IonSelect
              value={dischargeReason}
              placeholder="Select reason"
              onIonChange={(e) => setDischargeReason(e.detail.value!)}
            >
              {dischargeReasons.map((reason, index) => (
                <IonSelectOption key={index} value={reason}>
                  {reason}
                </IonSelectOption>
              ))}
            </IonSelect>
          </div>
        </IonAlert>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
