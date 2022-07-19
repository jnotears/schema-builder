import { Component } from "@angular/core";

export class ModuleRequest{
  name: string = '';
  desc: string = '';
}

@Component({
  standalone: true,
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent{}
