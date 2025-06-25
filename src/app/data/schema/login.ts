export type Login = {
  email: string;
  password: string;
};

export type SupabaseLoginResponse = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
  user: any;
};

export type SupabaseSignupResponse = {
  user: {
    id: string;
    email: string;
    role: string;
    created_at: string;
    confirmed_at: string;
    last_sign_in_at: string;
  };

  session: {
    access_token: string;
    refresh_token: string;
    expires_in: number;
    token_type: string;
    user: any;
  };
};
