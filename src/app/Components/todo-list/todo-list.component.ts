import { identifierName } from '@angular/compiler';
import { Component,EventEmitter, Input, OnInit,Output} from '@angular/core';
import Liste from 'src/app/models/Liste';
import { todoApiService } from 'src/app/services/todo-api-service';


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  todos:Liste[]=[];

  constructor(private TodoApiService: todoApiService) { }

  async ngOnInit(){
    this.todos = await this.TodoApiService.getTodos();

  }

  async addItem(newListe: Liste){

    const todo = await this.TodoApiService.createTodos(newListe);
    this.todos.push(todo);
  }

  async updateItem(updateTodos:Liste)
  {
    await this.TodoApiService.updateTodos(updateTodos)
  }

  removeItem(id: number)
  {
    this.todos = this.todos.filter(t =>t.id !== id)
  }

  async filterList(filterOpttion: string){
    this.todos = await this.TodoApiService.getTodos();

    if(filterOpttion==="all")
    {
      return ;
    }
    else if(filterOpttion ==="done"){
      this.todos= this.todos.filter((id)=> id.done=== true);

    }
    else if(filterOpttion==="not done")
    {
      this.todos = this.todos.filter((id)=>id.done=== false);
      
    }
  }

  async sortList(sortOption: string)
  {
     this.todos = await this.TodoApiService.getTodos();

    //sort by Id
    if (sortOption === "by Id") {
      const newArray = this.todos.sort()
      
    }
    //sort by Title
    else if(sortOption ==="by Title"){
      const newArray = this.todos.sort(function(a,b)
      {
        let TitleA = a.title.toUpperCase();
        let TitleB = b.title.toUpperCase();
        
        if(TitleA < TitleB){
          return -1;
        }
        if(TitleA > TitleB){
          return 1;
        }
        return 0;
      });
    }
    //sort by Unit
    else if(sortOption= "byUnit"){

      const undefinedArray = this.todos.filter((id)=> id.unit=== undefined);

      const defineArray = this.todos.filter((id)=>id.unit !== undefined);

      defineArray.sort(function (a,b){
        let unitA = a.unit!.toUpperCase();
        let unitB = b.unit!.toUpperCase();
        if(unitA < unitB){
          return -1;
        }
        if(unitA > unitB){
          return -1;
        }
        return 0;
      });
      this.todos = defineArray.concat(undefinedArray);
    }

  }


}
