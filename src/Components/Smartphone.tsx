import { useEffect } from "react";
import Navigation from "./Navigation";
import { useState } from "react";
import { Product } from "../Interface/interface";
import { Props } from "../Interface/interface";
import './Smartphone.css';
import axios from "axios";
import { useParams } from "react-router-dom";

import {
    Card,
    CardFooter,
    CardHeader,
    CardPreview,
  } from "@fluentui/react-components";
  import {
    makeStyles,
    Body1,
    Caption1,
    Button,
    shorthands,
  } from "@fluentui/react-components";
import { FontSizes } from "@fluentui/react";
  const useStyles = makeStyles({
    card: {
      ...shorthands.margin("auto"),
      width: "720px",
      maxWidth: "100%",
      marginBottom: "20px",
      marginTop: "10px"
    },
  });


export const Smartphones: React.FC<Props> = ({category}) => {

  debugger;

    const styles = useStyles();

const token=localStorage.getItem("token");
const [mproducts, setProducts] = useState<Product[]>([]);
console.log("Received category is ",{category});
const fetchData = async () => {
    try {
      const response = await axios.get(`https://dummyjson.com/products/category/${category}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      debugger;

      if (response.status !== 200) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = response.data;
      const products=data.products;
      console.log("yes");
      setProducts(products);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // const fetchData = async () => {
  //   try {
  //     const products = await apiService.getProductsByCategory(category);
  //     setProducts(products);
  //   } catch (error) {
  //     // handle error
  //   }
  // };
useEffect(()=> {
      fetchData();
},[]);
return (
<div className="container1">

<div className="card">
      {mproducts?.map((product: Product) => (
        <Card key={product.id} className={styles.card}>
          <CardHeader
            header={
              <Body1>
             
                <b>Brand</b> {product.brand}<br/>
                <b>Price</b> {product.price}<br/>
                <b>Category</b> {product.category}<br/>
                <b>Stock</b> {product.stock}<br/>
                <b>Discount Percentage</b> {product.discountPercentage}<br/>
                <b>Rating</b> {product.rating}<br/>
         <br/><img key={product.thumbnail} src={product.thumbnail} alt="Product Picture" />
                <br/> {product.title}<br/>
                <b>Description</b>
              </Body1>
            }
            description={product.description}
          />
<b>Product Images:</b>
          <CardPreview>
            <div className="images">
            {product.images.map((image: string) => (
  <img key={image} src={image} alt="Product Picture" className="images"/>
))}
            </div>
 
          </CardPreview>

          <CardFooter>
      
          </CardFooter>
        </Card>
      ))}
    </div>


</div>
);

}