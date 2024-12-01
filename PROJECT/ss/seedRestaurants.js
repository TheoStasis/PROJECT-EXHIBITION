const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Check if the 'Admin' role exists
  const existingRole = await prisma.userRole.findFirst({
    where: { roleName: "Admin" },
  });

  // If the 'Admin' role doesn't exist, create it
  const adminRole = existingRole
    ? existingRole
    : await prisma.userRole.create({
        data: {
          roleName: "Admin",
        },
      });

  console.log("Admin Role: ", adminRole);

  // Add more roles if needed
  const existingUserRole = await prisma.userRole.findFirst({
    where: { roleName: "User" },
  });

  if (!existingUserRole) {
    const userRole = await prisma.userRole.create({
      data: {
        roleName: "User",
      },
    });
    console.log("User Role: ", userRole);
  }

  // Create restaurants if they don't exist
  const existingRestaurant1 = await prisma.restaurant.findUnique({
    where: { name: "Mayuri Cafe" },
  });

  if (!existingRestaurant1) {
    const restaurant1 = await prisma.restaurant.create({
      data: {
        userId: 1,  // Example user ID, update with the actual user ID
        name: "Mayuri Cafe",
        address: "123 Main St",
        locality: "Locality1",
        cityId: 1,   // Example city ID
        stateId: 1,  // Example state ID
        countryId: 1,  // Example country ID
        latitude: 28.7041,
        longitude: 77.1025,
        rating: 4.5,
        status: "active",
        isAcceptingOrders: true,
      },
    });

    console.log("Restaurant 1 Created: ", restaurant1);
  }

  const existingRestaurant2 = await prisma.restaurant.findUnique({
    where: { name: "Underbelly" },
  });

  if (!existingRestaurant2) {
    const restaurant2 = await prisma.restaurant.create({
      data: {
        userId: 2,  // Example user ID, update with the actual user ID
        name: "Underbelly",
        address: "456 Another St",
        locality: "Locality2",
        cityId: 1,   // Example city ID
        stateId: 1,  // Example state ID
        countryId: 1,  // Example country ID
        latitude: 28.7042,
        longitude: 77.1026,
        rating: 4.3,
        status: "active",
        isAcceptingOrders: true,
      },
    });

    console.log("Restaurant 2 Created: ", restaurant2);
  }

  // Add more seeding logic for other models if needed

  console.log("Seeding completed.");
}

main()
  .catch(e => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
