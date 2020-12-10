import {Repository} from './repository';

export interface User {
  id: number;
  login: string;
  avatar_url: string;
  url: string;
  followers_url: string;
  email: string;
  type: string;
  followers: Array<User>;
  node_id: string;
  gravatar_id: string;
  html_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  site_admin: boolean;
  repos: Array<Repository>;
}

