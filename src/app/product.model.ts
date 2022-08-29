export class ProductModel {
  constructor(
    public id:number,
    public productName: string,
    public category: string,
    public date: number,
    public freshness: string,
    public price: number,
    public comment: string
  ) {}
}
