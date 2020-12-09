export function setSession(name: string, data: any): void {
  localStorage.setItem(name, data);
}

export function retrieveSessionData(name: string): any {
  return JSON.parse(localStorage.getItem(name) as string);
}
