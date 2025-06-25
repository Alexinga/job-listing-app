export type Company = {
  id: number;
  created_at: string;
  name: string;
};

export type NewCompany = Omit<Company, 'id'>;
