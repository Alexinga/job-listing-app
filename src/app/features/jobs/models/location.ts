export type State = {
  name: string;
  cities: string[];
};
export type Location = {
  country: string;
  states: State[];
};
