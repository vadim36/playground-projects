import RoleModel from "src/roles/role.model"
import UserModel from "src/users/user.model"

export default class UserPayload {
  userId: string
  email: string
  banned: boolean
  roles: RoleModel[]

  constructor (model: UserModel) {
    this.userId = model.userId
    this.email = model.email
    this.banned = model.banned
    this.roles = model.roles
  }
}