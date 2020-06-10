export class Component<T> {
  value: T;
  article: string;
  color: string;
  length: number;
  width: number;
  thickness: number;
  uni_price: number;
  price: number;
  model: string;
  component: string;

  constructor(
    options: {
      value?: T;
      article?: string;
      color?: string;
      length?: number;
      width?: number;
      thickness?: number;
      uni_price?: number;
      price?: number;
      model?: string;
      component?: string;
    } = {}
  ) {
    this.value = options.value;
    this.article = options.article || "";
    this.color = options.color || "";
    this.length = options.length === undefined ? 0 : options.length;
    this.width = options.width === undefined ? 0 : options.width;
    this.thickness = options.thickness === undefined ? 0 : options.thickness;
    this.uni_price = options.uni_price === undefined ? 0 : options.uni_price;
    this.price = options.price === undefined ? 0 : options.price;
    this.model = options.model || "";
    this.component = options.component || "";
  }
}
