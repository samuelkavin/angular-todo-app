import { Component, OnInit } from '@angular/core';
import { TodoStore, Todo } from '../services/store';
import { trigger, state, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  animations: [
        trigger('slideInOut', [
            transition(':enter', [
                style({ transform: 'translateX(900px)' }),
                animate('200ms ease-in', style({ transform: 'translateX(0)' }))
            ]),
            transition(':leave', [
                animate('200ms ease-in', style({ transform: 'translateX(900px)' }))
            ])
        ]),
        trigger('fade', [

            transition(':enter', [
                style({ opacity: 0, transform: 'translateY(30px)' }),
                animate(200, style({ opacity: 1, transform: 'translateY(0px)' }))
            ]),

            transition(':leave', [
                animate(200, style({ opacity: 0, transform: 'translateY(30px)' }))
            ]),

        ])
    ]
})

export class TodoComponent implements OnInit {

    newTodoText = '';
    isCompleted: Boolean;
    
	constructor(public todoStore: TodoStore) {
	    this.todoStore = todoStore;
	}

	ngOnInit() {
	}

    removeCompleted(todoComponent) {
        this.todoStore.removeCompleted();
    }

    toggleCompletion(todo: Todo, todoComponent) {
        this.todoStore.toggleCompletion(todo);
    }

    remove(todo: Todo, todoStatus){
        this.todoStore.remove(todo);
    }

    addTodo(todoStatus) {
        if (this.newTodoText.trim().length) {
            this.todoStore.add(this.newTodoText);
            this.newTodoText = '';
        }
    }

}
