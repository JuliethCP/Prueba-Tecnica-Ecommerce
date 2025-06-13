const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
require('dotenv').config();

const prisma = new PrismaClient();

async function createAdmin() {
    const email = "admin@kpopbeat.com";
    const existing = await prisma.user.findUnique({ where: { email } });

    if (existing) {
        console.log("Admin already exists.");
        return;
    }

    const hashed = await bcrypt.hash("admin123", 10);

    const admin = await prisma.user.create({
        data: {
            name: "Admin",
            email,
            password: hashed,
            role: "admin"
        }
    });

    console.log("Admin created:", admin);
}

createAdmin()
    .catch((e) => console.error(e))
    .finally(() => prisma.$disconnect());
