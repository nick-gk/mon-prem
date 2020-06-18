export class Order {
  constructor(
    public customerForm: {
      customer_fname: string;
      customer_lname: string;
      country: string;
      city: string;
      address: string;
      cnp: number;
      customer_tel: number;
    },
    public deceasedForm: {
      d_fname: string;
      d_sname: string;
      bdate: Date;
      ddate: Date;
      cemetery: string;
      cemetery_city: string;
      cemetery_country: string;
    },
    public elemsForm: [
      {
        article: string;
        quantity: number;
        colour: string;
        length: number;
        width: number;
        thickness: number;
        uni_price: number;
        expense: number;
        price: number;
      }
    ],
    public summaryForm: {
      today_date: Date;
      due_date: Date;
      avans: number;
      avansArray: [{ avans: number; avans_date: Date }];
      total: number;
      left_amount: number;
      obsc: string;
    },
    public progressForm: {
      stock: {
        checkStock: boolean;
        responsibleName: string;
        amount: number;
        obsv: string;
      };
      prelucrare: {
        checkPrelucrare: boolean;
        responsibleName: string;
        amount: number;
        obsv: string;
      };
      engraving: {
        checkEngraving: boolean;
        responsibleName: string;
        amount: number;
        obsv: string;
      };
      mounting: {
        checkMounting: boolean;
        responsibleName: string;
        amount: number;
        obsv: string;
      };
    }
  ) {}
}
