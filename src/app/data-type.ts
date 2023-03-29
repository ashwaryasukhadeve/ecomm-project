export interface signup {
    username: string,
    email: string,
    password: string
}
export interface login {
    email: string,
    password: string
}
export interface product {
    name: string,
    price: string,
    color: string,
    category: string,
    description: string,
    image: string,
    id: number,
    quantity:undefined | number,
    productId:undefined |number
}
export interface cart{
    name: string,
    price: string,
    color: string,
    category: string,
    description: string,
    image: string,
    id: number|undefined,
    quantity:undefined | number,
    userId:number,
    productId:number
}
export interface priceSummary{
    price:number,
    discount:number,
    tax:number,
    delivery:number,
    total:number
  }
  export interface order{
    email:string,
    address:string,
    contact:string,
    totalprice:number,
    userId:number,
    id:number|undefined
  }