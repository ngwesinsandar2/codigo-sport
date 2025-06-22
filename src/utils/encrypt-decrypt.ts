import SimpleCrypto, { PlainData } from 'simple-crypto-js';

export function decrypt<T>(myString: string): T {
  const simpleCrypto = new SimpleCrypto(import.meta.env.VITE_SECRET_KEY);
  return simpleCrypto.decrypt(myString) as T;
}

export function encrypt<T extends PlainData>(myString: T): string {
  const simpleCrypto = new SimpleCrypto(import.meta.env.VITE_SECRET_KEY);
  return simpleCrypto.encrypt(myString);
}
