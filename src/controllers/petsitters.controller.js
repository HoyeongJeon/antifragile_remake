import response from "../lib/response";

export class PetsittersController {
  constructor(petsittersService) {
    this.petsittersService = petsittersService;
  }

  getPetsitters = async (req, res, next) => {
    try {
      const responseFromService = await this.petsittersService.getPetsitters();
      return res.status(responseFromService.status).json(responseFromService);
    } catch (error) {
      next(error);
    }
  };

  getPetsitterById = async (req, res, next) => {
    try {
      const responseFromService = await this.petsittersService.getPetsitterById(
        req.params.petsitterId
      );
      return res.status(responseFromService.status).json(responseFromService);
    } catch (error) {
      next(error);
    }
  };

  searchPetsitters = async (req, res, next) => {
    try {
      if (!req.query) {
        return res.status(400).json(
          response({
            status: 400,
            message: "검색어를 입력해주세요.",
            data: null
          })
        );
      }
      const { keyword } = req.query;
      const responseFromService =
        await this.petsittersService.searchPetsitters(keyword);
      return res.status(responseFromService.status).json(responseFromService);
    } catch (error) {
      next(error);
    }
  };
  postReviews = async (req, res, next) => {
    try {
      const { userId } = req.session.loggedInUser;
      const { petsitterId } = req.params;
      const { title, comment, rating } = req.body;

      const createdReviews = await this.petsittersService.postReviews(
        userId,
        petsitterId,
        title,
        comment,
        rating
      );

      return res.status(createdReviews.status).json(createdReviews);
    } catch (error) {
      next(error);
    }
  };

  putReviews = async (req, res, next) => {
    try {
      const { userId } = req.session.loggedInUser;
      const { petsitterId, reviewId } = req.params;
      const { title, comment, rating } = req.body;

      const updatedReviews = await this.petsittersService.putReviews(
        userId,
        petsitterId,
        title,
        comment,
        rating,
        reviewId
      );
      return res.status(updatedReviews.status).json(updatedReviews);
    } catch (error) {
      next(error);
    }
  };

  deleteReviews = async (req, res, next) => {
    try {
      const { userId } = req.session.loggedInUser;
      const { reviewId } = req.params;

      const deletedReviews = await this.petsittersService.deleteReviews(
        userId,
        reviewId
      );
      return res.status(deletedReviews.status).json(deletedReviews);
    } catch (error) {
      next(error);
    }
  };
}
