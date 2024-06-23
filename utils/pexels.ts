import axios from "axios"

type Collection = {
    id: string;
    title: string;
    description: string;
    media_count: number;
    // Add other properties as needed
  };
  
 export type CollectionsResponse = {
    collections: Collection[];
  };
  
  export const getCollections = async (): Promise<CollectionsResponse> => {
    const response = await fetch("https://api.pexels.com/v1/collections/featured?page=25&per_page=20", {
      headers: {
        Authorization: "31PTanDobJJiJodjGrX3AqMc1Ybp2mu6GK10RLgADzyII08kn7BC579P"
      }
    });
    const data = await response.json();
    return data;
  };