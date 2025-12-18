// cache.service.ts
import { Injectable } from '@angular/core';
@Injectable({ providedIn: 'root' })
export class CacheService {
 private cache = new Map<string, any>();
 get(key: string): any | null {
   return this.cache.has(key) ? this.cache.get(key) : null;
 }
 set(key: string, value: any): void {
   this.cache.set(key, value);
 }
 clear(): void {
   this.cache.clear();
 }
}
