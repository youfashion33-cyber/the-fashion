/* ============================================
   THE FASHION — Full Product Data
   ============================================ */

const allProducts = [
  // --- REAL COLLECTION PRODUCTS ---
  { id: 1, name: "Sherpa Collar Fleece Polo Sweatshirt", category: "Knitwear", price: 2199, image: "assets/product-01.jpg", badge: "New" },
  { id: 2, name: "Monochrome Block Striped Quarter-Zip Pullover", category: "Knitwear", price: 2499, image: "assets/product-02.png", badge: "Bestseller" },
  { id: 3, name: "Pinstripe Boxy Embroidered Camp Collar Shirt", category: "Shirts", price: 1899, image: "assets/product-03.jpg", badge: "New" },
  { id: 4, name: "Piped Contrast Check Short-Sleeve Shirt", category: "Shirts", price: 1799, image: "assets/product-04.jpg", badge: "Premium" },

  // --- DRESSES & SHIRTS ---
  { id: 5, name: "Industrial Graphic Zip-Front Boxy Shirt", category: "Shirts", price: 1999, image: "assets/product-05.jpg", badge: "New" },
  { id: 6, name: "Navy Fine Pinstripe Cotton Button-Down Shirt", category: "Shirts", price: 2199, image: "assets/product-06.jpg", badge: "Bestseller" },
  { id: 7, name: "Forest Plaid Brushed Fleece Quarter-Zip Pullover", category: "Knitwear", price: 2699, image: "assets/product-07.jpg", badge: "Premium" },
  { id: 8, name: "Two-Tone Contrast Collar Heather Sweatshirt", category: "Knitwear", price: 2299, image: "assets/product-08.jpg", badge: "New" },

  // --- SHIRTS & BOTTOMS ---
  { id: 9, name: "Relaxed Oversized Pinstripe Cotton-Linen Shirt", category: "Shirts", price: 1999, image: "assets/product-09.jpg", badge: "New" },
  { id: 10, name: "Sky Blue Pick-Stitched Cotton Button-Down Shirt", category: "Shirts", price: 2199, image: "assets/product-10.jpg", badge: "Bestseller" },
  { id: 11, name: "Canary Yellow Contrast-Stitch Cotton Shirt", category: "Shirts", price: 2199, image: "assets/product-11.jpg", badge: "New" },
  { id: 12, name: "Brushed Tartan Fleece Wide-Leg Drawstring Trousers", category: "Bottoms", price: 1899, image: "assets/product-12.jpg", badge: "Premium" },
  // --- DENIM & TROUSERS ---
  { id: 13, name: "Vintage Washed Wide-Leg Charcoal Jeans", category: "Bottoms", price: 2499, image: "assets/product-13.jpg", badge: "Bestseller" },
  { id: 14, name: "Natural Oatmeal Linen Wide-Leg Drawstring Trousers", category: "Bottoms", price: 2199, image: "assets/product-14.jpg", badge: "New" },
  { id: 15, name: "Mineral Wash Baggy Skater Denim Jeans", category: "Bottoms", price: 2699, image: "assets/product-15.jpg", badge: "Premium" },
  { id: 16, name: "Chalk White Raw-Hem Wide-Leg Jeans", category: "Bottoms", price: 849, image: "assets/product-16.jpg", badge: "New" },
  { id: 17, name: "Wave Panel Fleece Wide-Leg Track Trousers", category: "Bottoms", price: 1999, image: "assets/product-17.jpg", badge: "New" },
  { id: 18, name: "Stonewashed Vintage Wide-Leg Blue Jeans", category: "Bottoms", price: 2399, image: "assets/product-18.jpg", badge: "Bestseller" },
  { id: 19, name: "Powder Blue Fine-Wale Corduroy Overshirt", category: "Shirts", price: 2299, image: "assets/product-19.jpg", badge: "New" },
  { id: 20, name: "Flame Gradient Acid-Wash Wide-Leg Jeans", category: "Bottoms", price: 2799, image: "assets/product-20.jpg", badge: "Premium" },
  { id: 21, name: "Classic Oversized White Cotton Poplin Shirt", category: "Shirts", price: 1899, image: "assets/product-21.jpg", badge: "Bestseller" },
  { id: 22, name: "Whiskered Faded Charcoal Wide-Leg Jeans", category: "Bottoms", price: 2499, image: "assets/product-22.jpg", badge: "New" },
  { id: 23, name: "Garment-Dyed Forest Green Denim Utility Overshirt", category: "Outerwear", price: 2699, image: "assets/product-23.jpg", badge: "Premium" },
  { id: 24, name: "Breton Striped Heavyweight Cotton Long-Sleeve Tee", category: "Tops", price: 1699, image: "assets/product-24.jpg", badge: "New" },
  { id: 25, name: "Two-Tone Raglan Minimalist Line-Art Tee", category: "Tops", price: 1299, image: "assets/product-25.jpg", badge: "New" },
  { id: 26, name: "Contour Piped Athletic Streetwear Tee", category: "Tops", price: 1499, image: "assets/product-26.jpg", badge: "Bestseller" },
  { id: 27, name: "Layered Collegiate Collared V-Neck Pullover", category: "Knitwear", price: 2399, image: "assets/product-27.jpg", badge: "New" },
  { id: 28, name: "Emerald Forest Block-Striped Rugby Polo", category: "Shirts", price: 1999, image: "assets/product-28.jpg", badge: "Premium" },
  { id: 29, name: "Vintage Mid-Wash Wide-Leg Indigo Jeans", category: "Bottoms", price: 2499, image: "assets/product-29.jpg", badge: "Bestseller" },
  { id: 30, name: "Pitch Black Solid Wide-Leg Denim Trousers", category: "Bottoms", price: 2599, image: "assets/product-30.jpg", badge: "New" },
  { id: 31, name: "Ice Blue Bleached Wide-Leg Denim Jeans", category: "Bottoms", price: 2399, image: "assets/product-31.jpg", badge: "New" },
  { id: 32, name: "Deep Indigo Classic Wide-Leg Denim Jeans", category: "Bottoms", price: 2499, image: "assets/product-32.jpg", badge: "Premium" },

  // --- MORE ESSENTIALS ---
  { id: 33, name: "Piped Minimalist Technical Track Trousers", category: "Bottoms", price: 1899, image: "assets/product-33.jpg", badge: "New" },
  { id: 34, name: "Faded Wash Wide-Leg High-Rise Charcoal Jeans", category: "Bottoms", price: 2399, image: "assets/product-34.jpg", badge: "Bestseller" },
  { id: 35, name: "Forest Green Striped Rib-Knit Quarter-Zip Sweater", category: "Knitwear", price: 2599, image: "assets/product-35.jpg", badge: "Premium" },
  { id: 36, name: "Heavyweight Boxy Mocha Cotton Crew Tee", category: "Tops", price: 1199, image: "assets/product-36.jpg", badge: "New" }
];

// Featured products for homepage (first 15)
const featuredProducts = allProducts.slice(0, 15);
