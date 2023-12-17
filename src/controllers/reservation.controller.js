export class ReservationController {
  constructor(ReservationService) {
    this.reservationService = ReservationService;
  }

  getReservation = async (req, res, next) => {
    try {
      const { sitterId } = req.params;

      const responseFromService =
        await this.reservationService.getReservation(sitterId);

      return res.status(responseFromService.status).json(responseFromService);
    } catch (error) {
      next(error);
    }
  };

  postReservation = async (req, res, next) => {
    try {
      const { reservationDate, money, sitterId } = req.body;

      const userId = req.session.loggedInUser.userId;

      const formattedReservationDate = new Date(reservationDate);

      const responseFromService = await this.reservationService.postReservation(
        sitterId,
        formattedReservationDate,
        userId,
        money
      );

      return res.status(responseFromService.status).json(responseFromService);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  putReservation = async (req, res, next) => {
    try {
      const { sitterId, reservationId } = req.params;
      const { wantToChangeDate } = req.body;

      const { userId } = req.session.loggedInUser;

      const responseFromService = await this.reservationService.putReservation(
        sitterId,
        reservationId,
        wantToChangeDate,
        userId
      );

      return res.status(responseFromService.status).json(responseFromService);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  deleteReservation = async (req, res, next) => {
    try {
      const { sitterId, reservationId } = req.params;

      const { userId } = req.session.loggedInUser;

      const responseFromService =
        await this.reservationService.deleteReservation(
          reservationId,
          sitterId,
          userId
        );

      return res.status(responseFromService.status).json(responseFromService);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}
