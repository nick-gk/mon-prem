export class Account {
  constructor(
    public email: string,
    public department: string,
    public privileges: string,
    public role: string,
    public active: string,
    public creationTime: string,
    public lastSignIntTime: string,
    public uid: string,
    public password?: string
  ) {}
}
