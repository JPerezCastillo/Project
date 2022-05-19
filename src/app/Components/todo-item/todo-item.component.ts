import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Liste from 'src/app/models/Liste';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  
  @Input() todo!:Liste;

  @Output() onItemDeleteEvent = new EventEmitter<number>();
  @Output() onItemUpdateEvent = new EventEmitter<Liste>();
  
  constructor() { }

  ngOnInit(): void {
  }

  btnDelete()
  {
    console.log("Delete Clicked");
    this.onItemDeleteEvent.emit(this.todo.id);
  }

  btnDone()
  {
    this.todo.done = !this.todo.done;
    this.onItemUpdateEvent.emit(this.todo);
    console.log("Done Clicked");
  }

}
