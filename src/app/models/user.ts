export interface Repository {
  id?: number;
  login?: string;
  avatar_url?: string;
  url?: string;
  followers_url?: string;
  email?: string;
  followers?: Array<Repository>;
}

