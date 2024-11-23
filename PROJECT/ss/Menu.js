const { PrismaClient } = require('@prisma/client');
const fs = require('fs');

const prisma = new PrismaClient();

async function populateMenu() {
  try {
    // Read JSON file
    const menuData = JSON.parse(fs.readFileSync('menu.json', 'utf-8'));

    // Insert data into the Menu table
    for (const item of menuData) {
      const newMenuItem = await prisma.menu.create({
        data: {
          restaurant_id: item.restaurant_id, // Ensure this ID exists in the Restaurants table
          name: item.name,
          description: item.description,
          price: item.price,
          availability: item.availability,
        },
      });
      console.log('Menu Item Created:', newMenuItem);
    }
    console.log('All menu items added successfully!');
  } catch (error) {
    console.error('Error populating menu:', error);
  } finally {
    await prisma.$disconnect();
  }
}

populateMenu();
