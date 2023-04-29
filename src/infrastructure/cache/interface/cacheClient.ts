export interface CacheClient {
    get(key: string): Promise<string | null>;
    set(key: string, value: string, mode: string, duration: number): Promise<string>;
}
  