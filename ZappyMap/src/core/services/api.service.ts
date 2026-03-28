
interface Api_interface {
     readonly [key: string]: string | null | undefined;
}

export const API_ENDPOINTS  = {
  ANONYMUS_TOKEN: "http://localhost:3000/api/v1/anonymous/token", 
     
} as Api_interface;