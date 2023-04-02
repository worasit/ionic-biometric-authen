import {
  DeviceSecurityType,
  IdentityVaultConfig,
  VaultType,
} from '@ionic-enterprise/identity-vault'

const config: IdentityVaultConfig = {
  key: 'io.ionic.getstartedivreact',
  type: VaultType.SecureStorage,
  deviceSecurityType: DeviceSecurityType.None,
  lockAfterBackgrounded: 2000,
  shouldClearVaultAfterTooManyFailedAttempts: true,
  customPasscodeInvalidUnlockAttempts: 2,
  unlockVaultOnLoad: false,
}

const key: String = 'sessionData'
