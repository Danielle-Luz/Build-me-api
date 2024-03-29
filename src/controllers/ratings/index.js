const { StatusCodes } = require("http-status-codes");
const { RatingsServices } = require("../../services");

class RatingsController {
  static async create(request, response) {
    const { validatedData } = request;
    validatedData.authorId = request.loggedUser.id;

    const createdRating = await RatingsServices.create(validatedData);

    return response.status(StatusCodes.CREATED).json(createdRating);
  }

  static async getRatingsMade(request, response) {
    const { page, quantity } = request.query;
    const ratingsMade = await RatingsServices.getRatingsMade(
      request.params.authorId,
      { page, quantity }
    );
    
    return response.status(StatusCodes.OK).json(ratingsMade);
  }

  static async getRatingsReceived(request, response) {
    const { page, quantity } = request.query;
    const ratingsReceived = await RatingsServices.getRatingsReceived(
      request.params.ratedRecipientId,
      { page, quantity }
    );
    
    return response.status(StatusCodes.OK).json(ratingsReceived);
  }

  static async getRatingsAverage(request, response) {
    const ratingsAverage = await RatingsServices.getRatingsAverage(
      request.params.ratedRecipientId
    );
    return response.status(StatusCodes.OK).json(ratingsAverage);
  }

  static async update(request, response) {
    const { validatedData } = request;
    const id = request.params.id;

    const updatedRating = await RatingsServices.update(id, validatedData);

    return response.status(StatusCodes.CREATED).json(updatedRating);
  }

  static async delete(request, response) {
    const id = request.params.id;

    await RatingsServices.delete(id);

    return response.status(StatusCodes.NO_CONTENT).json();
  }
}

module.exports = { RatingsController };
