import { CustomCondition } from "express-validator/src/context-items/custom-condition.js";
import response from "../lib/response.js";
import { customError } from "../utils/customError/index.js";

export class ReservationService {
  constructor(ReservationRepository) {
    this.reservationRepository = ReservationRepository;
  }

  getReservation = async (sitterId) => {
    const reservation =
      await this.reservationRepository.getReservation(sitterId);

    if (!reservation) {
      throw new customError(
        404,
        "confilct",
        "펫 시터에 해당되는 예약이 없습니다."
      );
    }

    return response({
      status: 200,
      message: "펫 시터 조회에 성공했습니다.",
      data: reservation
    });
  };

  postReservation = async (sitterId, reservationDate, userId) => {
    const reservation = await this.reservationRepository.postReservation(
      sitterId,
      reservationDate,
      userId
    );

    if (!reservation) {
      throw new customError(400, "conflict", "이미 예약된 날짜입니다.");
    }

    return response({
      status: 200,
      message: "펫 시터 예약에 성공했습니다.",
      data: reservation
    });
  };

  putReservation = async (
    sitterId,
    reservationId,
    wantToChangeDate,
    userId
  ) => {
    const updatedReservation = await this.reservationRepository.putReservation(
      sitterId,
      reservationId,
      wantToChangeDate,
      userId
    );
    console.log("updatedReservation", updatedReservation);
    if (!updatedReservation) {
      throw new customError(
        400,
        "conflict",
        "이미 예약된 날짜이거나, 예약 내역이 없는 유저이거나, 수정 권한이 없는 유저입니다."
      );
    }

    if (
      !updatedReservation.success &&
      updatedReservation.success !== undefined
    ) {
      throw new customError(
        updatedReservation.status,
        updatedReservation.type,
        updatedReservation.message
      );
    }

    return response({
      status: 200,
      message: "펫 시터 예약 날짜 수정에 성공했습니다.",
      data: updatedReservation
    });
  };

  deleteReservation = async (reservationId, sitterId, userId) => {
    const deleteReservation =
      await this.reservationRepository.deleteReservation(
        reservationId,
        sitterId,
        userId
      );

    if (!deleteReservation) {
      throw new customError(
        400,
        "conflict",
        "예약이 존재하지 않거나, 삭제 권한이 없는 유저입니다."
      );
    }

    return response({
      status: 200,
      message: "펫 시터 예약 날짜 삭제에 성공했습니다.",
      data: deleteReservation
    });
  };
}
