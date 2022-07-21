import { Component, ElementRef, EventEmitter, Output, ViewChild } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzSelectModule } from "ng-zorro-antd/select";
import { FormioForm, FormioModule } from "angular-formio";
import { ModuleSchemaRequest } from "../models";

@Component({
  standalone: true,
  selector: 'app-schema',
  template: `
    <style>
      .item {
        width: 100%;
        margin: 1rem 0;
      }
    </style>
    <div class="item">Add new field? <a (click)="addMore = true">click here</a></div>
    <ng-container *ngIf="addMore">
      <form-builder [form]="form" (change)="onChange($event)"></form-builder>
      <div class="well jsonviewer">
        <pre id="json"><code class="language-json" #json></code></pre>
      </div>
    </ng-container>
  `,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzInputModule,
    NzSelectModule,
    FormioModule
  ]
})
export class SchemaComponent {
  @Output() onAdd: EventEmitter<ModuleSchemaRequest> = new EventEmitter<ModuleSchemaRequest>();
  @ViewChild('json') jsonElement?: ElementRef<any>;
  addMore: boolean = false;
  public form: FormioForm = {
    components: []
  };

  onChange(event?: {}) {
    if(event){
      this.jsonElement.nativeElement.innerHTML = '';
      this.jsonElement.nativeElement.appendChild(document.createTextNode(JSON.stringify(event['form'], null, 4)));
    }
  }
}
