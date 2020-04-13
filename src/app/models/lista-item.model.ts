export class ListaItem {

    desc: string;
    completed: boolean;

    constructor( desc: string ) {
        this.desc = desc;
        this.completed = false;
    }
}
