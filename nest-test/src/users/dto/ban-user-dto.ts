import UserModel from "../user.model";

export default class BanUserDto implements Partial<UserModel> {
  email: string;
  banReason?: string;
}