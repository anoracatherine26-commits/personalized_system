const storageKey = "personalized-grocery-ai-state";

window.addEventListener("error", (event) => {
  const status = document.getElementById("productStatus");
  if (status && !status.textContent.startsWith("Showing ")) {
    status.textContent = `Product menu script error: ${event.message}`;
  }
});

function createId() {
  if (globalThis.crypto && typeof globalThis.crypto.randomUUID === "function") {
    return globalThis.crypto.randomUUID();
  }
  return `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function cloneState(value) {
  if (typeof structuredClone === "function") {
    return structuredClone(value);
  }
  return JSON.parse(JSON.stringify(value));
}

const defaultProducts = [
  { name: "Organic Banana", category: "Produce", icon: "🍌", price: 67.2, nutrition: "Potassium rich snack" },
  { name: "Red Apples", category: "Produce", icon: "🍎", price: 212.8, nutrition: "Crisp fruit for snacks" },
  { name: "Avocado", category: "Produce", icon: "🥑", price: 134.4, nutrition: "Healthy fats" },
  { name: "Broccoli", category: "Produce", icon: "🥦", price: 162.4, nutrition: "Vitamin C and fiber" },
  { name: "Spinach", category: "Produce", icon: "🥬", price: 190.4, nutrition: "Iron and folate" },
  { name: "Romaine Lettuce", category: "Produce", icon: "🥬", price: 145.6, nutrition: "Fresh salad base" },
  { name: "Tomatoes", category: "Produce", icon: "🍅", price: 151.2, nutrition: "Bright sauce and salad staple" },
  { name: "Bell Peppers", category: "Produce", icon: "🫑", price: 179.2, nutrition: "Colorful vitamin boost" },
  { name: "Carrots", category: "Produce", icon: "🥕", price: 117.6, nutrition: "Crunchy beta-carotene" },
  { name: "Potatoes", category: "Produce", icon: "🥔", price: 173.6, nutrition: "Budget friendly starch" },
  { name: "Sweet Corn", category: "Produce", icon: "🌽", price: 140.0, nutrition: "Quick side dish" },
  { name: "Mushrooms", category: "Produce", icon: "🍄", price: 207.2, nutrition: "Savory meatless option" },
  { name: "Cucumbers", category: "Produce", icon: "🥒", price: 89.6, nutrition: "Hydrating fresh vegetable" },
  { name: "Zucchini", category: "Produce", icon: "🥒", price: 129.6, nutrition: "Low calorie vegetable" },
  { name: "Green Beans", category: "Produce", icon: "🫘", price: 134.4, nutrition: "Fresh tender vegetable" },
  { name: "Garlic", category: "Produce", icon: "🧅", price: 56.0, nutrition: "Flavor and immune boost" },
  { name: "Onions", category: "Produce", icon: "🧅", price: 78.4, nutrition: "Versatile cooking base" },
  { name: "Lettuce", category: "Produce", icon: "🥬", price: 112.0, nutrition: "Light salad green" },
  { name: "Cabbage", category: "Produce", icon: "🥬", price: 98.0, nutrition: "Budget vegetable staple" },
  { name: "Strawberries", category: "Fruit", icon: "🍓", price: 291.2, nutrition: "Dessert and smoothie fruit" },
  { name: "Blueberries", category: "Fruit", icon: "🫐", price: 274.4, nutrition: "Antioxidant snack" },
  { name: "Oranges", category: "Fruit", icon: "🍊", price: 201.6, nutrition: "Vitamin C" },
  { name: "Grapes", category: "Fruit", icon: "🍇", price: 246.4, nutrition: "Easy lunchbox fruit" },
  { name: "Watermelon", category: "Fruit", icon: "🍉", price: 380.8, nutrition: "Hydrating family fruit" },
  { name: "Lemons", category: "Fruit", icon: "🍋", price: 84.0, nutrition: "Zesty citrus flavor" },
  { name: "Mangoes", category: "Fruit", icon: "🥭", price: 268.0, nutrition: "Tropical sweet fruit" },
  { name: "Pineapple", category: "Fruit", icon: "🍍", price: 312.0, nutrition: "Tropical and sweet" },
  { name: "Kiwi", category: "Fruit", icon: "🥝", price: 201.6, nutrition: "Tangy vitamin C source" },
  { name: "Coconut", category: "Fruit", icon: "🥥", price: 224.0, nutrition: "Tropical versatile fruit" },
  { name: "Peaches", category: "Fruit", icon: "🍑", price: 235.2, nutrition: "Sweet summer fruit" },
  { name: "Whole Milk", category: "Dairy", icon: "🥛", price: 257.6, nutrition: "Calcium and protein" },
  { name: "Almond Milk", category: "Dairy", icon: "🥛", price: 134.4, nutrition: "Dairy-free beverage" },
  { name: "Greek Yogurt", category: "Dairy", icon: "🥣", price: 285.6, nutrition: "Protein and probiotics" },
  { name: "Cheddar Cheese", category: "Dairy", icon: "🧀", price: 268.8, nutrition: "Sandwich and snack staple" },
  { name: "Butter", category: "Dairy", icon: "🧈", price: 218.4, nutrition: "Baking essential" },
  { name: "Mozzarella Cheese", category: "Dairy", icon: "🧀", price: 289.6, nutrition: "Melting cheese" },
  { name: "Cream Cheese", category: "Dairy", icon: "🧀", price: 235.2, nutrition: "Bagel and dessert spread" },
  { name: "Sour Cream", category: "Dairy", icon: "🥣", price: 156.8, nutrition: "Rich creamy condiment" },
  { name: "Cottage Cheese", category: "Dairy", icon: "🥣", price: 196.0, nutrition: "High protein snack" },
  { name: "Oat Milk", category: "Dairy", icon: "🥛", price: 168.0, nutrition: "Plant-based alternative" },
  { name: "Eggs", category: "Protein", icon: "🥚", price: 263.2, nutrition: "Versatile breakfast protein" },
  { name: "Chicken Breast", category: "Protein", icon: "🍗", price: 498.4, nutrition: "Lean protein" },
  { name: "Ground Beef", category: "Protein", icon: "🥩", price: 425.6, nutrition: "Dinner protein" },
  { name: "Pork Chops", category: "Protein", icon: "🥩", price: 403.2, nutrition: "High protein entree" },
  { name: "Tofu", category: "Protein", icon: "◻️", price: 184.8, nutrition: "Plant protein" },
  { name: "Black Beans", category: "Protein", icon: "🫘", price: 100.8, nutrition: "Fiber and protein" },
  { name: "Chickpeas", category: "Protein", icon: "🫘", price: 117.6, nutrition: "Protein-packed legume" },
  { name: "Lentils", category: "Protein", icon: "🫘", price: 128.8, nutrition: "Iron rich legume" },
  { name: "Canned Beans", category: "Protein", icon: "🥫", price: 95.2, nutrition: "Quick protein option" },
  { name: "Turkey Breast", category: "Protein", icon: "🍗", price: 445.6, nutrition: "Lean poultry protein" },
  { name: "Salmon Fillet", category: "Seafood", icon: "🐟", price: 700.0, nutrition: "Omega-3 source" },
  { name: "Shrimp", category: "Seafood", icon: "🍤", price: 599.2, nutrition: "Quick seafood protein" },
  { name: "Tuna Cans", category: "Seafood", icon: "🥫", price: 252.0, nutrition: "Pantry seafood" },
  { name: "Fish Fillets", category: "Seafood", icon: "🐟", price: 536.0, nutrition: "White fish protein" },
  { name: "Cod", category: "Seafood", icon: "🐟", price: 624.0, nutrition: "Mild white fish" },
  { name: "Brown Rice", category: "Grains", icon: "🍚", price: 235.2, nutrition: "Fiber rich pantry staple" },
  { name: "White Rice", category: "Grains", icon: "🍚", price: 207.2, nutrition: "Everyday staple" },
  { name: "Quinoa 1kg", category: "Grains", icon: "🌾", price: 196.0, nutrition: "Complete grain protein" },
  { name: "Rolled Oats", category: "Grains", icon: "🥣", price: 179.2, nutrition: "Breakfast staple" },
  { name: "Barley", category: "Grains", icon: "🌾", price: 145.6, nutrition: "Chewy healthy grain" },
  { name: "Couscous", category: "Grains", icon: "🌾", price: 156.8, nutrition: "Quick cooking grain" },
  { name: "Whole Wheat Bread", category: "Bakery", icon: "🍞", price: 201.6, nutrition: "Whole grain option" },
  { name: "Baguette", category: "Bakery", icon: "🥖", price: 156.8, nutrition: "Soup and sandwich bread" },
  { name: "Bagels", category: "Bakery", icon: "🥯", price: 229.6, nutrition: "Breakfast bread" },
  { name: "Croissants", category: "Bakery", icon: "🥐", price: 268.0, nutrition: "Buttery pastry" },
  { name: "Tortillas", category: "Bakery", icon: "🫔", price: 134.4, nutrition: "Wrap and taco base" },
  { name: "Pasta", category: "Pantry", icon: "🍝", price: 123.2, nutrition: "Fast dinner base" },
  { name: "Tomato Sauce", category: "Pantry", icon: "🥫", price: 128.8, nutrition: "Pasta night essential" },
  { name: "Olive Oil", category: "Pantry", icon: "🫒", price: 470.4, nutrition: "Cooking oil" },
  { name: "Peanut Butter", category: "Pantry", icon: "🥜", price: 235.2, nutrition: "Protein spread" },
  { name: "Honey", category: "Pantry", icon: "🍯", price: 313.6, nutrition: "Natural sweetener" },
  { name: "Soy Sauce", category: "Pantry", icon: "🥢", price: 117.6, nutrition: "Savory seasoning" },
  { name: "Vinegar", category: "Pantry", icon: "🍶", price: 95.2, nutrition: "Cooking acid" },
  { name: "Salt", category: "Pantry", icon: "🧂", price: 56.0, nutrition: "Seasoning essential" },
  { name: "Sugar", category: "Pantry", icon: "🍬", price: 89.6, nutrition: "Sweetening agent" },
  { name: "Granola", category: "Breakfast", icon: "🥣", price: 263.2, nutrition: "Crunchy breakfast topper" },
  { name: "Cereal", category: "Breakfast", icon: "🥣", price: 240.8, nutrition: "Family breakfast" },
  { name: "Pancake Mix", category: "Breakfast", icon: "🥞", price: 156.8, nutrition: "Easy breakfast" },
  { name: "Maple Syrup", category: "Breakfast", icon: "🍯", price: 336.0, nutrition: "Pancake topping" },
  { name: "Coffee Beans", category: "Beverage", icon: "☕", price: 532.0, nutrition: "Morning drink" },
  { name: "Green Tea", category: "Beverage", icon: "🍵", price: 274.4, nutrition: "Light caffeine option" },
  { name: "Orange Juice", category: "Beverage", icon: "🧃", price: 229.6, nutrition: "Breakfast drink" },
  { name: "Sparkling Water", category: "Beverage", icon: "💧", price: 218.4, nutrition: "Sugar-free drink" },
  { name: "Apple Juice", category: "Beverage", icon: "🧃", price: 201.6, nutrition: "Fruit beverage" },
  { name: "Milk (2L)", category: "Beverage", icon: "🥛", price: 235.2, nutrition: "Cold beverage" },
  { name: "Black Tea", category: "Beverage", icon: "🍵", price: 268.0, nutrition: "Classic tea option" },
  { name: "Frozen Peas", category: "Frozen", icon: "🟢", price: 145.6, nutrition: "Quick vegetable side" },
  { name: "Frozen Berries", category: "Frozen", icon: "🫐", price: 330.4, nutrition: "Smoothie fruit" },
  { name: "Pizza Dough", category: "Frozen", icon: "🍕", price: 212.8, nutrition: "Easy pizza night" },
  { name: "Frozen Vegetables", category: "Frozen", icon: "🥕", price: 134.4, nutrition: "Quick cooking veggies" },
  { name: "Ice Cream", category: "Frozen", icon: "🍦", price: 289.6, nutrition: "Frozen dessert" },
  { name: "Mixed Nuts", category: "Snacks", icon: "🥜", price: 375.2, nutrition: "Energy snack" },
  { name: "Dark Chocolate", category: "Snacks", icon: "🍫", price: 190.4, nutrition: "Sweet treat" },
  { name: "Crackers", category: "Snacks", icon: "🫓", price: 162.4, nutrition: "Cheese board snack" },
  { name: "Potato Chips", category: "Snacks", icon: "🥔", price: 145.6, nutrition: "Crunchy snack" },
  { name: "Granola Bars", category: "Snacks", icon: "🫓", price: 196.0, nutrition: "Portable snack" },
  { name: "Pretzels", category: "Snacks", icon: "🥨", price: 128.8, nutrition: "Salty snack" },
  { name: "Popcorn", category: "Snacks", icon: "🍿", price: 117.6, nutrition: "Light snack" },
  { name: "Dish Soap", category: "Hygiene", icon: "🧼", price: 134.4, nutrition: "Kitchen cleaning" },
  { name: "Hand Soap", category: "Hygiene", icon: "🧼", price: 156.8, nutrition: "Personal hygiene" },
  { name: "Shampoo", category: "Hygiene", icon: "🧴", price: 235.2, nutrition: "Hair care" },
  { name: "Conditioner", category: "Hygiene", icon: "🧴", price: 246.4, nutrition: "Hair conditioning" },
  { name: "Body Wash", category: "Hygiene", icon: "🧴", price: 190.4, nutrition: "Body cleansing" },
  { name: "Toothpaste", category: "Hygiene", icon: "🪥", price: 128.8, nutrition: "Dental care" },
  { name: "Toothbrush", category: "Hygiene", icon: "🪥", price: 89.6, nutrition: "Dental hygiene" },
  { name: "Mouthwash", category: "Hygiene", icon: "💧", price: 168.0, nutrition: "Oral care" },
  { name: "Deodorant", category: "Hygiene", icon: "🧴", price: 145.6, nutrition: "Personal care" },
  { name: "Shaving Cream", category: "Hygiene", icon: "🧴", price: 117.6, nutrition: "Shaving prep" },
  { name: "Razors", category: "Hygiene", icon: "🪒", price: 235.2, nutrition: "Shaving tool" },
  { name: "Facial Cleanser", category: "Hygiene", icon: "🧴", price: 201.6, nutrition: "Face care" },
  { name: "Face Moisturizer", category: "Hygiene", icon: "🧴", price: 268.0, nutrition: "Skin hydration" },
  { name: "Sunscreen", category: "Hygiene", icon: "☀️", price: 290.0, nutrition: "UV protection" },
  { name: "Lip Balm", category: "Hygiene", icon: "💄", price: 78.4, nutrition: "Lip care" },
  { name: "Toilet Paper", category: "Household", icon: "🧻", price: 289.6, nutrition: "Bathroom essential" },
  { name: "Paper Towels", category: "Household", icon: "🧻", price: 347.2, nutrition: "Cleanup essential" },
  { name: "Laundry Detergent", category: "Household", icon: "🧴", price: 638.4, nutrition: "Laundry cleaning" },
  { name: "Fabric Softener", category: "Household", icon: "🧴", price: 289.6, nutrition: "Laundry softener" },
  { name: "All Purpose Cleaner", category: "Household", icon: "🧹", price: 201.6, nutrition: "General cleaning" },
  { name: "Bleach", category: "Household", icon: "🧴", price: 168.0, nutrition: "Disinfectant" },
  { name: "Glass Cleaner", category: "Household", icon: "🪟", price: 145.6, nutrition: "Window cleaning" },
  { name: "Trash Bags", category: "Household", icon: "🗑️", price: 268.0, nutrition: "Waste management" },
  { name: "Sponges", category: "Household", icon: "🧽", price: 95.2, nutrition: "Cleaning tool" },
  { name: "Aluminum Foil", category: "Household", icon: "🔲", price: 117.6, nutrition: "Food wrapping" },
  { name: "Plastic Wrap", category: "Household", icon: "🔲", price: 128.8, nutrition: "Food preservation" },
  { name: "Ziploc Bags", category: "Household", icon: "🔲", price: 201.6, nutrition: "Food storage" },
  { name: "Napkins", category: "Household", icon: "🧻", price: 117.6, nutrition: "Table essential" },
  { name: "Tissues", category: "Household", icon: "🧻", price: 134.4, nutrition: "Nose care" },
  { name: "Feminine Hygiene Pads", category: "Hygiene", icon: "🧴", price: 268.0, nutrition: "Personal hygiene" },
  { name: "Tampons", category: "Hygiene", icon: "🧴", price: 289.6, nutrition: "Personal hygiene" },
  { name: "Adult Diapers", category: "Hygiene", icon: "🧴", price: 623.2, nutrition: "Personal care" },
  { name: "Baby Wipes", category: "Hygiene", icon: "🧻", price: 235.2, nutrition: "Baby care" },
  { name: "Hand Sanitizer", category: "Hygiene", icon: "💧", price: 156.8, nutrition: "Germ protection" },
  { name: "Wet Wipes", category: "Hygiene", icon: "🧻", price: 134.4, nutrition: "Cleaning wipes" },
  { name: "Pork Belly", category: "Protein", icon: "🥩", price: 392.0, nutrition: "Rich cooking meat" },
  { name: "Chicken Thighs", category: "Protein", icon: "🍗", price: 336.0, nutrition: "Juicy family protein" },
  { name: "Hotdogs", category: "Protein", icon: "🌭", price: 184.8, nutrition: "Quick meal protein" },
  { name: "Ham Slices", category: "Protein", icon: "🥓", price: 218.4, nutrition: "Sandwich protein" },
  { name: "Sausages", category: "Protein", icon: "🌭", price: 257.6, nutrition: "Breakfast or dinner protein" },
  { name: "Corned Beef", category: "Pantry", icon: "🥫", price: 156.8, nutrition: "Canned breakfast staple" },
  { name: "Canned Sardines", category: "Seafood", icon: "🥫", price: 67.2, nutrition: "Affordable seafood protein" },
  { name: "Canned Mackerel", category: "Seafood", icon: "🥫", price: 89.6, nutrition: "Pantry fish protein" },
  { name: "Canned Corn", category: "Pantry", icon: "🥫", price: 78.4, nutrition: "Quick vegetable side" },
  { name: "Canned Mushrooms", category: "Pantry", icon: "🥫", price: 95.2, nutrition: "Easy pasta topping" },
  { name: "Canned Pineapple", category: "Pantry", icon: "🥫", price: 106.4, nutrition: "Sweet pantry fruit" },
  { name: "Evaporated Milk", category: "Pantry", icon: "🥫", price: 72.8, nutrition: "Cooking and dessert milk" },
  { name: "Condensed Milk", category: "Pantry", icon: "🥫", price: 89.6, nutrition: "Sweet dessert milk" },
  { name: "Coconut Milk", category: "Pantry", icon: "🥥", price: 84.0, nutrition: "Creamy cooking base" },
  { name: "Flour", category: "Pantry", icon: "🌾", price: 112.0, nutrition: "Baking and cooking staple" },
  { name: "Baking Powder", category: "Pantry", icon: "🧂", price: 56.0, nutrition: "Baking helper" },
  { name: "Cornstarch", category: "Pantry", icon: "🌽", price: 61.6, nutrition: "Thickener for sauces" },
  { name: "Cooking Oil", category: "Pantry", icon: "🛢️", price: 196.0, nutrition: "Everyday frying oil" },
  { name: "Canola Oil", category: "Pantry", icon: "🛢️", price: 229.6, nutrition: "Neutral cooking oil" },
  { name: "Oyster Sauce", category: "Pantry", icon: "🥢", price: 112.0, nutrition: "Savory stir-fry sauce" },
  { name: "Fish Sauce", category: "Pantry", icon: "🍶", price: 84.0, nutrition: "Salty cooking seasoning" },
  { name: "Ketchup", category: "Pantry", icon: "🍅", price: 106.4, nutrition: "Classic condiment" },
  { name: "Mayonnaise", category: "Pantry", icon: "🥫", price: 156.8, nutrition: "Sandwich and salad spread" },
  { name: "Instant Noodles", category: "Pantry", icon: "🍜", price: 72.8, nutrition: "Quick pantry meal" },
  { name: "Rice Noodles", category: "Grains", icon: "🍜", price: 123.2, nutrition: "Noodle dish staple" },
  { name: "Macaroni", category: "Grains", icon: "🍝", price: 95.2, nutrition: "Pasta salad base" },
  { name: "Pandesal", category: "Bakery", icon: "🍞", price: 67.2, nutrition: "Breakfast bread" },
  { name: "Burger Buns", category: "Bakery", icon: "🍔", price: 112.0, nutrition: "Sandwich bread" },
  { name: "Ensaymada", category: "Bakery", icon: "🥐", price: 140.0, nutrition: "Sweet bakery treat" },
  { name: "UHT Milk", category: "Beverage", icon: "🥛", price: 112.0, nutrition: "Shelf-stable milk" },
  { name: "Chocolate Drink", category: "Beverage", icon: "🥤", price: 145.6, nutrition: "Sweet milk drink" },
  { name: "Bottled Water", category: "Beverage", icon: "💧", price: 84.0, nutrition: "Drinking water pack" },
  { name: "Iced Tea", category: "Beverage", icon: "🧃", price: 123.2, nutrition: "Ready-to-drink tea" },
  { name: "Soft Drinks", category: "Beverage", icon: "🥤", price: 117.6, nutrition: "Party beverage" },
  { name: "Powdered Juice", category: "Beverage", icon: "🧃", price: 61.6, nutrition: "Budget drink mix" },
  { name: "Frozen Chicken Nuggets", category: "Frozen", icon: "🍗", price: 246.4, nutrition: "Quick freezer meal" },
  { name: "Frozen Fries", category: "Frozen", icon: "🍟", price: 179.2, nutrition: "Easy side dish" },
  { name: "Frozen Siomai", category: "Frozen", icon: "🥟", price: 212.8, nutrition: "Steam-and-serve snack" },
  { name: "Frozen Hotdog Buns", category: "Frozen", icon: "🌭", price: 134.4, nutrition: "Freezer bread pack" },
  { name: "Cookies", category: "Snacks", icon: "🍪", price: 123.2, nutrition: "Sweet snack" },
  { name: "Biscuits", category: "Snacks", icon: "🍪", price: 89.6, nutrition: "Everyday snack pack" },
  { name: "Cupcakes", category: "Snacks", icon: "🧁", price: 112.0, nutrition: "Lunchbox treat" },
  { name: "Candy", category: "Snacks", icon: "🍬", price: 67.2, nutrition: "Sweet treat" },
  { name: "Peanuts", category: "Snacks", icon: "🥜", price: 95.2, nutrition: "Salty protein snack" },
  { name: "Trail Mix", category: "Snacks", icon: "🥜", price: 212.8, nutrition: "Portable energy snack" },
  { name: "Baby Diapers", category: "Baby Care", icon: "🧷", price: 560.0, nutrition: "Baby essential" },
  { name: "Baby Powder", category: "Baby Care", icon: "🧴", price: 123.2, nutrition: "Baby skin care" },
  { name: "Baby Shampoo", category: "Baby Care", icon: "🧴", price: 168.0, nutrition: "Gentle hair wash" },
  { name: "Baby Lotion", category: "Baby Care", icon: "🧴", price: 184.8, nutrition: "Baby moisturizer" },
  { name: "Infant Formula", category: "Baby Care", icon: "🍼", price: 896.0, nutrition: "Baby nutrition" },
  { name: "Cotton Buds", category: "Hygiene", icon: "🧴", price: 61.6, nutrition: "Personal care cotton swabs" },
  { name: "Cotton Balls", category: "Hygiene", icon: "🧴", price: 56.0, nutrition: "Skin care cotton" },
  { name: "Alcohol", category: "Hygiene", icon: "🧴", price: 112.0, nutrition: "Disinfecting essential" },
  { name: "Bar Soap", category: "Hygiene", icon: "🧼", price: 50.4, nutrition: "Bath soap" },
  { name: "Lotion", category: "Hygiene", icon: "🧴", price: 190.4, nutrition: "Skin moisturizer" },
  { name: "Hair Gel", category: "Hygiene", icon: "🧴", price: 117.6, nutrition: "Hair styling" },
  { name: "Comb", category: "Hygiene", icon: "💇", price: 44.8, nutrition: "Hair grooming" },
  { name: "Nail Cutter", category: "Hygiene", icon: "✂️", price: 72.8, nutrition: "Nail care tool" },
  { name: "Dishwashing Liquid", category: "Household", icon: "🧼", price: 112.0, nutrition: "Dish cleaning soap" },
  { name: "Dishwashing Paste", category: "Household", icon: "🧼", price: 61.6, nutrition: "Dish cleaning paste" },
  { name: "Floor Cleaner", category: "Household", icon: "🧹", price: 168.0, nutrition: "Floor cleaning solution" },
  { name: "Toilet Cleaner", category: "Household", icon: "🚽", price: 145.6, nutrition: "Bathroom cleaning" },
  { name: "Insect Spray", category: "Household", icon: "🧴", price: 224.0, nutrition: "Household pest control" },
  { name: "Air Freshener", category: "Household", icon: "🌸", price: 134.4, nutrition: "Room fragrance" },
  { name: "Rubber Gloves", category: "Household", icon: "🧤", price: 95.2, nutrition: "Cleaning hand protection" },
  { name: "Mop Refill", category: "Household", icon: "🧹", price: 156.8, nutrition: "Floor cleaning refill" },
  { name: "Scrub Brush", category: "Household", icon: "🧽", price: 84.0, nutrition: "Deep cleaning brush" },
  { name: "Pet Food", category: "Pet Care", icon: "🐾", price: 336.0, nutrition: "Pet meal staple" },
  { name: "Cat Litter", category: "Pet Care", icon: "🐾", price: 280.0, nutrition: "Pet cleanup essential" },
  { name: "Pet Shampoo", category: "Pet Care", icon: "🧴", price: 196.0, nutrition: "Pet bathing care" }
];

const priceComparison = defaultProducts.slice(0, 14).map((product, index) => ({
  product: product.name,
  FreshMart: Number((product.price * (1 + ((index % 4) * 0.035))).toFixed(2)),
  BudgetBasket: Number((product.price * (0.92 + ((index % 3) * 0.025))).toFixed(2)),
  GreenCart: Number((product.price * (0.96 + ((index % 5) * 0.02))).toFixed(2))
}));

function buildPriceComparison(seed = 0) {
  return state.products.slice(seed % 20, (seed % 20) + 18).map((product, index) => ({
    product: product.name,
    FreshMart: Number((product.price * (1 + (((index + seed) % 4) * 0.035))).toFixed(2)),
    BudgetBasket: Number((product.price * (0.9 + (((index + seed) % 3) * 0.025))).toFixed(2)),
    GreenCart: Number((product.price * (0.95 + (((index + seed) % 5) * 0.02))).toFixed(2))
  }));
}

const moreProducts = [
  { name: "Papaya", category: "Fruit", icon: "🍈", price: 112.0, nutrition: "Tropical fiber-rich fruit" },
  { name: "Calamansi", category: "Fruit", icon: "🍋", price: 56.0, nutrition: "Citrus seasoning and juice" },
  { name: "Banana Lakatan", category: "Fruit", icon: "🍌", price: 95.2, nutrition: "Sweet local banana" },
  { name: "Sayote", category: "Produce", icon: "🥬", price: 61.6, nutrition: "Budget vegetable for soups" },
  { name: "Eggplant", category: "Produce", icon: "🍆", price: 78.4, nutrition: "Grill and stew vegetable" },
  { name: "Okra", category: "Produce", icon: "🥒", price: 67.2, nutrition: "Fiber-rich vegetable" },
  { name: "Bok Choy", category: "Produce", icon: "🥬", price: 89.6, nutrition: "Leafy stir-fry green" },
  { name: "Malunggay Leaves", category: "Produce", icon: "🥬", price: 50.4, nutrition: "Nutrient-dense soup green" },
  { name: "Ginger", category: "Produce", icon: "🫚", price: 72.8, nutrition: "Aromatic cooking root" },
  { name: "Spring Onions", category: "Produce", icon: "🧅", price: 44.8, nutrition: "Fresh garnish and flavor" },
  { name: "Pork Tenderloin", category: "Protein", icon: "🥩", price: 448.0, nutrition: "Lean pork protein" },
  { name: "Beef Cubes", category: "Protein", icon: "🥩", price: 504.0, nutrition: "Stew and soup protein" },
  { name: "Chicken Wings", category: "Protein", icon: "🍗", price: 313.6, nutrition: "Family meal protein" },
  { name: "Longganisa", category: "Protein", icon: "🌭", price: 212.8, nutrition: "Breakfast sausage" },
  { name: "Bangus", category: "Seafood", icon: "🐟", price: 280.0, nutrition: "Local fish protein" },
  { name: "Tilapia", category: "Seafood", icon: "🐟", price: 196.0, nutrition: "Affordable fish protein" },
  { name: "Squid", category: "Seafood", icon: "🦑", price: 336.0, nutrition: "Seafood for grilling" },
  { name: "Crab Sticks", category: "Seafood", icon: "🦀", price: 156.8, nutrition: "Quick seafood add-on" },
  { name: "Jasmine Rice", category: "Grains", icon: "🍚", price: 246.4, nutrition: "Fragrant rice staple" },
  { name: "Glutinous Rice", category: "Grains", icon: "🍚", price: 224.0, nutrition: "Dessert rice staple" },
  { name: "Wheat Loaf", category: "Bakery", icon: "🍞", price: 89.6, nutrition: "Sandwich bread" },
  { name: "Cheese Bread", category: "Bakery", icon: "🧀", price: 100.8, nutrition: "Savory bakery snack" },
  { name: "Canned Tuna", category: "Pantry", icon: "🥫", price: 112.0, nutrition: "Ready protein pantry item" },
  { name: "Canned Tomatoes", category: "Pantry", icon: "🥫", price: 95.2, nutrition: "Sauce and stew base" },
  { name: "Tomato Paste", category: "Pantry", icon: "🥫", price: 61.6, nutrition: "Concentrated tomato flavor" },
  { name: "Patis", category: "Pantry", icon: "🍶", price: 78.4, nutrition: "Fish sauce seasoning" },
  { name: "Bagoong", category: "Pantry", icon: "🥫", price: 84.0, nutrition: "Savory local condiment" },
  { name: "Cream of Mushroom", category: "Pantry", icon: "🥫", price: 89.6, nutrition: "Soup and sauce base" },
  { name: "Powdered Milk", category: "Breakfast", icon: "🥛", price: 336.0, nutrition: "Breakfast milk powder" },
  { name: "Instant Coffee", category: "Beverage", icon: "☕", price: 168.0, nutrition: "Quick coffee drink" },
  { name: "Cocoa Powder", category: "Beverage", icon: "🍫", price: 145.6, nutrition: "Chocolate drink mix" },
  { name: "Electrolyte Drink", category: "Beverage", icon: "🥤", price: 117.6, nutrition: "Hydration drink" },
  { name: "Frozen Tocino", category: "Frozen", icon: "🥩", price: 257.6, nutrition: "Sweet cured pork" },
  { name: "Frozen Lumpia", category: "Frozen", icon: "🥟", price: 224.0, nutrition: "Quick party snack" },
  { name: "Frozen Meatballs", category: "Frozen", icon: "🍖", price: 246.4, nutrition: "Easy pasta protein" },
  { name: "Wafer Sticks", category: "Snacks", icon: "🍪", price: 78.4, nutrition: "Sweet snack" },
  { name: "Rice Crackers", category: "Snacks", icon: "🍘", price: 95.2, nutrition: "Crunchy snack" },
  { name: "Banana Chips", category: "Snacks", icon: "🍌", price: 112.0, nutrition: "Sweet crunchy snack" },
  { name: "Dental Floss", category: "Hygiene", icon: "🦷", price: 95.2, nutrition: "Oral hygiene" },
  { name: "Toothbrush Pack", category: "Hygiene", icon: "🪥", price: 156.8, nutrition: "Family dental care" },
  { name: "Body Lotion", category: "Hygiene", icon: "🧴", price: 224.0, nutrition: "Skin moisturizer" },
  { name: "Face Wash", category: "Hygiene", icon: "🧴", price: 184.8, nutrition: "Daily facial cleanser" },
  { name: "Talcum Powder", category: "Hygiene", icon: "🧴", price: 89.6, nutrition: "Personal care powder" },
  { name: "Sanitary Napkins", category: "Hygiene", icon: "🧴", price: 196.0, nutrition: "Personal hygiene" },
  { name: "Pantyliners", category: "Hygiene", icon: "🧴", price: 112.0, nutrition: "Daily hygiene" },
  { name: "Disinfecting Wipes", category: "Household", icon: "🧻", price: 145.6, nutrition: "Surface cleaning wipes" },
  { name: "Laundry Bar Soap", category: "Household", icon: "🧼", price: 50.4, nutrition: "Handwash laundry soap" },
  { name: "Drain Cleaner", category: "Household", icon: "🧴", price: 156.8, nutrition: "Sink maintenance" },
  { name: "Food Containers", category: "Household", icon: "🥡", price: 224.0, nutrition: "Food storage set" },
  { name: "Baby Bath Soap", category: "Baby Care", icon: "🧼", price: 134.4, nutrition: "Gentle baby wash" },
  { name: "Baby Bottle Cleanser", category: "Baby Care", icon: "🍼", price: 190.4, nutrition: "Bottle cleaning" }
];

defaultProducts.push(...moreProducts);

function sanitizeProduct(product) {
  if (!product || typeof product.name !== "string" || !product.name.trim()) {
    return null;
  }

  return {
    name: product.name.trim(),
    category: typeof product.category === "string" && product.category.trim() ? product.category.trim() : "General",
    icon: typeof product.icon === "string" && product.icon.trim() ? product.icon.trim() : "🛒",
    price: Number.isFinite(Number(product.price)) ? Number(product.price) : 0,
    nutrition: typeof product.nutrition === "string" && product.nutrition.trim() ? product.nutrition.trim() : "Everyday essential"
  };
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function mergeDefaultProducts(products) {
  const byName = new Map();
  defaultProducts.forEach((product) => {
    const cleanProduct = sanitizeProduct(product);
    if (cleanProduct) {
      byName.set(cleanProduct.name.toLowerCase(), cleanProduct);
    }
  });
  if (Array.isArray(products)) {
    products.forEach((product) => {
      const cleanProduct = sanitizeProduct(product);
      if (cleanProduct) {
        byName.set(cleanProduct.name.toLowerCase(), cleanProduct);
      }
    });
  }
  return Array.from(byName.values());
}

function ensureProducts(products) {
  if (!Array.isArray(products) || products.length === 0) {
    return mergeDefaultProducts([]);
  }
  return mergeDefaultProducts(products);
}

const defaultState = {
  user: null,
  accounts: [],
  products: defaultProducts,
  settings: {
    diet: "Balanced",
    household: 3,
    store: "BudgetBasket",
    allergies: ""
  },
  currency: "PHP",
  budgetLimit: 6500,
  recommendationSeed: 0,
  priceSeed: 0,
  notificationsReviewedAt: null,
  grocery: [
    { id: createId(), name: "Brown Rice", qty: "2", price: 470.4, category: "Grains", done: false },
    { id: createId(), name: "Spinach", qty: "3", price: 571.2, category: "Produce", done: false },
    { id: createId(), name: "Greek Yogurt", qty: "4", price: 1142.4, category: "Dairy", done: true }
  ],
  meals: [
    { id: createId(), day: "Monday", name: "Chicken rice bowls", ingredients: "Chicken, brown rice, spinach" },
    { id: createId(), day: "Wednesday", name: "Salmon and broccoli", ingredients: "Salmon, broccoli, yogurt sauce" },
    { id: createId(), day: "Friday", name: "Vegetable egg toast", ingredients: "Eggs, bread, spinach" }
  ],
  pantry: [
    { id: createId(), name: "Olive Oil", qty: 1, expiry: "2026-08-30" },
    { id: createId(), name: "Oats", qty: 2, expiry: "2026-07-16" },
    { id: createId(), name: "Canned Tomatoes", qty: 5, expiry: "2026-11-05" }
  ],
  activity: ["System initialized", "Weekly meal plan created", "Budget limit set"]
};

let state = loadState();
let selectedProductCategory = "All";

function $(id) {
  return document.getElementById(id);
}

function on(id, eventName, handler) {
  const element = $(id);
  if (element) {
    element.addEventListener(eventName, handler);
  }
  return element;
}

function loadState() {
  const saved = localStorage.getItem(storageKey);
  if (!saved) return cloneState(defaultState);

  try {
    const parsed = JSON.parse(saved);
    const merged = normalizeState({ ...cloneState(defaultState), ...parsed });
    if (!Array.isArray(parsed.products) || merged.products.length !== parsed.products.length) {
      localStorage.setItem(storageKey, JSON.stringify(merged));
    }
    return merged;
  } catch {
    return cloneState(defaultState);
  }
}

function normalizeState(nextState) {
  nextState.accounts = Array.isArray(nextState.accounts) ? nextState.accounts : [];
  nextState.products = ensureProducts(nextState.products);
  nextState.grocery = Array.isArray(nextState.grocery) && nextState.grocery.length > 0 ? nextState.grocery : defaultState.grocery;
  nextState.meals = Array.isArray(nextState.meals) && nextState.meals.length > 0 ? nextState.meals : defaultState.meals;
  nextState.pantry = Array.isArray(nextState.pantry) && nextState.pantry.length > 0 ? nextState.pantry : defaultState.pantry;
  nextState.activity = Array.isArray(nextState.activity) ? nextState.activity : [...defaultState.activity];
  nextState.settings = nextState.settings && typeof nextState.settings === "object"
    ? { ...defaultState.settings, ...nextState.settings }
    : { ...defaultState.settings };
  nextState.budgetLimit = Number.isFinite(Number(nextState.budgetLimit)) ? Number(nextState.budgetLimit) : defaultState.budgetLimit;
  nextState.recommendationSeed = Number.isFinite(Number(nextState.recommendationSeed)) ? Number(nextState.recommendationSeed) : 0;
  nextState.priceSeed = Number.isFinite(Number(nextState.priceSeed)) ? Number(nextState.priceSeed) : 0;
  nextState.notificationsReviewedAt = nextState.notificationsReviewedAt || null;
  nextState.currency = nextState.currency || defaultState.currency;

  if (nextState.user && !nextState.user.role) {
    nextState.user.role = "User";
  }
  if (nextState.user && !nextState.accounts.some((account) => account.email === nextState.user.email)) {
    nextState.accounts.push({
      name: nextState.user.name,
      email: nextState.user.email,
      role: nextState.user.role || "User",
      joinedAt: nextState.user.joinedAt || new Date().toISOString(),
      lastLoginAt: nextState.user.lastLoginAt || new Date().toISOString()
    });
  }

  if (nextState.currency === "PHP") return nextState;

  nextState.currency = "PHP";
  nextState.budgetLimit = Number((Number(nextState.budgetLimit || defaultState.budgetLimit) * 56).toFixed(2));
  nextState.grocery = nextState.grocery.map((item) => ({
    ...item,
    price: Number((Number(item.price || 0) * 56).toFixed(2))
  }));
  return nextState;
}

function saveState(activity) {
  if (activity) {
    state.activity = Array.isArray(state.activity) ? state.activity : [];
    state.activity = [activity, ...state.activity].slice(0, 8);
  }
  localStorage.setItem(storageKey, JSON.stringify(state));
  render();
}

function getInitials(name) {
  if (!name) return "GA";
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "GA";
}

function formatMoney(value) {
  return new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(value);
}

function getGroceryTotal() {
  return state.grocery.reduce((sum, item) => sum + Number(item.price || 0), 0);
}

function getQtyNumber(qty) {
  const parsed = Number.parseFloat(qty);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
}

function getCartItemCount() {
  return state.grocery.reduce((sum, item) => sum + getQtyNumber(item.qty), 0);
}

function getProductQtyInCart(productName) {
  const item = state.grocery.find((entry) => entry.name.toLowerCase() === productName.toLowerCase() && !entry.done);
  return item ? getQtyNumber(item.qty) : 0;
}

function addProductToCart(product) {
  const existing = state.grocery.find((entry) => entry.name.toLowerCase() === product.name.toLowerCase() && !entry.done);

  if (existing) {
    const qty = getQtyNumber(existing.qty) + 1;
    existing.qty = String(qty);
    existing.price = Number((product.price * qty).toFixed(2));
    existing.category = product.category;
    saveState(`Updated ${product.name} cart quantity to ${qty}`);
    return;
  }

  state.grocery.push({
    id: createId(),
    name: product.name,
    qty: "1",
    price: product.price,
    category: product.category,
    done: false
  });
  saveState(`Added ${product.name} to cart`);
}

function getBestPrice(row) {
  const stores = ["FreshMart", "BudgetBasket", "GreenCart"];
  return stores.reduce((best, store) => (row[store] < row[best] ? store : best), stores[0]);
}

function getNotifications() {
  const expiring = state.pantry.filter((item) => {
    const days = (new Date(item.expiry) - new Date()) / 86400000;
    return days <= 14;
  });
  const total = getGroceryTotal();
  const notices = [
    {
      type: total > state.budgetLimit ? "danger" : "info",
      title: total > state.budgetLimit ? "Budget limit exceeded" : "Budget on track",
      body: total > state.budgetLimit
        ? "Review premium items or compare prices before checkout."
        : "Your current list is within the weekly grocery target."
    },
    {
      type: "warning",
      title: `${expiring.length} pantry item${expiring.length === 1 ? "" : "s"} expiring soon`,
      body: expiring.length ? expiring.map((item) => item.name).join(", ") : "No urgent pantry expiry alerts."
    },
    {
      type: "info",
      title: "Recommendation engine updated",
      body: `Diet preference: ${state.settings.diet}. Favorite store: ${state.settings.store}.`
    },
    {
      type: state.notificationsReviewedAt ? "info" : "warning",
      title: state.notificationsReviewedAt ? "Notifications reviewed" : "Action review pending",
      body: state.notificationsReviewedAt
        ? `Last reviewed ${new Date(state.notificationsReviewedAt).toLocaleString()}.`
        : "Use Mark Reviewed after checking budget, pantry, and recommendations."
    }
  ];
  return notices;
}

function getRecommendations() {
  const pantryNames = new Set(state.pantry.map((item) => item.name.toLowerCase()));
  const groceryNames = new Set(state.grocery.map((item) => item.name.toLowerCase()));
  const allergyTerms = String(state.settings.allergies || "")
    .toLowerCase()
    .split(",")
    .map((term) => term.trim())
    .filter(Boolean);
  const budgetTarget = Math.max(80, state.budgetLimit / Math.max(1, Number(state.settings.household || 1)) / 8);
  const offset = Number(state.recommendationSeed || 0);

  return state.products
    .filter((product) => !pantryNames.has(product.name.toLowerCase()) && !groceryNames.has(product.name.toLowerCase()))
    .filter((product) => !allergyTerms.some((term) => `${product.name} ${product.category} ${product.nutrition}`.toLowerCase().includes(term)))
    .map((product, index) => {
      let score = 100 - Math.abs(Number(product.price || 0) - budgetTarget) / 20;
      if (state.settings.diet === "High protein" && ["Protein", "Seafood", "Dairy"].includes(product.category)) score += 60;
      if (state.settings.diet === "Vegetarian" && !["Protein", "Seafood"].includes(product.category)) score += 45;
      if (state.settings.diet === "Low sugar" && !["Snacks", "Beverage", "Breakfast"].includes(product.category)) score += 35;
      if (["Produce", "Fruit", "Grains", "Pantry", "Hygiene", "Household"].includes(product.category)) score += 12;
      score += ((index + offset) % 9) * 2;
      return { ...product, score };
    })
    .sort((a, b) => b.score - a.score || a.name.localeCompare(b.name))
    .slice(0, 12);
}

function switchView(viewId) {
  if (viewId === "profile" && !state.user) {
    window.location.href = "login.html";
    return;
  }

  document.querySelectorAll(".view").forEach((view) => view.classList.toggle("active", view.id === viewId));
  document.querySelectorAll(".nav-link").forEach((button) => button.classList.toggle("active", button.dataset.view === viewId));
  closeSidebar();
}

function toggleSidebar() {
  const sidebar = document.getElementById("mainSidebar");
  if (sidebar) {
    const isOpen = sidebar.classList.toggle("open");
    document.body.classList.toggle("sidebar-is-open", isOpen);
  }
}

function closeSidebar() {
  const sidebar = document.getElementById("mainSidebar");
  if (sidebar) {
    sidebar.classList.remove("open");
    document.body.classList.remove("sidebar-is-open");
  }
}

function openSidebar() {
  const sidebar = document.getElementById("mainSidebar");
  if (sidebar) {
    sidebar.classList.add("open");
    document.body.classList.add("sidebar-is-open");
  }
}

function openFeatureGuide() {
  const modal = document.getElementById("featureGuideModal");
  if (!modal) return;
  modal.classList.remove("hidden");
  modal.setAttribute("aria-hidden", "false");
}

function closeFeatureGuide() {
  const modal = document.getElementById("featureGuideModal");
  if (!modal) return;
  modal.classList.add("hidden");
  modal.setAttribute("aria-hidden", "true");
}

function renderDashboard() {
  const total = getGroceryTotal();
  const budgetPercent = Math.min(100, Math.round((total / state.budgetLimit) * 100));
  const bestSavings = priceComparison.reduce((sum, row) => {
    const prices = [row.FreshMart, row.BudgetBasket, row.GreenCart];
    return sum + (Math.max(...prices) - Math.min(...prices));
  }, 0);

  document.getElementById("itemCount").textContent = state.grocery.length;
  document.getElementById("pantryCount").textContent = state.pantry.length;
  document.getElementById("budgetUsed").textContent = `${budgetPercent}%`;
  document.getElementById("savings").textContent = formatMoney(bestSavings);
  document.getElementById("adminProductsHero").textContent = state.products.length;

  document.getElementById("recommendationList").innerHTML = getRecommendations().slice(0, 3).map((item) => `
    <div class="recommendation-mini">
      <strong>${escapeHtml(item.icon)} ${escapeHtml(item.name)}</strong>
      <span>${escapeHtml(item.nutrition)} • ${formatMoney(item.price)}</span>
    </div>
  `).join("");

  document.getElementById("mealPreview").innerHTML = state.meals.slice(0, 4).map((meal) => `
    <div class="compact-item">
      <strong>${meal.day}: ${meal.name}</strong>
      <span>${meal.ingredients}</span>
    </div>
  `).join("");
}

function renderGrocery() {
  document.getElementById("groceryTable").innerHTML = state.grocery.length ? state.grocery.map((item) => `
    <tr>
      <td>${escapeHtml(item.name)}</td>
      <td>
        <div class="qty-control">
          <button type="button" class="ghost-button" data-decrement-item="${item.id}">-</button>
          <span>${escapeHtml(item.qty)}</span>
          <button type="button" class="ghost-button" data-increment-item="${item.id}">+</button>
        </div>
      </td>
      <td>${formatMoney(Number(item.price))}</td>
      <td><button type="button" class="pill ${item.done ? "" : "warning"}" data-toggle-item="${item.id}">${item.done ? "Bought" : "Needed"}</button></td>
      <td><button type="button" class="danger-button" data-delete-item="${item.id}">Remove</button></td>
    </tr>
  `).join("") : `<tr><td colspan="5">Your cart is empty. Add products from Product Menu or Recommendations.</td></tr>`;
}

function renderMeals() {
  document.getElementById("mealGrid").innerHTML = state.meals.length ? state.meals.map((meal) => `
    <article class="meal-card">
      <span class="day">${escapeHtml(meal.day)}</span>
      <strong>${escapeHtml(meal.name)}</strong>
      <span>${escapeHtml(meal.ingredients)}</span>
      <button type="button" class="danger-button" data-delete-meal="${meal.id}">Remove</button>
    </article>
  `).join("") : `<div class="empty-state">No meals scheduled yet.</div>`;
}

function renderPantry() {
  document.getElementById("pantryGrid").innerHTML = state.pantry.length ? state.pantry.map((item) => {
    const days = Math.ceil((new Date(item.expiry) - new Date()) / 86400000);
    const status = days <= 7 ? "danger" : days <= 14 ? "warning" : "";
    return `
      <article class="pantry-card">
        <strong>${escapeHtml(item.name)}</strong>
        <span>Stock: ${escapeHtml(item.qty)}</span>
        <p class="pill ${status}">Expires in ${days} days</p>
        <button type="button" class="danger-button" data-delete-pantry="${item.id}">Remove</button>
      </article>
    `;
  }).join("") : `<div class="empty-state">No pantry items tracked yet.</div>`;
}

function renderBudget() {
  const total = getGroceryTotal();
  const percent = Math.min(100, Math.round((total / state.budgetLimit) * 100));
  const categories = state.grocery.reduce((acc, item) => {
    const category = item.category || "General";
    acc[category] = (acc[category] || 0) + Number(item.price || 0);
    return acc;
  }, {});

  document.getElementById("budgetLimit").value = state.budgetLimit;
  document.getElementById("budgetBar").style.width = `${percent}%`;
  document.getElementById("categorySpend").innerHTML = Object.entries(categories).map(([category, amount]) => `
    <div class="bar-item">
      <strong>${category} ${formatMoney(amount)}</strong>
      <div class="bar-track"><div class="bar-fill" style="width: ${Math.min(100, (amount / state.budgetLimit) * 100)}%"></div></div>
    </div>
  `).join("");
  document.getElementById("budgetAdvice").textContent = total > state.budgetLimit
    ? "You are over budget. Try swapping high-cost items with best-price alternatives from BudgetBasket or GreenCart."
    : `You have ${formatMoney(state.budgetLimit - total)} left this week. Add pantry staples while staying within your plan.`;
}

function getProductCategories() {
  const priority = [
    "All",
    "Produce",
    "Fruit",
    "Dairy",
    "Protein",
    "Seafood",
    "Grains",
    "Bakery",
    "Pantry",
    "Breakfast",
    "Beverage",
    "Frozen",
    "Snacks",
    "Hygiene",
    "Household",
    "Baby Care",
    "Pet Care"
  ];
  const categories = new Set(state.products.map((product) => product.category || "General"));
  return priority.concat([...categories].filter((category) => !priority.includes(category)));
}

function renderProductCategories() {
  const filter = $("productCategoryFilter");
  if (!filter) return;

  filter.innerHTML = getProductCategories().map((category) => `
    <button type="button" class="${selectedProductCategory === category ? "active" : ""}" data-product-category="${escapeHtml(category)}">
      ${escapeHtml(category)}
    </button>
  `).join("");
}

function renderProducts() {
  state.products = ensureProducts(state.products);
  if (!getProductCategories().includes(selectedProductCategory)) {
    selectedProductCategory = "All";
  }

  renderProductCategories();

  const search = ($("productSearch")?.value || "").trim().toLowerCase();
  const filtered = state.products.filter((item) => {
    const matchesCategory = selectedProductCategory === "All" || item.category === selectedProductCategory;
    const matchesSearch = `${item.name} ${item.category} ${item.nutrition}`.toLowerCase().includes(search);
    return matchesCategory && matchesSearch;
  });
  const cartItemCount = getCartItemCount();
  $("cartCount").textContent = `${cartItemCount} item${cartItemCount === 1 ? "" : "s"}`;
  $("cartTotal").textContent = formatMoney(getGroceryTotal());
  const status = $("productStatus");
  if (status) {
    const categoryLabel = selectedProductCategory === "All" ? "all categories" : selectedProductCategory;
    status.textContent = `Showing ${filtered.length} of ${state.products.length} products in ${categoryLabel}`;
  }
  const grid = $("productGrid");
  if (filtered.length === 0) {
    grid.innerHTML = `<div class="empty-state">No products found. Clear search, choose All, or reset the catalog.</div>`;
    return;
  }
  grid.innerHTML = filtered.map((item) => `
    <article class="product-card">
      <div class="product-icon">${escapeHtml(item.icon)}</div>
      <div>
        <strong>${escapeHtml(item.name)}</strong>
        <span>${escapeHtml(item.category)} • ${escapeHtml(item.nutrition)}</span>
      </div>
      <div class="product-meta">
        <span>${formatMoney(item.price)}</span>
        <button type="button" class="ghost-button" data-add-product="${escapeHtml(item.name)}">${getProductQtyInCart(item.name) ? `In Cart (${getProductQtyInCart(item.name)})` : "Add to Cart"}</button>
      </div>
    </article>
  `).join("");
}

function renderPrices() {
  const rows = buildPriceComparison(state.priceSeed);
  document.getElementById("priceTable").innerHTML = rows.map((row) => {
    const best = getBestPrice(row);
    return `
      <tr>
        <td>${escapeHtml(row.product)}</td>
        <td>${formatMoney(row.FreshMart)}</td>
        <td>${formatMoney(row.BudgetBasket)}</td>
        <td>${formatMoney(row.GreenCart)}</td>
        <td>
          <span class="pill">${best}</span>
          <button type="button" class="ghost-button" data-add-price-product="${escapeHtml(row.product)}">Add</button>
        </td>
      </tr>
    `;
  }).join("");
}

function renderRecommendations() {
  const recommendations = getRecommendations();
  document.getElementById("fullRecommendations").innerHTML = recommendations.length ? recommendations.map((item) => `
    <article class="recommend-card">
      <strong>${escapeHtml(item.icon)} ${escapeHtml(item.name)}</strong>
      <span>${escapeHtml(item.nutrition)}</span>
      <p class="pill">${escapeHtml(item.category)} • ${formatMoney(item.price)}</p>
      <button type="button" class="ghost-button" data-add-product="${escapeHtml(item.name)}">
        ${getProductQtyInCart(item.name) ? `In Cart (${getProductQtyInCart(item.name)})` : "Add to Cart"}
      </button>
    </article>
  `).join("") : `<div class="empty-state">No recommendations match your settings. Clear allergy notes or reset the catalog.</div>`;
}

function renderNotifications() {
  const notices = getNotifications();
  document.getElementById("notificationList").innerHTML = notices.map((notice) => `
    <article class="notification ${notice.type}">
      <strong>${notice.title}</strong>
      <p>${notice.body}</p>
    </article>
  `).join("");
}

function renderSettings() {
  document.getElementById("dietSetting").value = state.settings.diet;
  document.getElementById("householdSetting").value = state.settings.household;
  document.getElementById("storeSetting").value = state.settings.store;
  document.getElementById("allergySetting").value = state.settings.allergies;
  const status = $("settingsStatus");
  if (status) {
    status.textContent = `${state.settings.diet} plan for ${state.settings.household} household member${Number(state.settings.household) === 1 ? "" : "s"} at ${state.settings.store}. Allergy notes: ${state.settings.allergies || "none"}.`;
  }
}

function renderProfile() {
  const accountButton = document.getElementById("accountButton");
  const adminLink = document.getElementById("adminDashboardLink");
  const adminOnlyProductForm = document.getElementById("addProductForm");
  const profileName = state.user?.name || "Guest user";
  const profileEmail = state.user?.email || "No email saved";
  const joinedDate = state.user?.joinedAt
    ? new Date(state.user.joinedAt).toLocaleDateString()
    : "Profile not created yet";

  if (accountButton) {
    accountButton.textContent = state.user ? profileName.split(" ")[0] : "Login";
  }
  if (adminLink) {
    adminLink.classList.toggle("hidden", state.user?.role !== "Admin");
  }
  if (adminOnlyProductForm) {
    adminOnlyProductForm.classList.toggle("hidden", state.user?.role !== "Admin");
  }
  document.getElementById("profileInitials").textContent = getInitials(profileName);
  document.getElementById("profileName").textContent = profileName;
  document.getElementById("profileEmail").textContent = profileEmail;
  document.getElementById("profileJoined").textContent = state.user ? `Joined ${joinedDate}` : joinedDate;
  document.getElementById("profileDiet").textContent = state.settings.diet;
  document.getElementById("profileHousehold").textContent = state.settings.household;
  document.getElementById("profileStore").textContent = state.settings.store;
  document.getElementById("profileBudget").textContent = formatMoney(state.budgetLimit);
  document.getElementById("profileRole").textContent = state.user?.role || "User";
  document.getElementById("profileCartItems").textContent = getCartItemCount();
  document.getElementById("profilePantryItems").textContent = state.pantry.length;
  document.getElementById("profileAllergies").textContent = state.settings.allergies || "None";

}

function renderSection(name, callback) {
  try {
    callback();
  } catch (error) {
    console.error(`Unable to render ${name}`, error);
  }
}

function render() {
  renderSection("dashboard", renderDashboard);
  renderSection("grocery list", renderGrocery);
  renderSection("meal planner", renderMeals);
  renderSection("pantry", renderPantry);
  renderSection("budget", renderBudget);
  renderSection("products", renderProducts);
  renderSection("prices", renderPrices);
  renderSection("recommendations", renderRecommendations);
  renderSection("notifications", renderNotifications);
  renderSection("settings", renderSettings);
  renderSection("profile", renderProfile);
}

render();

document.addEventListener("click", (event) => {
  const profileButton = event.target.closest("[data-profile-open]");
  if (profileButton) {
    if (state.user) {
      switchView("profile");
    } else {
      window.location.href = "login.html";
    }
    return;
  }

  const button = event.target.closest("[data-view], [data-view-trigger]");
  if (!button) return;

  const view = button.dataset.view || button.dataset.viewTrigger;
  if (view === "auth") {
    window.location.href = "login.html";
    return;
  }

  switchView(view);
});

window.addEventListener("load", () => {
  const allButtons = document.querySelectorAll("[data-view], [data-view-trigger], [data-profile-open]");
  allButtons.forEach((btn) => {
    btn.style.cursor = "pointer";
  });
});

const sidebarToggle = document.getElementById("sidebarToggle");
if (sidebarToggle) {
  sidebarToggle.addEventListener("click", closeSidebar);
}

const sidebarOpenButton = document.getElementById("sidebarOpenButton");
if (sidebarOpenButton) {
  sidebarOpenButton.addEventListener("click", openSidebar);
}

const navLinks = document.querySelectorAll(".nav-link[data-view]");
navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const view = link.dataset.view;
    switchView(view);
    closeSidebar();
  });
});

const mainContent = document.querySelector(".main-content");
if (mainContent) {
  mainContent.addEventListener("click", (event) => {
    const sidebar = document.getElementById("mainSidebar");
    if (sidebar && sidebar.classList.contains("open") && window.innerWidth <= 1180) {
      closeSidebar();
    }
  });
}

const notifyButton = document.getElementById("notifyButton");
if (notifyButton) {
  notifyButton.addEventListener("click", () => switchView("notifications"));
}

const featureGuideButton = document.getElementById("featureGuideButton");
if (featureGuideButton) {
  featureGuideButton.addEventListener("click", openFeatureGuide);
}

const heroFeatureButton = document.getElementById("heroFeatureButton");
if (heroFeatureButton) {
  heroFeatureButton.addEventListener("click", openFeatureGuide);
}

const closeFeatureGuideButton = document.getElementById("closeFeatureGuide");
if (closeFeatureGuideButton) {
  closeFeatureGuideButton.addEventListener("click", closeFeatureGuide);
}

const featureGuideModal = document.getElementById("featureGuideModal");
if (featureGuideModal) {
  featureGuideModal.addEventListener("click", (event) => {
    if (event.target === event.currentTarget) {
      closeFeatureGuide();
    }
  });
}

on("editProfileButton", "click", () => {
  switchView("settings");
});

on("logoutButton", "click", () => {
  const name = state.user?.name || "User";
  state.user = null;
  saveState(`${name} logged out`);
  window.location.href = "login.html";
});

on("groceryForm", "submit", (event) => {
  event.preventDefault();
  const name = $("groceryName").value.trim();
  const product = state.products.find((item) => item.name.toLowerCase() === name.toLowerCase());
  state.grocery.push({
    id: createId(),
    name,
    qty: $("groceryQty").value,
    price: Number($("groceryPrice").value),
    category: product?.category || "General",
    done: false
  });
  event.target.reset();
  saveState(`Added ${name} to grocery list`);
});

on("groceryTable", "click", (event) => {
  const toggleId = event.target.dataset.toggleItem;
  const deleteId = event.target.dataset.deleteItem;
  const incrementId = event.target.dataset.incrementItem;
  const decrementId = event.target.dataset.decrementItem;
  if (toggleId) {
    const item = state.grocery.find((entry) => entry.id === toggleId);
    if (!item) return;
    item.done = !item.done;
    saveState(`${item.name} marked ${item.done ? "bought" : "needed"}`);
  }
  if (incrementId || decrementId) {
    const id = incrementId || decrementId;
    const item = state.grocery.find((entry) => entry.id === id);
    const product = item && state.products.find((entry) => entry.name.toLowerCase() === item.name.toLowerCase());
    if (!item) return;
    const currentQty = getQtyNumber(item.qty);
    const nextQty = incrementId ? currentQty + 1 : Math.max(1, currentQty - 1);
    const unitPrice = product?.price || Number(item.price || 0) / currentQty || 0;
    item.qty = String(nextQty);
    item.price = Number((unitPrice * nextQty).toFixed(2));
    saveState(`Updated ${item.name} quantity to ${nextQty}`);
  }
  if (deleteId) {
    const item = state.grocery.find((entry) => entry.id === deleteId);
    state.grocery = state.grocery.filter((entry) => entry.id !== deleteId);
    saveState(`Removed ${item?.name || "item"} from grocery list`);
  }
});

on("markAllBoughtButton", "click", () => {
  state.grocery = state.grocery.map((item) => ({ ...item, done: true }));
  saveState("Marked all grocery items as bought");
});

on("clearCartButton", "click", () => {
  if (state.grocery.length === 0) {
    alert("Your cart is already empty.");
    return;
  }
  if (confirm("Clear all grocery items from your cart?")) {
    state.grocery = [];
    saveState("Cleared grocery cart");
  }
});

on("mealForm", "submit", (event) => {
  event.preventDefault();
  const meal = {
    id: createId(),
    day: $("mealDay").value,
    name: $("mealName").value,
    ingredients: $("mealIngredients").value
  };
  state.meals.push(meal);
  event.target.reset();
  saveState(`Scheduled ${meal.name}`);
});

on("mealGrid", "click", (event) => {
  const mealId = event.target.dataset.deleteMeal;
  if (!mealId) return;
  const meal = state.meals.find((entry) => entry.id === mealId);
  state.meals = state.meals.filter((entry) => entry.id !== mealId);
  saveState(`Removed meal ${meal?.name || ""}`.trim());
});

on("pantryForm", "submit", (event) => {
  event.preventDefault();
  const item = {
    id: createId(),
    name: $("pantryName").value,
    qty: Number($("pantryQty").value),
    expiry: $("pantryExpiry").value
  };
  state.pantry.push(item);
  event.target.reset();
  saveState(`Tracked pantry item ${item.name}`);
});

on("pantryGrid", "click", (event) => {
  const pantryId = event.target.dataset.deletePantry;
  if (!pantryId) return;
  const item = state.pantry.find((entry) => entry.id === pantryId);
  state.pantry = state.pantry.filter((entry) => entry.id !== pantryId);
  saveState(`Removed pantry item ${item?.name || ""}`.trim());
});

on("budgetLimit", "change", (event) => {
  state.budgetLimit = Number(event.target.value);
  saveState(`Budget changed to ${formatMoney(state.budgetLimit)}`);
});

on("productSearch", "input", renderProducts);
on("resetProductCatalog", "click", () => {
  state.products = mergeDefaultProducts([]);
  selectedProductCategory = "All";
  if ($("productSearch")) {
    $("productSearch").value = "";
  }
  saveState("Restored default product catalog");
});

on("productCategoryFilter", "click", (event) => {
  const button = event.target.closest("[data-product-category]");
  if (!button) return;
  selectedProductCategory = button.dataset.productCategory || "All";
  renderProducts();
});

on("productGrid", "click", (event) => {
  const button = event.target.closest("[data-add-product]");
  const productName = button?.dataset.addProduct;
  if (!productName) return;
  const product = state.products.find((item) => item.name === productName);
  if (!product) return;
  addProductToCart(product);
});

on("fullRecommendations", "click", (event) => {
  const button = event.target.closest("[data-add-product]");
  const productName = button?.dataset.addProduct;
  if (!productName) return;
  const product = state.products.find((item) => item.name === productName);
  if (!product) return;
  addProductToCart(product);
});

on("priceTable", "click", (event) => {
  const productName = event.target.dataset.addPriceProduct;
  if (!productName) return;
  const product = state.products.find((item) => item.name === productName);
  if (!product) return;
  addProductToCart(product);
});

on("refreshPricesButton", "click", () => {
  state.priceSeed += 3;
  saveState("Price comparison refreshed");
});

on("settingsForm", "submit", (event) => {
  event.preventDefault();
  state.settings = {
    diet: $("dietSetting").value,
    household: Number($("householdSetting").value),
    store: $("storeSetting").value,
    allergies: $("allergySetting").value
  };
  state.recommendationSeed += 1;
  selectedProductCategory = "All";
  if ($("productSearch")) {
    $("productSearch").value = "";
  }
  saveState("Settings updated");
  switchView("recommendations");
});

on("refreshRecs", "click", () => {
  state.recommendationSeed += 1;
  saveState("Recommendations refreshed");
});

on("refreshRecommendationsPage", "click", () => {
  state.recommendationSeed += 1;
  saveState("Recommendation picks refreshed");
});

on("resolveNotificationsButton", "click", () => {
  state.notificationsReviewedAt = new Date().toISOString();
  saveState("Notifications marked reviewed");
});

on("addProductForm", "submit", (event) => {
  event.preventDefault();
  const name = $("productName").value.trim();
  const category = $("productCategory").value;
  const price = Number($("productPrice").value);
  const icon = $("productIcon").value;
  const nutrition = $("productNutrition").value;

  if (state.products.some(p => p.name.toLowerCase() === name.toLowerCase())) {
    alert("A product with this name already exists!");
    return;
  }

  state.products.push({
    name,
    category,
    price,
    icon,
    nutrition
  });

  event.target.reset();
  saveState(`Added ${name} to product catalog`);
});

on("generateReceiptButton", "click", () => {
  const purchasedItems = state.grocery.filter(item => item.done);
  if (purchasedItems.length === 0) {
    alert("No purchased items to generate receipt for!");
    return;
  }

  const total = purchasedItems.reduce((sum, item) => sum + Number(item.price), 0);
  const customerName = state.user?.name || "Guest";

  $("receiptDate").textContent = new Date().toLocaleDateString();
  $("receiptCustomer").textContent = customerName;
  $("receiptItemsTable").innerHTML = purchasedItems.map(item => `
    <tr>
      <td>${escapeHtml(item.name)}</td>
      <td>${escapeHtml(item.qty)}</td>
      <td>${formatMoney(item.price / getQtyNumber(item.qty))}</td>
      <td>${formatMoney(item.price)}</td>
    </tr>
  `).join("");
  $("receiptTotal").textContent = formatMoney(total);

  saveState(`Generated receipt for ${purchasedItems.length} items`);
});

on("clearPurchasedButton", "click", () => {
  const purchasedCount = state.grocery.filter(item => item.done).length;
  if (purchasedCount === 0) {
    alert("No purchased items to clear!");
    return;
  }

  if (confirm(`Clear ${purchasedCount} purchased items from the list?`)) {
    state.grocery = state.grocery.filter(item => !item.done);
    saveState(`Cleared ${purchasedCount} purchased items`);
  }
});
