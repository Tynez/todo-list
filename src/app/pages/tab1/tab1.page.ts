import { Component } from '@angular/core';
import { TodolistService } from '../../services/todolist.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Lista } from 'src/app/models/lista.model';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor( public todoService: TodolistService,
               private router: Router,
               private alertCtrl: AlertController
    ) {

  }
  async addList() {
    const alert = await this.alertCtrl.create({
      header: 'Nueva lista',
      // subHeader: 'Subtitle',
      // message: 'This is an alert message.',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          placeholder: 'Título de la lista'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cerrado');
          }
        },
        {
          text: 'Crear',
          handler: ( data ) => {
            console.log(data);
            if ( data.titulo.length === 0) {
              return;
            }
            const listID = this.todoService.createList( data.titulo );
            this.router.navigateByUrl(`/tabs/tab1/add/${ listID }`);

          }
        }
      ]
    });

    await alert.present();
    // this.router.navigateByUrl('/tabs/tab1/add');
  }
}
