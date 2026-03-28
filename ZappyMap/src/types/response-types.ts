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

}