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

  getPetsitterById = async (petsitterId) => {
    const petsitter =
      await this.petsittersRepository.getPetsitterById(petsitterId);

    if (petsitter === null) {
      return response({
        status: 404,
        message: "펫시터를 찾을 수 없습니다.",
        data: null
      });
    }

    return response({
      status: 200,
      message: "펫시터 조회에 성공했습니다.",
      data: petsitter
    });
  };

  searchPetsitters = async (keyword) => {
    const petsitters =
      await this.petsittersRepository.searchPetsitters(keyword);

    if (petsitters.length === 0) {
      return response({
        status: 404,
        message: "검색 결과가 없습니다.",
        data: null
      });
    }

    return response({
      status: 200,
      message: "펫시터 검색에 성공했습니다.",
      data: petsitters
    });
  };
}
