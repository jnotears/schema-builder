import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class NewService{
  constructor(
    private readonly http: HttpClient
  ) {
  }
}
