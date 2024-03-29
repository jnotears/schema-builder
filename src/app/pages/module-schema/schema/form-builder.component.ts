import { Component, ElementRef, EventEmitter, Output, ViewChild } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzSelectModule } from "ng-zorro-antd/select";
import { FormioForm, FormioModule } from "angular-formio";

@Component({
  standalone: true,
  selector: 'app-form-builder',
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
export class FormBuilderComponent {
  @Output() onAdd: EventEmitter<any> = new EventEmitter<any>();
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
      this.schemaObj = [...event?.form?.components];
      console.log('schema', this.schemaObj, '===', event);
    }
  }

  addNew(){
    this.onAdd.emit([...this.schemaObj])
  }
}
