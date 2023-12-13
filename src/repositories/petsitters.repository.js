export class PetsittersRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }
  getPetsitters = async () => {
    const petsitters = await this.prisma.petSitters.findMany();
    return petsitters;
  };

  getPetsitterById = async (petsitterId) => {
    const petsitter = await this.prisma.petSitters.findUnique({
      select: {
        email: true,
        name: true,
        career: true,
        profile: true,
        Review: {
          select: {
            comment: true,
            rating: true
          }
        }
      },
      where: {
        petsitterId: +petsitterId
      }
    });

    delete petsitter.password;

    return petsitter;
  };

  searchPetsitters = async (keyword) => {
    const petsitters = await this.prisma.petSitters.findMany({
      select: {
        email: true,
        name: true,
        career: true,
        profile: true,
        Review: {
          select: {
            comment: true,
            rating: true
          }
        }
      },
      where: {
        OR: [{ name: { contains: keyword } }, { career: { contains: keyword } }]
      }
    });

    return petsitters;
  };
}
