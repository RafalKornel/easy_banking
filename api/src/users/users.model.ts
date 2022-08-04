import { Password } from "../models";

export interface RegisterDto {
  username: string;
  password: string;
  repeatPassword: string;
}

export class RegisterModel {
  readonly username: string;
  private readonly _password: Password;
  private readonly repeatPassword: Password;

  constructor(data: RegisterDto) {
    this.username = data.username;
    this._password = new Password(data.password);
    this.repeatPassword = new Password(data.repeatPassword);

    this.validate();
  }

  get password() {
    return this._password.value;
  }

  validateRepeat(password: Password, repeatPassword: Password) {
    if (!password.equal(repeatPassword)) {
      throw new Error("Passwords are not matching");
    }
  }

  validate() {
    this.validateRepeat(this._password, this.repeatPassword);
  }
}

export interface LoginDto {
  username: string;
  password: string;
}

export interface UserModel {
  id: number;
  username: string;
  password: string;
}
