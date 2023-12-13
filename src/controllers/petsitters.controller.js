import response from "../lib/response";

export class PetsittersController {
  constructor(PetssitersService) {
    this.petsittersService = PetssitersService;
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
}
