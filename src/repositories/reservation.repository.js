import { customError } from "../utils/customError";
import { Prisma } from "@prisma/client";

export class ReservationRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  getReservation = async (sitterId) => {
    const reservation = await this.prisma.reservation.findMany({
      where: { PetsitterId: +sitterId }
    });

    if (!reservation.length) {
      return false;
    }

    return reservation;
  };

  postReservation = async (sitterId, reservationDate, userId, money) => {
    // sitter id와 날짜 두 개를 db에서 동시에 찾는 방법 구해보기
    const price = await this.prisma.profiles.findFirst({
      where: { PetsitterId: +sitterId }
    });

    if (money < price) {
      throw new customError(400, "conflict", "돈이 부족합니다.");
    }

    const reservedDate = await this.prisma.reservation.findMany({
      where: { PetsitterId: +sitterId }
    });

    const stiringifyUserDate = String(new Date(reservationDate)).slice(4, 16);

    let result = false;

    reservedDate.forEach((el) => {
      const stringifyDBDate = String(el.reservationDate).slice(4, 16);

      if (stiringifyUserDate === stringifyDBDate) {
        result = true;
      }
    });

    if (result) {
      return false;
    }

    // const reservation = await this.prisma.reservation.create({
    //   data: {
    //     PetsitterId: +sitterId,
    //     UserId: userId,
    //     reservationDate
    //   }
    // });
    const [reservation, moneyUpdate] = await this.prisma.$transaction(
      async (tx) => {
        const reservation = await this.prisma.reservation.create({
          data: {
            PetsitterId: +sitterId,
            UserId: userId,
            reservationDate
          }
        });

        const moneyUpdate = await tx.users.update({
          where: { userId: +userId },
          data: { wallet: money - price.price }
        });
        return [reservation, moneyUpdate];
      },
      {
        isolationLevel: Prisma.TransactionIsolationLevel.ReadCommitted
      }
    );

    return reservation;
  };

  putReservation = async (
    sitterId,
    reservationId,
    wantToChangeDate,
    userId
  ) => {
    const myReservedDate = await this.prisma.reservation.findFirst({
      where: { reservationId: +reservationId }
    });
    console.log("myReservedDate", myReservedDate);

    // 예약된 내역이 없을 경우 false 반환
    if (!myReservedDate) {
      console.log("여기");
      return false;
    }

    if (myReservedDate.UserId !== userId) {
      console.log("myReservedDate.UserId", myReservedDate.UserId);
      console.log("userId", userId);
      return {
        success: false,
        status: 403,
        type: "conflict",
        message: "예약을 변경할 권한이 없습니다."
      };
    }

    // 이미 정해진 날짜가 있을 경우 false 반환
    console.log("wantToChangeDate", typeof wantToChangeDate);
    //여기서 왜 날짜가 다른애가 나오지..
    // const reservedDate = await this.prisma.reservation.findFirst({
    //   where: {
    //     PetsitterId: +sitterId,
    //     reservationDate: new Date(wantToChangeDate)
    //   }
    // });
    const reservedDate = await this.prisma.reservation.findMany({
      where: { PetsitterId: +sitterId }
    });

    const existReservedDate = reservedDate.find(
      (el) => el.reservationDate === wantToChangeDate
    );

    if (existReservedDate) {
      return false;
    }

    // console.log(
    //   "reservedDate.reservationDate 타입",
    //   typeof reservedDate.reservationDate
    // );
    // console.log("reservedDate", reservedDate);
    // if (reservedDate) {
    //   console.log("저기");
    //   return false;
    // }

    const updatedReservation = await this.prisma.reservation.update({
      where: { reservationId: +reservationId },
      data: { reservationDate: wantToChangeDate }
    });

    return updatedReservation;
  };

  deleteReservation = async (reservationId, sitterId, userId) => {
    const myReservedDate = await this.prisma.reservation.findFirst({
      where: { reservationId: +reservationId }
    });

    if (!myReservedDate) {
      return false;
    }

    if (myReservedDate.UserId !== userId) {
      return false;
    }

    const price = await this.prisma.profiles.findFirst({
      where: { PetsitterId: +sitterId }
    });

    const [deleteReservation, moneyUpdate] = await this.prisma.$transaction(
      async (tx) => {
        const deleteReservation = await this.prisma.reservation.delete({
          where: { reservationId: +reservationId }
        });

        const moneyUpdate = await tx.users.update({
          where: { userId: +userId },
          data: { wallet: { increment: price.price } }
        });
        return [deleteReservation, moneyUpdate];
      },
      {
        isolationLevel: Prisma.TransactionIsolationLevel.ReadCommitted
      }
    );

    return deleteReservation;
  };
}
