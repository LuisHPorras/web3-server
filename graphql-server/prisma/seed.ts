import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const date = new Date().toString()

const badgeData: Prisma.BadgeCreateInput[] = [
  {
    id: 0,
    issuerName: "Er Papito",
    recipientName: "Er Hijito",
    area: "La programació",
    issueDate: new Date()
  },
  {
    id: 1,
    issuerName: "Er Otro",
    recipientName: "Er Otrito",
    area: "La vida",
    issueDate: new Date()
  },
  {
    id: 2,
    issuerName: "La Mama",
    recipientName: "Er Hijito",
    area: "La mimada",
    issueDate: new Date()
  },
]

async function main() {
  console.log(`Start seeding ...`)
  for (const b of badgeData) {
    const badge = await prisma.badge.create({
      data: b,
    })
    console.log(`Created badge with id: ${badge.id}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })