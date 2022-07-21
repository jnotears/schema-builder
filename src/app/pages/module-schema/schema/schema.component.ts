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
      <div class="item">
        <button style="width: 100%" nz-button nzType="primary" nzSize="large" (click)="addNew()"
                [disabled]="disabled">Add
        </button>
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
  @Output() onAdd: EventEmitter<any> = new EventEmitter<ModuleSchemaRequest>();
  @ViewChild('json') jsonElement?: ElementRef<any>;
  addMore: boolean = false;
  schemaObj: any = [];
  disabled: boolean = true;
  public form: FormioForm = {
    components: []
  };

  onChange(event?: any) {
    if(event){
      this.jsonElement.nativeElement.innerHTML = '';
      this.jsonElement.nativeElement.appendChild(document.createTextNode(JSON.stringify(event['form'], null, 4)));
      this.disabled = !event?.parent?.components?.length;
      if(event?.type === "addComponent"){
        if(this.schemaObj.length){
          this.schemaObj?.splice(event?.index, 0, event?.component);
        }else {
          this.schemaObj = [...this.schemaObj, event?.component];
        }
        // this.schemaObj?.splice(event?.index, 0, event?.conponent);
      }else if(event?.type === "deleteComponent"){
        this.schemaObj?.splice(event?.index, 1);
      }
      console.log('schema', this.schemaObj, '===', event);
    }
  }

  addNew(){
    this.onAdd.emit([...this.schemaObj])
  }
}
