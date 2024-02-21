import { Item,ItemModel } from "./Item"
import { Location } from "./Location"
import { RESTURANT_COLLECTION } from "../collectionPath"
import { db, admin } from "../config/firebase"
import { GeoPoint } from 'firebase-admin/firestore';

// import { v4 as uuidv4 } from 'uuid';


export interface Resturant {
    id:string,
    name:string,
    location:Location,
    menu:Item[]
}

export class ResturantModel {
    private collectionPath : string;

    constructor(){
        this.collectionPath = RESTURANT_COLLECTION  
    }

    async addResturant(name:string){
        const entry = db.collection(this.collectionPath).doc()
        const entryObject = {
            id : entry.id,
            name
        }
        await entry.set(entryObject)
        return {entry}
    }

    addItems(id:string,items: ItemModel){
        const collectionRef = db.collection(this.collectionPath + "/"+ id + "/items");

        items.getItems().forEach((item)=>{
            const docRef = collectionRef.doc();
            const itemObject = {
                id : docRef.id,
                name : item.name,
                price : item.price,
                is_veg : item.is_veg,
            }
            docRef.set(itemObject);
        })
    }

    setLocation(id:string,location:Location){
        try{
            const longitude = Number(location.longitude);
            const latitude = Number(location.latitude)
            location.geohash = new GeoPoint(longitude,latitude)
            const documenetRef = db.collection(this.collectionPath).doc(id)
            documenetRef.update({location,"geohash":location.geohash});
        }
        catch(error){
            console.log(error)
        }
    }

    async getResturantsNearMe(location:Location){
        try{

            const radius=2;
            const radiusInKm = radius / 1000;
            const latitude = Number(location.latitude)
            const longitude = Number(location.longitude)
            console.log("latitude ",latitude,"longitude ",longitude)
            // Calculate the minimum and maximum latitude and longitude based on the center and radius
            const latDiff = radiusInKm / 110.574;
            const lngDiff = Math.abs(radiusInKm / (111.320 * Math.cos(latitude * Math.PI / 180)));

            const minLat = latitude - latDiff;
            const maxLat = latitude + latDiff;
            const minLng = longitude - lngDiff;
            const maxLng = longitude + lngDiff; 

            const db = admin.firestore();
            const collectionRef = db.collection(this.collectionPath);
            // searching for resturants document
            const query = collectionRef
            .where('location.geohash', '>=', new GeoPoint(minLat, minLng))
            .where('location.geohash', '<=', new GeoPoint(maxLat, maxLng));

            const snapshot = await query.get();

            const documents:any = [];
            snapshot.forEach((doc:any) => {
                documents.push(doc.data());
            });
            return documents;
        }
        catch(error){
            console.log(error)
        }
    }
}