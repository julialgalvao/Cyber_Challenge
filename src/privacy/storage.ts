import AsyncStorage from '@react-native-async-storage/async-storage';
import { encrypt, decrypt } from './crypto';

export async function setSecureItem(key: string, value: any) {
  const payload = JSON.stringify(value);
  const cipher = await encrypt(payload);
  await AsyncStorage.setItem(`secure:${key}`, cipher);
}

export async function getSecureItem<T=any>(key: string): Promise<T | null> {
  const cipher = await AsyncStorage.getItem(`secure:${key}`);
  if (!cipher) return null;
  try {
    const json = await decrypt(cipher);
    return JSON.parse(json) as T;
  } catch {
    return null;
  }
}

export async function removeSecureItem(key: string) {
  await AsyncStorage.removeItem(`secure:${key}`);
}
