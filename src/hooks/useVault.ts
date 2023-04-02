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
  const vault = useMemo(() => {
    return Capacitor.getPlatform() === "web"
      ? new BrowserVault(config)
      : new Vault(config);
  }, []);

  const storeSession = async (value: string): Promise<void> => {
    setSession(value);
    await vault.setValue(key, value);
  };
};
