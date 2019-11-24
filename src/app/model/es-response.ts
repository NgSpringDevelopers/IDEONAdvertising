export class EsResponse {
  status: number;
  body: any;
  message: string;

  constructor(status: number, body: any, message: string) {
    this.status = status;
    this.body = body;
    this.message = message;
  }
}
