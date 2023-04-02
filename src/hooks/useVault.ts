import {
  BrowserVault,
  DeviceSecurityType,
  IdentityVaultConfig,
  Vault,
  VaultType,
} from "@ionic-enterprise/identity-vault";
import { useMemo, useState } from "react";
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

export const useVault = () => {
  const [session, setSession] = useState<string | undefined>(undefined);
  const [vaultIsLocked, setVaultIsLocked] = useState<boolean>(false);
  const vault = useMemo(() => {
    return Capacitor.getPlatform() === "web"
      ? new BrowserVault(config)
      : new Vault(config);
  }, []);

  vault.onLock(async (lockEvent) => {
    console.log("onLock");
    console.log(JSON.stringify(lockEvent));
    setVaultIsLocked(true);
  });

  vault.onUnlock(() => {
    console.log("onUnlock");
    setVaultIsLocked(false);
  });

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
    await vault.lock();
  };

  const unlockVault = async (): Promise<void> => {
    await vault.unlock();
  };

  return {
    session,
    vaultIsLocked,
    storeSession,
    restoreSession,
    clearSession,
    lockVault,
    unlockVault,
  };
};
