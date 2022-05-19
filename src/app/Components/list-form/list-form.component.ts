import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import Liste from 'src/app/models/Liste';

// interface Unit{
//   value:string;
// }

@Component({
  selector: 'app-list-form',
  templateUrl: './list-form.component.html',
  styleUrls: ['./list-form.component.css']
})
export class ListFormComponent implements OnInit {
  @Output() onItemAddEvent = new EventEmitter<Liste>();
  @Output() onItemFilterEvent = new EventEmitter<string>();
  @Output() onItemSortEvent = new EventEmitter<string>();

  units=["Stk","Liter","Kg","gr"];

  model = new Liste("");
  selectedOption: string="";
  selectedSortOption:string=""; 

  filterOptions:string[]=["all","done","not done"];
  sortOptions:string[]=["by Id","by Title", "by Unit"];

   constructor() { }

  ngOnInit(): void {
  }

  onSave(){
    // if(this.model.title ===""){
    //   alert("Please provide a title");
    //   return;
    // }
    // this.todoApiService.createTodos(this.model);
    // this.model=new Todo("");
    this.onItemAddEvent.emit(this.model);
    this.model = new Liste("");
  }
  filterList(){
    const filterOpttion = this.selectedOption;

    if(filterOpttion==="")
    {
      // alert("Please chose an option to filter for");
      return;
    }
    this.onItemFilterEvent.emit(filterOpttion);
  }

  sortFunction(){
    const sortOption = this.selectedSortOption;

    if(sortOption===""){
      alert("Please chose an option to sort by");
      return;
    }

    this.onItemSortEvent.emit(sortOption);
  }


}
