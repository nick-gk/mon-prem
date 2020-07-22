export class Order {
  constructor(
    public id: number,
    public customerForm: {
      customer_fname: string;
      country: string;
      city: string;
      address: string;
      cnp: number;
      customer_tel: number;
    },
    public deceasedForm: [
      {
        d_fname: string;
        d_sname: string;
        bdate: Date;
        ddate: Date;
        cemetery: string;
        cemetery_city: string;
        cemetery_country: string;
        epitaf: string;
      }
    ],
    public elemsForm: [
      {
        article: string;
        quantity: number;
        desc: string;
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
      avans: number;
      avansArray: [{ avans_amount: number; cec: boolean; avans_date: Date }];
      discountArray: [
        {
          type: string;
          discount_amount: number;
          reason: string;
          discount_date: Date;
        }
      ];
      total: number;
      tva: number;
      discount: number;
      left_amount: number;
    },
    public termeniForm: {
      today_date: Date;
      due_date: Date;
      obsv: string;
    },
    public progressForm: {
      piatra: {
        obsv: string;
        poze: [
          {
            path: "";
            downloadUrl: string;
          }
        ];
      };
      prelucrare: {
        obsv: string;
        poze: [
          {
            path: "";
            downloadUrl: string;
          }
        ];
      };
      photoengraving: {
        obsv: string;
        poze: [
          {
            path: "";
            downloadUrl: string;
          }
        ];
      };
      engraving: {
        obsv: string;
        poze: [
          {
            path: "";
            downloadUrl: string;
          }
        ];
      };
      mounting: {
        obsv: string;
        poze: [
          {
            path: "";
            downloadUrl: string;
          }
        ];
      };
    }
  ) {}
}
