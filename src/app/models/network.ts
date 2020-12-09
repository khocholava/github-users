import {User} from './user';

export interface GithubNetworkResponse {
  incomplete_results: boolean;
  items: Array<User>;
  total_count: number;
}
