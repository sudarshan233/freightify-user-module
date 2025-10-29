import { Component } from '@angular/core';
import { LucideAngularModule, ArrowDownToLine, Plus } from 'lucide-angular';

@Component({
  selector: 'app-input-buttons',
  imports: [LucideAngularModule],
  templateUrl: './input-buttons.html',
  styleUrl: './input-buttons.css'
})
export class InputButtons {
  readonly ArrowDownToLine = ArrowDownToLine;
  readonly PlusIcon = Plus;
}
