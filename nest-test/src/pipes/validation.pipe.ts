import { ArgumentMetadata, HttpException, HttpStatus, Injectable, PipeTransform } from "@nestjs/common";
import {plainToClass} from 'class-transformer'
import { validate } from "class-validator";
import ValidationException from "src/exceptions/ValidationException";

@Injectable()
export default class ValidationPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata):Promise<any> {
    const object = plainToClass(metadata.metatype, value)
    const errors = await validate(object)

    if (errors.length) {
      const messages = errors.map((error):string => {
        return `${error.property} - ${Object.values(error.constraints).join(', ')}`
      })
      throw new ValidationException(messages)
    }

    return value
  }
}