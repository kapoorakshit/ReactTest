export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[]|any;
  }
 
 export interface Props {
    category: string;
  }
  export interface Propss {
    pageSize: number;
  
  }
  export interface navprop {
   
   onselect: (category:string)=>void;
   


  }