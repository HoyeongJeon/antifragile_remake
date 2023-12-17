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

  getReviews = async (petsitterId) => {
    console.log("1", petsitterId);
    const getReview =
      await this.petsittersRepository.getAllReviews(petsitterId);
    console.log(getReview);
    if (!getReview) {
      throw new customError(
        404,
        "Conflict",
        "펫시터에 해당하는 리뷰가 존재하지 않습니다."
      );
    }

    return response({
      status: 200,
      message: "리뷰 검색을 성공했습니다.",
      data: getReview
    });
  };

  postReviews = async (userId, petsitterId, title, comment, rating) => {
    if (
      !comment ||
      !rating ||
      !title ||
      parseInt(rating) < 1 ||
      parseInt(rating) > 5
    ) {
      throw new customError(409, "Conflict", "데이터형식이 올바르지 않습니다.");
    }
    const createdReviews = await this.petsittersRepository.postReviews(
      userId,
      petsitterId,
      title,
      comment,
      rating
    );
    return response({
      status: 200,
      message: "리뷰 작성에 성공했습니다.",
      data: createdReviews
    });
  };
  putReviews = async (
    userId,
    petsitterId,
    title,
    comment,
    rating,
    reviewId
  ) => {
    if (!title || !comment || !rating) {
      throw new customError(409, "Conflict", "데이터형식이 올바르지 않습니다.");
    }
    const gotReviews = await this.petsittersRepository.getReviews(reviewId);
    if (!gotReviews) {
      throw new customError(409, "Conflict", "존재하지 않는 리뷰입니다.");
    }
    const updatedReviews = await this.petsittersRepository.putReviews(
      userId,
      petsitterId,
      title,
      comment,
      rating,
      reviewId
    );
    return response({
      status: 200,
      message: "리뷰가 수정되었습니다.",
      data: updatedReviews
    });
  };

  deleteReviews = async (userId, reviewId) => {
    const gotReviews = await this.petsittersRepository.getReviews(reviewId);
    if (!gotReviews) {
      throw new customError(409, "Conflict", "존재하지 않는 리뷰입니다.");
    }
    const deletedReviews = await this.petsittersRepository.deleteReviews(
      userId,
      reviewId
    );
    if (!deletedReviews) {
      throw new customError(409, "Conflict", "존재하지 않는 리뷰입니다.");
    }
    return response({
      status: 200,
      message: "리뷰가 삭제되었습니다.",
      data: deletedReviews
    });
  };
}
