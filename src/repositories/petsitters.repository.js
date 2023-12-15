export class PetsittersRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }
  getPetsitters = async () => {
    const petsitters = await this.prisma.petSitters.findMany({
      select: {
        email: true,
        name: true,
        Profile: {
          select: {
            profile: true,
            tags: true
          }
        },
        Review: {
          select: {
            comment: true,
            rating: true
          }
        }
      }
    });

    if (petsitters) {
      for (let i = 0; i < petsitters.length; i++) {
        const reviews = petsitters[i].Review || [];
        let totalRating = 0;

        for (let j = 0; j < reviews.length; j++) {
          totalRating += reviews[j].rating || 0;
        }

        let avgRating = 0;
        if (reviews.length > 0) {
          avgRating = totalRating / reviews.length;
        }

        petsitters[i].avgRating = avgRating;
        delete petsitters[i].Review;
      }
    }

    return petsitters;
  };

  getPetsitterById = async (petsitterId) => {
    const petsitter = await this.prisma.petSitters.findUnique({
      select: {
        email: true,
        name: true,
        Profile: {
          select: {
            profile: true,
            career: true,
            tags: true
          }
        },
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

    if (petsitter) {
      const reviews = petsitter.Review;
      let totalRating = 0;

      for (let i = 0; i < reviews.length; i++) {
        totalRating += reviews[i].rating;
      }

      let avgRating = 0;
      if (reviews.length > 0) {
        avgRating = totalRating / reviews.length;
      }

      petsitter.avgRating = avgRating;

      return petsitter;
    }

    delete petsitter.password;

    return petsitter;
  };

  searchPetsitters = async (keyword) => {
    const petsitters = await this.prisma.petSitters.findMany({
      select: {
        email: true,
        name: true,
        Review: {
          select: {
            comment: true,
            rating: true
          }
        },
        Profile: {
          select: {
            profile: true,
            tags: true,
            career: true
          }
        }
      },
      where: {
        OR: [
          {
            name: {
              contains: keyword
            }
          },
          {
            Profile: {
              tags: {
                contains: keyword
              }
            }
          },
          {
            Profile: {
              career: {
                contains: keyword
              }
            }
          }
        ]
      }
    });
    if (petsitters) {
      for (let i = 0; i < petsitters.length; i++) {
        const reviews = petsitters[i].Review || [];
        let totalRating = 0;

        for (let j = 0; j < reviews.length; j++) {
          totalRating += reviews[j].rating || 0;
        }

        let avgRating = 0;
        if (reviews.length > 0) {
          avgRating = totalRating / reviews.length;
        }

        petsitters[i].avgRating = avgRating;
        delete petsitters[i].Review;
      }
    }
    return petsitters;
  };
  postReviews = async (userId, petsitterId, comment, rating) => {
    const createdReviews = await this.prisma.review.create({
      data: {
        UserId: userId,
        PetsitterId: +petsitterId,
        comment,
        rating: +rating
      }
    });
    return createdReviews;
  };

  getReviews = async (reviewId) => {
    const gotReviews = await this.prisma.review.findFirst({
      where: { reviewId: +reviewId }
    });
    return gotReviews;
  };
  putReviews = async (comment, rating, userId, petsitterId, reviewId) => {
    const updatedReviews = await this.prisma.review.update({
      where: { reviewId: +reviewId, UserId: +userId },
      data: {
        UserId: +userId,
        PetsitterId: +petsitterId,
        comment,
        rating: +rating
      }
    });
    return updatedReviews;
  };

  deleteReviews = async (userId, reviewId) => {
    const deletedReviews = await this.prisma.review.delete({
      where: { UserId: +userId, reviewId: +reviewId }
    });
    return deletedReviews;
  };
}
