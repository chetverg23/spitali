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
} from '@ionic/react';
import { searchOutline, addOutline, createOutline, trashOutline } from 'ionicons/icons';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';

const Tab1: React.FC = () => {
  const [departments, setDepartments] = useState<{ name: string; code: string }[]>([
    { name: 'D1', code: 'HR001' },
    { name: 'D2', code: 'FIN002' },
    { name: 'DE', code: 'MKT003' },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newDepartment, setNewDepartment] = useState({ name: '', code: '' });
  const [searchText, setSearchText] = useState('');
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  const filteredDepartments = departments.filter(dept =>
    dept.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleDelete = (index: number) => {
    setDeleteIndex(index);
  };

  const handleDeleteConfirmed = () => {
    if (deleteIndex !== null) {
      const updatedDepartments = departments.filter((_, i) => i !== deleteIndex);
      setDepartments(updatedDepartments);
      setDeleteIndex(null); // Reset delete index
    }
  };

  const handleEdit = (index: number) => {
    const newName = prompt("Enter new department name:", departments[index].name);
    const newCode = prompt("Enter new department code:", departments[index].code);
    if (newName && newCode) {
      const updatedDepartments = [...departments];
      updatedDepartments[index] = { name: newName, code: newCode };
      setDepartments(updatedDepartments);
    }
  };

  const handleAddDepartment = () => {
    setDepartments([...departments, newDepartment]);
    setNewDepartment({ name: '', code: '' });
    setShowModal(false);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className="ion-text-color">Tab 1</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => setShowModal(true)}>
              <IonIcon icon={addOutline} />
              <span className="ion-text-color">Add Department</span>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="tab1-content ion-text-color">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large" className="ion-text-color">Tab 1</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonItem>
          <IonSearchbar
            placeholder="Search"
            value={searchText}
            onIonInput={(e: any) => setSearchText(e.target.value)}
            className="ion-text-color"
          ></IonSearchbar>
          <IonButton slot="end">
            <IonIcon icon={searchOutline} />
          </IonButton>
        </IonItem>
        <IonGrid>
          <IonRow>
            <IonCol className="header-blue-background">#</IonCol>
            <IonCol className="header-blue-background">Department Name</IonCol>
            <IonCol className="header-blue-background">Actions</IonCol>
          </IonRow>
          {filteredDepartments.map((dept, index) => (
            <IonRow key={index}>
              <IonCol>{index + 1}</IonCol>
              <IonCol>{dept.name}</IonCol>
              <IonCol>
                <IonButton onClick={() => handleEdit(index)} fill="clear">
                  <IonIcon icon={createOutline} />
                </IonButton>
                <IonButton onClick={() => handleDelete(index)} fill="clear">
                  <IonIcon icon={trashOutline} />
                </IonButton>
              </IonCol>
            </IonRow>
          ))}
        </IonGrid>
        <ExploreContainer name="Tab 1 page" />

        <IonAlert
          isOpen={deleteIndex !== null}
          onDidDismiss={() => setDeleteIndex(null)}
          header={'Confirm Delete'}
          message={'Are you sure you want to delete this department?'}
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

        <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Add Department</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setShowModal(false)}>Close</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonItem>
              <IonLabel position="stacked">Name</IonLabel>
              <IonInput
                value={newDepartment.name}
                onIonChange={(e) => setNewDepartment({ ...newDepartment, name: e.detail.value! })}
                className="ion-text-color"
              />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Code</IonLabel>
              <IonInput
                value={newDepartment.code}
                onIonChange={(e) => setNewDepartment({ ...newDepartment, code: e.detail.value! })}
                className="ion-text-color"
              />
            </IonItem>
            <IonItemDivider />
            <IonButton expand="block" onClick={handleAddDepartment}>
              Add Department
            </IonButton>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
