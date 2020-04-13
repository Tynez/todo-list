import { Component } from '@angular/core';
import { TodolistService } from '../../services/todolist.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor( public todoService: TodolistService ) {}

}
