import { CommonModule } from "@angular/common";
import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzTableModule } from "ng-zorro-antd/table";
import {NzInputModule} from 'ng-zorro-antd/input';
import { NewService } from "./new.service";

export class ModuleRequest {
  name: string = '';
  desc: string = '';
}

@Component({
  standalone: true,
  selector: 'add-new',
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
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
  imports: [
    CommonModule,
    NzTableModule,
    AddNewComponent,
  ]
})
export class NewComponent implements OnInit{
  modules: ModuleRequest[] = [];

  constructor(
    private readonly schemaService: NewService
  ) {
  }

  ngOnInit() {
    this.schemaService.getModules().subscribe(res => this.modules = [...res as []]);
  }

  addNew(module: ModuleRequest){
    this.modules = [...this.modules, module];
    this.schemaService.create(module).subscribe();
  }
}
