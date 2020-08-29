export class Profile {
  constructor(
    public fullName: string,
    public genre: string,
    public city: string,
    public birthDate: Date,
    public cnp: string,
    public phoneNumber: string,
    public employmentDate: Date,
    public salaryBrut: number,
    public salaryNet: number,
    public manager: string,
    public personalEmail: string,
    public picture: string
  ) {}
}
