import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ModuleRequest } from "./new.component";

@Injectable()
export class NewService{
  apikey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZrcWpub2FvbXF2b3pjY3l3bXNxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTgwNzU1OTAsImV4cCI6MTk3MzY1MTU5MH0.chuk9tNSSNNAIlMv5DN2Dk3n8QZZuEkisQLMT6s5GIA`;
  constructor(
    private readonly http: HttpClient
  ) {
  }

  getModules(){
    const opts = new HttpHeaders().set('apikey', this.apikey);
    return this.http.get(`https://fkqjnoaomqvozccywmsq.supabase.co/rest/v1/module?select=*`, {headers: opts});
  }

  create(module: ModuleRequest){
    const opts = new HttpHeaders().set('apikey', this.apikey);
    return this.http.post(`https://fkqjnoaomqvozccywmsq.supabase.co/rest/v1/module`, module, {headers: opts});
  }
}
