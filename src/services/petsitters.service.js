import response from "../lib/response.js";

export class PetssitersService {
  constructor(petsittersRepository) {
    this.petsittersRepository = petsittersRepository;
  }

  getPetsitters = async () => {
    const petsitters = await this.petsittersRepository.getPetsitters();

    return response({
      status: 200,
      message: "펫시터 목록 조회에 성공했습니다.",
      data: petsitters
    });
  };
}
