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

  petsitter_signup = async (email, name, career, password, path) => {
    const signup = await this.prisma.petSitters.create({
      data: {
        email,
        name,
        career,
        password,
        profile: path
      }
    });
    delete signup.password;
    return {
      signup
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
