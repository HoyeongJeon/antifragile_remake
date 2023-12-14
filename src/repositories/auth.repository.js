import { Prisma } from "@prisma/client";

export class AuthRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }
  signup = async (email, name, password) => {
    const signup = await this.prisma.users.create({
      data: {
        email,
        name,
        password
      }
    });
    delete signup.password;
    return {
      signup
    };
  };

  petsitter_signup = async (
    email,
    name,
    career,
    tags,
    introduce,
    password,
    path
  ) => {
    const [signup, profile] = await this.prisma.$transaction(
      async (tx) => {
        const signup = await tx.petSitters.create({
          data: {
            email,
            name,
            password
          }
        });

        const profile = await tx.profiles.create({
          data: {
            profile: path,
            career,
            tags,
            introduce,
            PetsitterId: signup.petsitterId
          }
        });

        return [signup, profile];
      },
      {
        isolationLevel: Prisma.TransactionIsolationLevel.ReadCommitted
      }
    );

    delete signup.password;
    return {
      signup,
      profile
    };
  };

  petsitter_findByEmail = async (email) => {
    const user = await this.prisma.petSitters.findFirst({
      where: {
        email
      }
    });
    return user;
  };

  findByEmail = async (email) => {
    const user = await this.prisma.users.findFirst({
      where: {
        email
      }
    });
    return user;
  };
}
