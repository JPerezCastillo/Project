import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Liste from '../models/Liste';
import { TodoListComponent } from '../Components/todo-list/todo-list.component';
import { TodoItemComponent } from '../Components/todo-item/todo-item.component';

@Injectable({
    providedIn:'root'
})

export class todoApiService
{
    apiUrl = "http://localhost:3000/todos"

    constructor(private http:HttpClient){}

    async getTodos(): Promise<Liste[]> {

        const response = await fetch(this.apiUrl);
        const data = await response.json();
        return data;
    }

    async createTodos(todos:Liste):Promise<Liste>{
        const response = await fetch (`${this.apiUrl}`,{
            method:"Post",
            headers:{
                'Content-type':'application/json'
            },
            body :JSON.stringify(todos)
        });
        
        const data = await response.json();
        return data;
    }

    async updateTodos(todos:Liste):Promise<Liste|void>{
        const response = await fetch(`${this.apiUrl}/${todos.id}`,{
            method:"Put",
            headers:{
                'Content-type':'application/json'
            },
            body: JSON.stringify(todos)
        });

        const data = await response.json();
        return data;
    }

    async delete(id:number):Promise<void>
    {
        const response = await fetch(`${this.apiUrl}/${id}`,{

            method:"Delete"

        });
    }

}
