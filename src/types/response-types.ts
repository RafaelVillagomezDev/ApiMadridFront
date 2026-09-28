import type { s } from "vue-router/dist/router-CWoNjPRp.mjs";

export interface User{
    token: string,
}

export type FetchMethod = "POST" | "GET" | "PUT" | "DELETE";

export interface Response {

    messague: string,
    data: <T>(T:any) => T,
    code: number,
    error?:string | null,
    loading: boolean,
}



export interface FetchOptions {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    headers?: Record<string, string>;
    body?: any;
}

export interface Api_interface {
     readonly [key: string]: string | null | undefined;
}