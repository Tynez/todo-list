import { Injectable } from '@angular/core';
import { Lista } from '../models/lista.model';

@Injectable({
  providedIn: 'root'
})
export class TodolistService {

  lists: Lista[] = [];

  constructor() {

    this.loadStorage();

  }

  createList( title: string) {
    const newList = new Lista( title );
    this.lists.push( newList );
    this.saveStorage();

    return newList.id;
  }

  getList( id: string | number  ) {
    id = Number(id);

    return this.lists.find( listData => listData.id === id );
  }

  deleteList( list: Lista ) {
    this.lists = this.lists.filter( listaData => listaData.id !== list.id );
    this.saveStorage();
  }

  saveStorage() {
    localStorage.setItem( 'data', JSON.stringify( this.lists ) );
  }

  loadStorage() {

    this.lists = localStorage.getItem('data') ?
                 JSON.parse( localStorage.getItem('data') ) :
                 [];

  }
}
