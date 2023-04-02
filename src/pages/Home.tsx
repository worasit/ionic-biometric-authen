import React, { useState } from "react";
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
import { useVault } from "../hooks/useVault";

const Home: React.FC = () => {
  const {
    session,
    storeSession,
    restoreSession,
    lockVault,
    unlockVault,
    vaultIsLocked,
  } = useVault();
  const [data, setData] = useState<string>("");

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Identity Vault</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
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
              onIonInput={(e) => setData(e.detail.value! as string)}
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
            <div style={{ flex: "auto" }}>
              <IonButton expand="block" onClick={restoreSession}>
                Restore Session Data
              </IonButton>
            </div>
          </IonItem>

          <IonItem>
            <div style={{ flex: "auto" }}>
              <IonButton expand="block" onClick={lockVault}>
                Lock Vault
              </IonButton>
            </div>
          </IonItem>

          <IonItem>
            <div style={{ flex: "auto" }}>
              <IonButton expand="block" onClick={unlockVault}>
                Unlock Vault
              </IonButton>
            </div>
          </IonItem>

          <IonItem>
            <IonLabel>
              <div>Session Data: {session}</div>
              <div>Vault is Locked: {vaultIsLocked.toString()}</div>
            </IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
