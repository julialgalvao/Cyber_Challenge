import * as SecureStore from 'expo-secure-store';

const KEY_NAME = 'crypto:key:v1';

async function getKey(): Promise<CryptoKey> {
  let b64 = await SecureStore.getItemAsync(KEY_NAME);
  if (!b64) {
    const key = crypto.getRandomValues(new Uint8Array(32));
    b64 = btoa(String.fromCharCode(...Array.from(key)));
    await SecureStore.setItemAsync(KEY_NAME, b64);
  }
  const raw = Uint8Array.from(atob(b64), c => c.charCodeAt(0));
  return await crypto.subtle.importKey('raw', raw, 'AES-GCM', false, ['encrypt','decrypt']);
}

export async function encrypt(plain: string): Promise<string> {
  const key = await getKey();
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encoded = new TextEncoder().encode(plain);
  const ct = await crypto.subtle.encrypt({name:'AES-GCM', iv}, key, encoded);
  const out = new Uint8Array(iv.byteLength + ct.byteLength);
  out.set(iv,0);
  out.set(new Uint8Array(ct), iv.byteLength);
  return btoa(String.fromCharCode(...Array.from(out)));
}

export async function decrypt(b64: string): Promise<string> {
  const data = Uint8Array.from(atob(b64), c => c.charCodeAt(0));
  const iv = data.slice(0,12);
  const ct = data.slice(12);
  const key = await getKey();
  const plain = await crypto.subtle.decrypt({name:'AES-GCM', iv}, key, ct);
  return new TextDecoder().decode(plain);
}
