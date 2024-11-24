import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import * as path from 'path'
import * as fs from 'fs'

@Injectable()
export class FilesService {
  async createFile(file):Promise<string> {
    try {
      const fileName = v4() + '.jpg'
      const filePath = path.join(__dirname, '..', 'static')
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, {recursive: true})
      }
      fs.writeFileSync(path.join(filePath, fileName), file.buffer)
      return fileName
    } catch (error: unknown) {
      throw new HttpException('The Error with recording file', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}