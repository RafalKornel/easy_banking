import { Password } from "../models";

export interface RegisterDto {
  username: string;
  password: string;
  repeatPassword: string;
}

export class RegisterModel {
  readonly username: string;
  readonly password: Password;
  readonly repeatPassword: Password;

  constructor(data: RegisterDto) {
    this.username = data.username;
    this.password = new Password(data.password);
    this.repeatPassword = new Password(data.repeatPassword);

    this.validate();
  }

  validateRepeat(password: Password, repeatPassword: Password) {
    if (!password.equal(repeatPassword)) {
      throw new Error("Passwords are not matching");
    }
  }

  validate() {
    this.validateRepeat(this.password, this.repeatPassword);
  }
}

export interface LoginDto {
  username: string;
  password: string;
}
