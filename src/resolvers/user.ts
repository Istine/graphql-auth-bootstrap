import { User } from "../entities/user";
import { Query, Resolver } from "type-graphql";

interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

@Resolver()
export class UserResolver {
  @Query(() => [User])
  async Register() {
    const allUsers = await User.find();
    return [...allUsers];
  }
}
