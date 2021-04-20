import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { TodosService } from "../../services/todos.service";
import { FilterEnum } from "../../types/filter.enum";
import { HttpClient } from "@angular/common/http";

@Component({
    selector: "app-todos-footer",
    templateUrl: "./footer.component.html",
})
export class FooterComponent {
    data!: string;
    noTodosClass$: Observable<boolean>;
    activeCount$: Observable<number>;
    itemsLeftText$: Observable<string>;
    filter$: Observable<FilterEnum>;
    filterEnum = FilterEnum;

    constructor(private todosService: TodosService, private http: HttpClient) {
        this.activeCount$ = this.todosService.todos$.pipe(
            map((todos => todos.filter(todo => !todo.isCompleted).length))
        )
        this.itemsLeftText$ = this.activeCount$.pipe(map((activeCount) => `item${activeCount !== 1 ? 's' : ''} left`))
        this.noTodosClass$ = this.todosService.todos$.pipe(map(todos => todos.length === 0));
        this.filter$ = this.todosService.filter$
    }

    sendRequest(event: Event,): void {
        event.preventDefault();
        this.http.get<any>("/").subscribe(data => { })
    }

    changeFilter(event: Event, filterName: FilterEnum): void {
        event.preventDefault();
        this.todosService.changeFilter(filterName);
    }
}