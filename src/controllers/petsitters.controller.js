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
}
