import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { Todo } from './api/model';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';
import { take } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TodoListComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'todo-signal';
  public todos: Todo[] = [];

  constructor(private http: HttpClient) {
    this.http
      .get<Todo[]>(`${environment.API}/todos`)
      .pipe(take(1))
      .subscribe((data) => (this.todos = data));
  }
}
