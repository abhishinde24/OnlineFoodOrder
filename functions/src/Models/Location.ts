import { GeoPoint } from "firebase-admin/firestore"
export interface Location {
    id?:string,
    latitude?:string,
    longitude?:string,
    address_line_1?:string,
    address_line_2?:string,
    geohash?:GeoPoint,
    city?:string,
    state?:string,
    pincode?:string
}