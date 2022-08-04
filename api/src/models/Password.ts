export class Password {
  private readonly password: string;

  constructor(password: string) {
    this.validatePassword(password);

    this.password = password;
  }

  get value() {
    return this.password;
  }

  validatePassword(password: string) {
    if (password.length < 8) {
      throw new Error("Password is too short");
    }
  }

  public equal(password: Password): boolean {
    return this.password === password.value;
  }
}
