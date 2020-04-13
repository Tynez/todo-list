import { Component, OnInit } from '@angular/core';
import { TodolistService } from '../../services/todolist.service';
import { ActivatedRoute } from '@angular/router';
import { Lista } from '../../models/lista.model';
import { ListaItem } from '../../models/lista-item.model';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  list: Lista;
  itemName: string;

  constructor( private todoService: TodolistService,
               private router: ActivatedRoute,
               private toastCtrl: ToastController ) {

    const listId = this.router.snapshot.paramMap.get('listId');
    this.list = this.todoService.getList( listId );

    // console.log(this.list);
  }

  ngOnInit() {
  }

  createList() {
    if (this.itemName.length === 0) {
      return;
    }
    const newItem = new ListaItem(this.itemName);
    this.list.items.push( newItem );
    this.itemName = '';
    this.todoService.saveStorage();
  }

  deleteList( idx: number ) {
    this.list.items.splice( idx, 1 );
    this.todoService.saveStorage();
    this.alertMsg('Tarea eliminada correctamente.', 'sucess');

  }

  updateCheck( item: ListaItem) {
    const pending = this.list.items
                         .filter( itemData => !itemData.completed )
                         .length;
    if (pending === 0) {
      this.list.endDate = new Date();
      this.list.completed = true;
    } else {
      this.list.endDate = null;
      this.list.completed = false;
    }
    this.todoService.saveStorage();
  }

  async alertMsg( msg: string, color: string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      position: 'bottom',
      color: 'success',
      duration: 1000
    });
    toast.present();
  }

}
