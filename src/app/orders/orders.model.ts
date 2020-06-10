import { Component } from "./component.model";

export class Order extends Component<string> {
  controlType = "textbox";
  type: string;

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
    public deadForm: {
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
        quantity?: number;
        colour?: string;
        length?: number;
        width?: number;
        thickness?: number;
        uni_price?: number;
        price?: number;
        model?: string;
        component?: string;
      }
    ],
    public summaryForm: {
      add_image?: string;
      today_date: Date;
      due_date: Date;
      avans: number;
      total: number;
      obsc?: string;
    },
    options: {} = {}
  ) {
    super(options);
    this.type = options["type"] || "";
    console.log(elemsForm);
  }
}
