import {
  BrowserVault,
  DeviceSecurityType,
  IdentityVaultConfig,
  Vault,
  VaultType,
} from "@ionic-enterprise/identity-vault";
import { useEffect, useMemo, useState } from "react";
import { Capacitor } from "@capacitor/core";

const config: IdentityVaultConfig = {
  key: "io.ionic.getstartedivreact",
  type: VaultType.SecureStorage,
  deviceSecurityType: DeviceSecurityType.None,
  lockAfterBackgrounded: 2000,
  shouldClearVaultAfterTooManyFailedAttempts: true,
  customPasscodeInvalidUnlockAttempts: 2,
  unlockVaultOnLoad: false,
};

const key: string = "sessionData";
type LockType = "NoLocking" | "Biometrics" | "SystemPasscode" | undefined;
const getConfigUpdates = (lockType: LockType) => {
  switch (lockType) {
    case "Biometrics":
      return {
        type: VaultType.DeviceSecurity,
        deviceSecurityType: DeviceSecurityType.Biometrics,
      };
    case "SystemPasscode":
      return {
        type: VaultType.DeviceSecurity,
        deviceSecurityType: DeviceSecurityType.SystemPasscode,
      };
    default:
      return {
        type: VaultType.SecureStorage,
        deviceSecurityType: DeviceSecurityType.None,
      };
  }
};

export const useVault = () => {
  const [session, setSession] = useState<string | undefined>(undefined);
  const [vaultIsLocked, setVaultIsLocked] = useState<boolean>(false);
  const [lockType, setLockType] = useState<LockType>(undefined);

  const vault = useMemo(() => {
    return Capacitor.getPlatform() === "web"
      ? new BrowserVault(config)
      : new Vault(config);
  }, []);

  vault.onLock(async (lockEvent) => {
    console.log("onLock");
    console.log(JSON.stringify(lockEvent));
    setVaultIsLocked(true);
    setSession(undefined);
  });

  vault.onUnlock(() => {
    console.log("onUnlock");
    setVaultIsLocked(false);
  });

  vault.onError((err) => {
    console.log("vault error: " + JSON.stringify(err));
  });

  vault.isLocked().then(setVaultIsLocked);

  useEffect(() => {
    if (lockType) {
      const { type, deviceSecurityType } = getConfigUpdates(lockType);
      vault
        .updateConfig({
          ...vault.config,
          type,
          deviceSecurityType,
        })
        .then(() =>
          console.log(`updated vault config: ${type} - ${deviceSecurityType}`)
        );
    }
  }, [lockType, vault]);

  const storeSession = async (value: string): Promise<void> => {
    setSession(value);
    console.log("store session: " + value);
    await vault.setValue(key, value);
  };

  const restoreSession = async (): Promise<void> => {
    const value = await vault.getValue(key);
    console.log("restore session: " + value);
    setSession(value);
  };

  const clearSession = async (): Promise<void> => {
    await vault.clear();
  };

  const lockVault = async (): Promise<void> => {
    await vault
      .lock()
      .then((value) => console.log("lockVault Completed: " + value));
  };

  const unlockVault = async (): Promise<void> => {
    await vault
      .unlock()
      .then((value) => console.log("unlockVault Completed: " + value));
  };

  return {
    session,
    vaultIsLocked,
    lockType,
    storeSession,
    restoreSession,
    clearSession,
    lockVault,
    unlockVault,
    setLockType,
  };
};
