
//This just highlights that the API KEY has to be a string

declare namespace NodeJS {
  export interface ProcessEnv {
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: string;
  }
}
