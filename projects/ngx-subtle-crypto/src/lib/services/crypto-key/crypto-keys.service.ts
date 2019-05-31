import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CryptoKeyService {

    cryptoKeys = new Map<string, CryptoKey>();

    constructor() { }

    set(key: string, value: CryptoKey): void {
        this.cryptoKeys.set(key, value);
    }

    get(key: string): CryptoKey {
        return this.cryptoKeys.get(key);
    }

    has(key: string): boolean {
        return this.cryptoKeys.has(key);
    }

    delete(key: string): void {
        this.cryptoKeys.delete(key);
    }

    size(): number {
        return this.cryptoKeys.size;
    }

    clear(): void {
        this.cryptoKeys.clear()
    }

    keys(): IterableIterator<string> {
        return this.cryptoKeys.keys();
    }

    values(): IterableIterator<CryptoKey> {
        return this.cryptoKeys.values();
    }

    entries(): IterableIterator<[string, CryptoKey]> {
        return this.cryptoKeys.entries();
    }
}
