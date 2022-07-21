import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { NzTableModule } from "ng-zorro-antd/table";
import { ModuleRequest, ModuleSchemaRequest, Module, ModuleSchema } from "./models";
import { ModuleSchemaService } from "./module-schema.service";
import { ModulesComponent } from "./modules/modules.component";
import { SchemaComponent } from "./schema/schema.component";



@Component({
  standalone: true,
  selector: 'module-schema',
  templateUrl: './module-schema.component.html',
  styleUrls: ['./module-schema.component.scss'],
  imports: [
    CommonModule,
    NzTableModule,
    ModulesComponent,
    SchemaComponent
  ]
})
export class ModuleSchemaComponent implements OnInit {
  modules: Module[] = [];
  moduleSchemas: ModuleSchema[] = [];
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
    this.schemaService.getModuleSchema(id).subscribe(res => this.moduleSchemas = [...res as ModuleSchema[]]);
  }

  newSchema(schema: any) {
    const request: ModuleSchemaRequest[] = [...schema.map(s => {
      return {
        field_name: s.id,
        module_id: this.selectedModule.id
      }
    })];
    this.schemaService.createSchema(request).subscribe(() => this.getModuleSchemas(this.selectedModule.id));
  }

  delete(id: number){
    this.schemaService.deleteSchemaField(id).subscribe(() => this.getModuleSchemas(this.selectedModule.id));
  }
}


