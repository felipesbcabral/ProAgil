import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Evento } from '../_models/Evento';
import { EventoService } from '../_services/evento.service';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ptBrLocale } from 'ngx-bootstrap/locale';
import { ToastrService } from 'ngx-toastr';

defineLocale('pt-br', ptBrLocale);

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {
  
  titulo = 'Eventos';

  eventosFiltrados: Evento[] = [];
  eventos:  Evento[] = [];
  modoSalvar = 'post';
  evento: Evento;
  imagemLargura = 50;
  imagemMargem = 2;
  mostrarImagem = false;
  registerForm: FormGroup;
  bodyDeletarEvento = '';
  file: File;
  fileNameToUpdate: string;
  dataEvento: string;
  dataAtual: string;

  _filtroLista: string = '';
  
  constructor(
    private fb: FormBuilder, 
    private eventoService: EventoService,
    private localeService: BsLocaleService, 
    private toastr: ToastrService
  ) { this.localeService.use('pt-br') }
  
  ngOnInit() {
    this.getEventos();
    this.validation();
  }

  editarEvento(evento: Evento, template: any) {
    this.modoSalvar = 'put';
    this.openModal(template);
    this.evento = Object.assign({}, evento);
    this.fileNameToUpdate = evento.imagemURL.toString();
    this.evento.imagemURL = ''
    this.registerForm.patchValue(this.evento)
  }
    
  novoEvento(template: any) {
    this.modoSalvar = 'post';
    this.openModal(template);
  }

  excluirEvento(evento: Evento, template: any) {
    this.openModal(template);
    this.evento = evento;
    this.bodyDeletarEvento = `Tem certeza que deseja excluir o Evento: ${evento.tema}, Código: ${evento.id}`;
  }
  
  confirmeDelete(template: any) {
    this.eventoService.deleteEvento(this.evento.id)
      .subscribe(() => {
        template.hide();
        this.getEventos();
        this.toastr.success('Deletado com Sucesso');
      }, error => {
        this.toastr.error('Erro ao tentar Deletar');
        console.log(error);
      });
  }

  openModal(template: any){
    this.registerForm.reset();
    template.show();
  }
      
  filtrarEventos(filtrarPor: string): Evento[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.eventos.filter((evento: Evento) => evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1);
  }
        
  alternarImagem(){
    this.mostrarImagem = !this.mostrarImagem;
  }
  
  validation() {
    this.registerForm = this.fb.group({
      tema: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      local: ['', Validators.required],
      dataEvento: ['', Validators.required],
      imagemURL: ['', Validators.required],
      qtdPessoas: ['', [Validators.required, Validators.max(120000)]],
      telefone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email,]]
    });
  }

  onFileChange(event: any) {
    if (event.target.files && event.target.files.length){
      this.file = event.target.files[0];
    }
  }
        
  uploadImagem() {
    if(this.modoSalvar === 'post'){
    const nomeArquivo = this.evento.imagemURL.split('\\', 3);
    this.evento.imagemURL = nomeArquivo[2];

    this.eventoService.postUpload(this.file, nomeArquivo[2])
    .subscribe(
      () => {
        this.dataAtual = new Date().getMilliseconds().toString();
        this.getEventos();
      }
    );
  } else {
    this.evento.imagemURL = this.fileNameToUpdate;
    this.eventoService.postUpload(this.file, this.fileNameToUpdate)
    .subscribe(
      () => {
        this.dataAtual = new Date().getMilliseconds().toString();
        this.getEventos();
      }
    );
  }
}
  
  salvarAlteracao(template: any) {
    if(!this.registerForm.valid) return;
      
    if (this.modoSalvar === 'post') {
      this.evento = Object.assign({}, this.registerForm.value);

      this.uploadImagem();

      this.eventoService.postEvento(this.evento)
        .subscribe(novoEvento => {
          console.log(novoEvento);
          template.hide();
          this.getEventos();
          this.toastr.success('Inserido com Sucesso');
        }, error => this.toastr.error(`Erro ao Inserir: ${error}`));
    } else {
      console.log('Evento: ', this.evento);
      this.evento = Object.assign({id: this.evento.id}, this.registerForm.value);
      console.log('Evento depois: ', this.evento);

      this.uploadImagem();

      this.eventoService.putEvento(this.evento).subscribe(
        novoEvento => {
          console.log(novoEvento);
          template.hide();
          this.getEventos();
          this.toastr.success('Editado com Sucesso');
        }, error => this.toastr.error(`Erro ao Editar: ${error}`));
    }
  }
              
  getEventos() {
    this.eventoService.getAllEvento()
      .subscribe((_eventos: Evento[]) => {
        this.eventos = _eventos;
        this.eventosFiltrados = this.eventos;
      }, error => this.toastr.error(`Erro ao tentar carregar eventos: ${error}`));
  } 

  //#region Getters/Setters
  get filtroLista(): string {
    return this._filtroLista;
  }

  set filtroLista(value: string) {
    this._filtroLista = value;
    this.eventosFiltrados = this.filtroLista ? this.filtrarEventos(this.filtroLista) : this.eventos; 
  }
  //#endregion
}