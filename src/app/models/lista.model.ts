import { ListaItem } from './lista-item.model';
export class Lista {

    id: number;
    title: string;
    creationDate: Date;
    endDate: Date;
    completed: boolean;
    items: ListaItem[];

    constructor( title: string ) {

        this.title = title;
        this.creationDate = new Date();
        this.completed = false;
        this.items = [];

        // Asignación temporal de id hasta establecer base de datos.
        this.id = new Date().getTime();

    }
}
