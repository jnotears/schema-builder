export class ModuleRequest {
  name: string = '';
  desc: string = '';
  id?: number;
  form_config?: string;
}

export interface FormFieldRequest {
  id?: number;
  module_id: number;
  field_name: string;
  data_type: string;
}

export interface Module {
  id: number;
  name: string;
  desc: string;
  form_config: string;
}

export interface FormField {
  id: number;
  field_name: string;
  module_id: number;
  data_type: string;
}
