import { CommonModule } from "@angular/common";
import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzTableModule } from "ng-zorro-antd/table";
import {NzInputModule} from 'ng-zorro-antd/input';
import { NewService } from "./new.service";
import { NzSelectModule } from "ng-zorro-antd/select";

export class ModuleRequest {
  name: string = '';
  desc: string = '';
}

export interface ModuleSchemaRequest{
  module_id?: number;
  field_name: string;
  data_type: string;
  validation: string | null;
}

interface Module{
  id: number;
  name: string;
  desc: string;
}

interface ModuleSchema{
  id: number;
  field_name: string;
  module_id: number;
  data_type: string;
  validation: any;
}

@Component({
  standalone: true,
  selector: 'new-module',
  template: `
    <style>
      .item {
        width: 100%;
        margin: 1rem 0;
      }
    </style>
    <h3>Add New Module</h3>
    <form [formGroup]="form">
      <div class="item">
        <input nz-input nzSize="large" formControlName="name" placeholder="Name">
      </div>
      <div class="item">
        <input nz-input nzSize="large" formControlName="desc" placeholder="Description">
      </div>
    </form>
    <div class="item">
      <button style="width: 100%" nz-button nzType="primary" nzSize="large" (click)="addNew()" [disabled]="form.invalid">Add</button>
    </div>
  `,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzInputModule
  ]
})
export class AddNewComponent {
  form: FormGroup;
  @Output() onAdd: EventEmitter<ModuleRequest> = new EventEmitter<ModuleRequest>();

  constructor(
    private readonly fb: FormBuilder
  ) {
    this.form = fb.group({
      name: ['', Validators.required],
      desc: ['', Validators.required]
    })
  }

  addNew(){
    this.onAdd.emit(this.form.value);
    this.form.reset();
  }
}

@Component({
  standalone: true,
  selector: 'new-module-schema',
  template: `
    <style>
      .item {
        width: 100%;
        margin: 1rem 0;
      }
    </style>
    <h3>Add New Field</h3>
    <form [formGroup]="form">
      <div class="item">
        <input nz-input nzSize="large" formControlName="field_name" placeholder="Field name">
      </div>
      <div class="item">
        <nz-select [nzPlaceHolder]="'Choose data type'" formControlName="data_type" nzSize="large" style="width: 100%">
          <nz-option *ngFor="let type of dataTypes" [nzValue]="type" [nzLabel]="type"></nz-option>
        </nz-select>
      </div>
    </form>
    <div class="item">
      <button style="width: 100%" nz-button nzType="primary" nzSize="large" (click)="addNew()" [disabled]="form.invalid">Add</button>
    </div>
  `,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzInputModule,
    NzSelectModule
  ]
})
export class NewModuleSchema{
  dataTypes = ['string', 'number', 'boolean'];
  form: FormGroup;
  @Output() onAdd: EventEmitter<ModuleSchemaRequest> = new EventEmitter<ModuleSchemaRequest>();

  constructor(
    private readonly fb: FormBuilder
  ) {
    this.form = fb.group({
      field_name: ['', Validators.required],
      data_type: ['', Validators.required]
    })
  }

  addNew(){
    this.onAdd.emit(this.form.value);
    this.form.reset();
  }
}

@Component({
  standalone: true,
  selector: 'app-module',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
  imports: [
    CommonModule,
    NzTableModule,
    AddNewComponent,
    NewModuleSchema
  ]
})
export class NewComponent implements OnInit{
  modules: Module[] = [];
  moduleSchemas: ModuleSchema[] = [];
  selectedModule: Module;

  constructor(
    private readonly schemaService: NewService
  ) {
  }

  ngOnInit() {
    this.getModules();
  }

  getModules(){
    this.schemaService.getModules().subscribe(res => this.modules = [...res as []]);
  }

  addNew(module: ModuleRequest){
    // this.modules = [...this.modules, module];
    this.schemaService.create(module).subscribe(() => this.getModules());
  }

  onSelectModule(module: Module){
    this.selectedModule = {...module};
    this.getModuleSchemas(module.id);
  }

  getModuleSchemas(id: number){
    this.schemaService.getModuleSchema(id).subscribe(res => this.moduleSchemas = [...res as ModuleSchema[]]);
  }

  newSchema(moduleSchema: any){
    const request: ModuleSchemaRequest = {...moduleSchema};
    request.module_id = this.selectedModule.id;
    this.schemaService.createSchema(request).subscribe(() => this.getModuleSchemas(this.selectedModule.id));
  }
}


