import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Home.css";
import React, { useState } from "react";
import { useVault } from "../hooks/useVault";

const Home: React.FC = () => {
  const { session, storeSession, restoreSession } = useVault();
  const [data, setData] = useState<string>("");
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Identity Vault</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Identity Vault</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonList>
          <IonItem>
            <IonLabel position="floating">Enter the "session" data</IonLabel>
            <IonInput
              value={data}
              onIonInput={(e) => {
                console.log("enter session: " + e.detail.value!.toString());
                setData(e.detail.value!.toString());
              }}
            />
          </IonItem>
          <IonItem>
            <div style={{ flex: "auto" }}>
              <IonButton expand="block" onClick={() => storeSession(data)}>
                Set Session Data
              </IonButton>
            </div>
          </IonItem>

          <IonItem>
            <IonLabel>
              <div>Session Data: {session}</div>
            </IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
