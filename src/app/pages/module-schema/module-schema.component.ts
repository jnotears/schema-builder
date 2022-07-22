import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { NzTableModule } from "ng-zorro-antd/table";
import { ModuleRequest, Module, FormField, FormFieldRequest } from "./models";
import { ModuleSchemaService } from "./module-schema.service";
import { ModulesComponent } from "./modules/modules.component";
import { FormBuilderComponent } from "./schema/form-builder.component";
import { combineLatest } from "rxjs";



@Component({
  standalone: true,
  selector: 'module-schema',
  templateUrl: './module-schema.component.html',
  styleUrls: ['./module-schema.component.scss'],
  imports: [
    CommonModule,
    NzTableModule,
    ModulesComponent,
    FormBuilderComponent
  ]
})
export class ModuleSchemaComponent implements OnInit {
  modules: Module[] = [];
  moduleSchemas: FormField[] = [];
  selectedModule: Module;

  constructor(
    private readonly schemaService: ModuleSchemaService
  ) {
  }

  ngOnInit() {
    this.getModules();
  }

  getModules() {
    this.schemaService.getModules().subscribe(res => this.modules = [...res as []]);
  }

  addNew(module: ModuleRequest) {
    this.schemaService.create(module).subscribe(() => this.getModules());
  }

  onSelectModule(module: Module) {
    this.selectedModule = {...module};
    this.getModuleSchemas(module.id);
  }

  getModuleSchemas(id: number) {
    this.schemaService.getModuleSchema(id).subscribe(res => this.moduleSchemas = [...res as FormField[]]);
  }

  newSchema(configs: any) {
    const form: FormFieldRequest[] = [...configs.map(s => {
      return {
        field_name: s.label,
        module_id: this.selectedModule.id,
        data_type: s.type,
      }
    })];
    const module = {
      ...this.selectedModule,
      form_config: JSON.stringify(configs)
    }
    combineLatest([
      this.schemaService.create(module),
      this.schemaService.createSchema(form)
    ]).subscribe(() => this.getModuleSchemas(this.selectedModule.id));
  }

  delete(id: number){
    this.schemaService.deleteSchemaField(id).subscribe(() => this.getModuleSchemas(this.selectedModule.id));
  }
}


