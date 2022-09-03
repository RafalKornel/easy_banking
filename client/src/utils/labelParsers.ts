import { UserModel } from "../models/User.model";

export const userLabelParserWithBalance = (user: UserModel) => `${user.username} (${user.balance}$)`;
