import { HttpException, HttpStatus } from "@nestjs/common";

export default class ValidationException extends HttpException {
  readonly messages: string[]

  constructor(response) {
    super(response, HttpStatus.BAD_REQUEST)
    this.messages = response
  }
}