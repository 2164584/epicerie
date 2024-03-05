import './App.css';
import React, { useEffect, useState } from 'react';
import Item from "./component/Item";
import ItemList from "./component/ItemList";
import Pomme from "./image/apple.jpg"
import Avocat from "./image/avocat.jpg"

function App() {
  const puppeteer = require('puppeteer');
  const fs = require('fs');

  (async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://example.com');
  
    // Example of scraping image URLs
    const imageUrls = await page.evaluate(() => {
      const images = Array.from(document.querySelectorAll('img'));
      return images.map(img => img.src);
    });
  
    // Download and save images
    for (let i = 0; i < imageUrls.length; i++) {
      const imageUrl = imageUrls[i];
      const imageBuffer = await page.evaluate(async (url) => {
        const response = await fetch(url);
        return response.arrayBuffer();
      }, imageUrl);
      fs.writeFileSync(`image${i + 1}.jpg`, Buffer.from(imageBuffer));
    }
  
    await browser.close();
  })();

  let itemList = [
      {
          image: Pomme,
          name: 'Pommes',
          brand: 'Brand A',
          price: 10.99,
          gram: '100g',
          pricePerHundGram: 5.50,
          discountPrice: 9.99,
          isDiscountedThisWeek: true,
          isDiscountedNextWeek: false
      },
      {
          image: Avocat,
          name: 'Avocats',
          brand: 'Brand B',
          price: 5.99,
          gram: '150g',
          pricePerHundGram: 4.00,
          discountPrice: 4.49,
          isDiscountedThisWeek: false,
          isDiscountedNextWeek: true
      }
  ]

  //lauch function at the start of the app
  useEffect(() => {
    fetch('http://localhost:3001/items')
      .then(response => response.json())
      .then(data => {
          console.log(data)
      })
  }, [])



  return (
    <div className="container-fluid bg-light">
      <div className='row'>
        <div className='col-12'>
          <h1 className='text-info text-center fw-light'>
            Épicerie
          </h1>
        </div>
      </div>
        <div className="row">
            <div className="col-8 mx-auto">
                <ItemList itemList={itemList}/>
            </div>
        </div>
    </div>
  );
}

export default App;
