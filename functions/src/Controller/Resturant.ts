import {Request ,Response } from "express"
import {ResturantModel} from "../Models/Resturant"  
import { ItemModel } from "../Models/Item"
import { Location } from "../Models/Location"

const addResturant = async (req: Request, res: Response) => {
  const { userId, restaurantName } = req.body
  try {
    console.log("user Id",userId)
    // creating empty document
    const restaurantModel = new ResturantModel()
    const newRestaurant:any = restaurantModel.addResturant(restaurantName);
    console.log(newRestaurant)
    res.status(200).send({
      status: 'success',
      resturantId: newRestaurant['id'],
    })
  } catch(error) {
      res.status(500).json({"Error":"Invalid payload"})
  }
}

const addItemToMenu = async (req: Request, res: Response) => {
    const { resturantId, items} = req.body;
    try{
       const itemObject = new ItemModel(items); 
       const resturantModel = new ResturantModel();
       await resturantModel.addItems(resturantId,itemObject)
          res.status(200).send({
        status: 'success'
        })
    } catch(error){
      res.status(500).json({"Error":"Invalid payload"})
    }
}

const setLocationResturant = async (req: Request, res: Response) => {
    const { resturantId, location } = req.body;
    try{
       const resturantModel = new ResturantModel();
       resturantModel.setLocation(resturantId,location);
        res.status(200).send({
        status: 'success'
        })
    } catch(error){
      res.status(500).json({"Error":error})
    }
}

const getResturantsNearMe = async (req: Request, res: Response) => {
    const { latitude, longitude } = req.body;
    try{
       const resturantModel = new ResturantModel();
       const location:Location = {
            "longitude":longitude,
            "latitude":latitude
       }
       const documents = await resturantModel.getResturantsNearMe(location); 
       console.log(documents)
        res.status(200).send({
        status: 'success',
        data:"data",
        location:documents
        })
    }
    catch(error){
      res.status(500).json({"Error":error})
    }
}

export {addResturant,addItemToMenu,setLocationResturant,getResturantsNearMe}