export interface GithubNetworkResponse<T> {
  incomplete_results: boolean;
  items: Array<T>;
  total_count: number;
}
