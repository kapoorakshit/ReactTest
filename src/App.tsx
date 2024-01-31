import React from 'react';
import logo from './logo.svg';
import { Link, Route, Routes } from "react-router-dom";
import './App.css';
import { Login } from './Components/Login';
import Navigation from './Components/Navigation';
import { Smartphones } from './Components/Smartphone';
import { Home } from './Components/Home';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import { useState } from 'react';
import { MultiselectWithValueString } from './Components/Combobox';
function App() {
  const mycategory='smartphones'
  const laptop='laptops';
  const fragnances='fragrances';
  const skincare='skincare';
  const groceries='groceries';
  const homedecoration='home-decoration"';
  const furniture='furniture';
  const tops='tops';
  const wdresses='womens-dresses';
  const wshoes='womens-shoes';
  const menshirt='mens-shirts';
  const ms='mens-shoes';
  const mw='mens-watches';
  const ww='womens-watches';
  const wb='womens-bags';
  const wj='womens-jewellery';
  const sg='sunglasses';
  const automotive='automotive';
  const motorcycle='motorcycle';
  const light='lighting';
  const [Category,setCategory]=useState('');
debugger;

  const setCategoryHandler = (selectedCategory: string) => {
    debugger;
    console.log("Selected category:", selectedCategory);
 var categoryy:string=selectedCategory;
  };

  function setcatgeory(evt:any,item:any) {
    debugger;

    console.log("hiiiiiiiiiiiiiiiiiii");
    console.log(item.name);
   setCategory(item.name); 
   console.log(Category);   
  }
  function setcategeory(category:string) {
    debugger;
    console.log("category is",category);
    setCategory(category); 
  }
  console.log("Categoryy is",Category);

  return (
  <div>
  
     <Routes>
     <Route path="/" element={<Login />} />
     <Route path="/Navigation/combo" element={<MultiselectWithValueString/>} />
     
     <Route path="/Navigation" element={<Navigation onselect={setcategeory} />} />
<Route path="/Navigation/Laptops" element={<Smartphones category={Category} />}/>
   <Route path="/Navigation/fragnances" element={ <Smartphones category={fragnances} />}/>
   <Route path="/Navigation/fragnances" element={ <Smartphones category={fragnances} />}/>
   <Route path="/Navigation/skincare" element={<Smartphones category={skincare} />}/>
   <Route path="/Navigation/groceries" element={<Smartphones category={groceries} />}/>
   <Route path="/Navigation/home-decoration" element={<Smartphones category={homedecoration} />}/>
   <Route path="/Navigation/furniture" element={<Smartphones category={furniture} />}/>
   <Route path="/Navigation/tops" element={<Smartphones category={tops} />}/>
   <Route path="/Navigation/women-dresses" element={<Smartphones category={wdresses} />}/>
   <Route path="/Navigation/women-shoes" element={<Smartphones category={wshoes} />}/>
   <Route path="/Navigation/mens-shirts" element={<Smartphones category={menshirt} />}/>
   <Route path="/Navigation/mens-shoes" element={<Smartphones category={ms} />}/>
   <Route path="/Navigation/mens-watches" element={<Smartphones category={mw} />}/>
   <Route path="/Navigation/women-watches" element={<Smartphones category={ww} />}/>
   <Route path="/Navigation/women-watches" element={<Smartphones category={ww} />}/>
   <Route path="/Navigation/womens-bags" element={<Smartphones category={wb} />}/>
   <Route path="/Navigation/womens-jewellery" element={<Smartphones category={wj} />}/>
   <Route path="/Navigation/sunglasses" element={<Smartphones category={sg} />}/>
   <Route path="/Navigation/automotive" element={<Smartphones category={automotive} />}/>
   <Route path="/Navigation/motorcycle" element={<Smartphones category={motorcycle} />}/>
   <Route path="/Navigation/lightening" element={<Smartphones category={light} />}/>
   <Route path="/Navigation/Home" element={<Home pageSize={2}  />}/>
   <Route path="/Navigation/Home" element={<Home pageSize={2}  />}/>
     </Routes>
  
  
  </div>
  );
}

export default App;


