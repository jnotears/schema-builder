import { Component, EventEmitter, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzInputModule } from "ng-zorro-antd/input";
import { ModuleRequest } from "../models";

@Component({
  standalone: true,
  selector: 'app-modules',
  template: `
    <style>
      .item {
        width: 100%;
        margin: 1rem 0;
      }
    </style>
    <div class="item">Add more module? <a (click)="addMore = true">click here</a></div>
    <ng-container *ngIf="addMore">
      <form [formGroup]="form">
        <div class="item">
          <input nz-input nzSize="large" formControlName="name" placeholder="Name">
        </div>
        <div class="item">
          <input nz-input nzSize="large" formControlName="desc" placeholder="Description">
        </div>
      </form>
      <div class="item">
        <button style="width: 100%" nz-button nzType="primary" nzSize="large" (click)="addNew()"
                [disabled]="form.invalid">Add
        </button>
      </div>
    </ng-container>
  `,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzInputModule
  ]
})
export class ModulesComponent {
  form: FormGroup;
  @Output() onAdd: EventEmitter<ModuleRequest> = new EventEmitter<ModuleRequest>();
  addMore: boolean = false;

  constructor(
    private readonly fb: FormBuilder
  ) {
    this.form = fb.group({
      name: ['', Validators.required],
      desc: ['', Validators.required]
    })
  }

  addNew() {
    this.onAdd.emit(this.form.value);
    this.form.reset();
  }
}
