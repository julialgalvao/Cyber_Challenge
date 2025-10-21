import * as SecureStore from 'expo-secure-store';
import { appendAudit } from './audit';

const CONSENT_KEY = 'consent:v1';

export type Consent = { accepted: boolean; version: number; timestamp: number };

export async function getConsent(): Promise<Consent | null> {
  const raw = await SecureStore.getItemAsync(CONSENT_KEY);
  return raw ? JSON.parse(raw) as Consent : null;
}

export async function setConsent(accepted: boolean, version: number) {
  const c: Consent = { accepted, version, timestamp: Date.now() };
  await SecureStore.setItemAsync(CONSENT_KEY, JSON.stringify(c));
  await appendAudit({ type: accepted ? 'CONSENT_GIVEN' : 'CONSENT_REVOKED', version, timestamp: c.timestamp });
}

export async function hasConsent(): Promise<boolean> {
  const c = await getConsent();
  return !!c?.accepted;
}
