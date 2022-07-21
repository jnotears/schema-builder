export class ModuleRequest {
  name: string = '';
  desc: string = '';
}

export interface ModuleSchemaRequest {
  module_id?: number;
  field_name: string;
  data_type: string;
  validation: string | null;
}

export interface Module {
  id: number;
  name: string;
  desc: string;
}

export interface ModuleSchema {
  id: number;
  field_name: string;
  module_id: number;
  data_type: string;
  validation: any;
}
