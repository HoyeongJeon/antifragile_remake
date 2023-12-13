import response from "../lib/response.js";
import { customError } from "../utils/customError/index.js";
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

  postReviews = async (comment, rating, userId, petsitterId) => {
    if (!comment || !rating) {
      throw new customError(409, "Conflict", "데이터형식이 올바르지 않습니다.");
    }
    const createdReviews = await this.petsittersRepository.postReviews(
      userId,
      petsitterId,
      comment,
      rating
    );
    return response({
      success: true,
      message: "리뷰 작성에 성공했습니다.",
      data: createdReviews
    });
  };

  putReviews = async (comment, rating, userId, petsitterId, reviewId) => {
    if (!comment || !rating) {
      throw new customError(409, "Conflict", "데이터형식이 올바르지 않습니다.");
    }
    const gotReviews = await this.petsittersRepository.getReviews(reviewId);
    if (!gotReviews) {
      throw new customError(409, "Conflict", "존재하지 않는 리뷰입니다.");
    }
    const updatedReviews = await this.petsittersRepository.putReviews(
      userId,
      petsitterId,
      comment,
      rating,
      reviewId
    );
    return response({
      success: true,
      message: "리뷰가 수정되었습니다.",
      data: updatedReviews
    });
  };

  // deleteReviews = async (userId, petsitterId, reviewId) => {
  //   const deletedReviews = await this.petsittersRepository.putReviews(
  //     userId,
  //     petsitterId,
  //     reviewId
  //   );

  // if (!deletedReviews)
}
