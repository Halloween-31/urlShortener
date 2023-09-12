import { Component, EventEmitter, Input, Output } from '@angular/core';


@Component({
  selector: 'new-Url',
  templateUrl: './newUrl.component.html',
  styleUrls: ['./newUrl.component.css']
})
export class NewUrlComponent {
  constructor() { }
  @Input() public show: boolean;
  public newUrl: string;

  @Output() onSend = new EventEmitter<string>();
  Send() {
    if (this.newUrl != "") {
      this.onSend.emit(this.newUrl);
      this.newUrl = "";
    }
  }
}
