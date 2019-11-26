export interface State {
  name: string;
  items: object;
}

const initialState: State = {
  name: 'main',
  items: {
    main: ['Dashboard', 'Orders']
  }
};
