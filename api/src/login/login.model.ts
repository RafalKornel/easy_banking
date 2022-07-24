export interface LoginDto {
  username: string;
  password: string;
  repeatPassword: string;
}

export class LoginModel implements LoginDto {
  username: string;
  password: string;
  repeatPassword: string;

  constructor(data: LoginDto) {
    this.validate(data);

    this.username = data.username;
    this.password = data.password;
    this.repeatPassword = data.repeatPassword;
  }

  validatePassword(password: string) {
    if (password.length < 8) {
      throw new Error("Password is too short");
    }
  }

  validateRepeat(password: string, repeatPassword: string) {
    if (password !== repeatPassword) {
      throw new Error("Passwords are not matching");
    }
  }

  validate(input: LoginDto) {
    this.validatePassword(input.password);
    this.validateRepeat(input.password, input.repeatPassword);
  }
}
