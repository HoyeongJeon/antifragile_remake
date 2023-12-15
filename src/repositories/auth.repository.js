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

  getMyInfo = async (userId) => {
    const myInfo = await this.prisma.users.findFirst({
      select: {
        userId: true,
        email: true,
        name: true,
        wallet: true,
        Reservation: {
          select: {
            PetsitterId: true,
            reservationDate: true
          }
        },
        Review: {
          select: {
            reviewId: true,
            comment: true,
            rating: true,
            createdAt: true,
            Petsitter: {
              select: {
                name: true
              }
            }
          }
        }
      },
      where: {
        userId: +userId
      }
    });
    // I Want to send petsitterName to client with myInfo.. How can I do that?
    // I tried to use include option, but it didn't work.
    const reservationInfo = [];

    for (let i = 0; i < myInfo.Reservation.length; i++) {
      const petsitterName = await this.prisma.petSitters.findFirst({
        select: {
          name: true
        },
        where: {
          petsitterId: myInfo.Reservation[i].PetsitterId
        }
      });
      reservationInfo.push({
        ...myInfo.Reservation[i],
        petsitterName: petsitterName.name
      });
    }
    delete myInfo.password;
    delete myInfo.Reservation;
    myInfo.reservationInfo = reservationInfo;
    return myInfo;
  };

  chargeMoney = async (userId, money) => {
    const result = await this.prisma.users.update({
      where: {
        userId: +userId
      },
      data: {
        wallet: {
          increment: +money
        }
      }
    });
    return result;
  };
}
