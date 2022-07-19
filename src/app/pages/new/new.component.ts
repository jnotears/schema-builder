import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzTableModule } from "ng-zorro-antd/table";
import {NzInputModule} from 'ng-zorro-antd/input';

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

  constructor(
    private readonly fb: FormBuilder
  ) {
    this.form = fb.group({
      name: ['', Validators.required],
      desc: ['', Validators.required]
    })
  }

  addNew(){

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
export class NewComponent {
  modules: any[] = [];
}
