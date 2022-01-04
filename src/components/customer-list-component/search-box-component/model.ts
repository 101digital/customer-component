export class SearchData {
  constructor(readonly key: string) {}

  static empty(): SearchData {
    return new SearchData('');
  }

  static default(value: string): SearchData {
    return new SearchData(value ?? '');
  }
}
