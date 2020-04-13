import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { TodolistService } from '../../services/todolist.service';
import { Router } from '@angular/router';
import { AlertController, ToastController, IonList } from '@ionic/angular';
import { Lista } from 'src/app/models/lista.model';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss'],
})
export class ListsComponent implements OnInit {

  @ViewChild( IonList ) lista: IonList;
  @Input() terminada = true;

  constructor( public todoService: TodolistService,
               private router: Router,
               private alertCtrl: AlertController,
               private toastCtrl: ToastController) {

  }

  ngOnInit() {
  }

  readList( list: Lista ) {

    const tabSelected = this.terminada ? 'tab2' : 'tab1';

    this.router.navigateByUrl(`/tabs/${ tabSelected }/add/${ list.id }`);

  }

  async updateList( list: Lista ) {
    const alert = await this.alertCtrl.create({
      header: 'Editar lista',
      // subHeader: 'Subtitle',
      // message: 'This is an alert message.',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          value: list.title,
          placeholder: 'Título de la lista'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            this.lista.closeSlidingItems();
          }
        },
        {
          text: 'Actualizar',
          handler: ( data ) => {
            console.log(data);
            if ( data.titulo.length === 0) {
              return;
            }
            list.title = data.titulo;
            this.todoService.saveStorage();
            this.lista.closeSlidingItems();
            this.alertMsg('Actualizado correctamente.', 'success');
          }
        }
      ]
    });

    await alert.present();
    // this.router.navigateByUrl('/tabs/tab1/add');
  }

  deleteList( list: Lista ) {
    this.todoService.deleteList( list );
    this.alertMsg('Lista eliminada correctamente.', 'sucess');
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
