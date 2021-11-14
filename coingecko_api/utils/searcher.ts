export default class Searcher {
  public constructor(toSearch: string[], searchTerm: string) {
    this.toSearch = toSearch;
    this.searchTerm = searchTerm;
  }

  public search = (): string[] => {
    const regExp: RegExp = this.getRegExp();

    return this.toSearch.filter((value, index, array) => regExp.test(value));
  };

  private getRegExp(): RegExp {
    const splitSearchTerms: string[] = this.searchTerm.split(" ");

    let regExpString: string = `${this.searchTerm}`;
    for(let i: number = 0; i < splitSearchTerms.length; i++)
      regExpString += `|${splitSearchTerms[i]}`;

    return new RegExp(regExpString);
  }



  private readonly toSearch: string[];
  private readonly searchTerm: string;  
}