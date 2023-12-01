import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from "@angular/cdk/drag-drop";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ITask } from "../_model/task";

@Component({
  selector: "app-todo",
  templateUrl: "./todo.component.html",
  styleUrls: ["./todo.component.scss"]
})
export class TodoComponent implements OnInit {
  todoForm: FormGroup;
  tasks: ITask[] = [];
  inprogress: ITask[] = [];
  tests: ITask[] = [];
  done: ITask[] = [];
  updateIndex: any;
  isEditEnabled: boolean = false;

  constructor(private fb: FormBuilder) {
    this.todoForm = this.fb.group({
      item: ["", Validators.required]
    });
  }

  ngOnInit(): void {}

  addTask() {
    this.tasks.push({
      description: this.todoForm.value.item,
      done: false
    });
    this.todoForm.reset();
  }

  onEdit(item: ITask, i: number) {
    this.todoForm.controls["item"].setValue(item.description);
    this.updateIndex = i;
    this.isEditEnabled = true;
  }

  updateTask() {
    this.tasks[this.updateIndex].description = this.todoForm.value.item;
    this.tasks[this.updateIndex].done = false;
    this.todoForm.reset();
    this.updateIndex = undefined;
    this.isEditEnabled = false;
  }

  deleteTask(i: number) {
    this.tasks.splice(i, 1);
  }

  deleteProgressTask(i: number) {
    this.inprogress.splice(i, 1);
  }

  deleteTestTask(i: number) {
    this.tests.splice(i, 1);
  }

  deleteDoneTask(i: number) {
    this.done.splice(i, 1);
  }

  drop(event: CdkDragDrop<ITask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
