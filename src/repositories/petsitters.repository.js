export class PetsittersRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }
  getPetsitters = async () => {
    const petsitters = await this.prisma.petSitters.findMany();
    console.log(petsitters);
    return petsitters;
  };
}
