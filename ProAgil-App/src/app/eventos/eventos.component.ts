import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Evento } from '../_models/Evento';
import { EventoService } from '../_services/evento.service';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ptBrLocale } from 'ngx-bootstrap/locale';
defineLocale('pt-br', ptBrLocale);


@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {
  
  eventosFiltrados: Evento[] = [];
  eventos:  Evento[] = [];
  modoSalvar = 'post';
  evento: Evento | any;
  imagemLargura = 50;
  imagemMargem = 2;
  mostrarImagem = false;
  registerForm: FormGroup | any;
  bodyDeletarEvento = '';

  _filtroLista: string = '';
  
  constructor(
    private fb: FormBuilder
    , private eventoService: EventoService
    , private modalService: BsModalService
    , private localeService: BsLocaleService
    ) {
      this.localeService.use('pt-br')
    }
    
    ngOnInit() {
      this.getEventos();
      this.validation();
    }
    
    get filtroLista(): string {
      return this._filtroLista;
    }
    set filtroLista(value: string) {
      this._filtroLista = value;
      this.eventosFiltrados = this.filtroLista ? this.filtrarEventos(this.filtroLista) : this.eventos; 
    }
    
    editarEvento(evento: Evento, template: any) {
      this.modoSalvar = 'put';
      this.openModal(template);
      this.evento = evento;
      this.registerForm.patchValue(evento)
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
      this.eventoService.deleteEvento(this.evento.id).subscribe(
        () => {
            template.hide();
            this.getEventos();
          }, error => {
            console.log(error);
          }
      );
    }
    
    
    openModal(template: any){
      this.registerForm.reset();
      template.show();
    }
    
    filtrarEventos(filtrarPor: string): Evento[] {
      filtrarPor = filtrarPor.toLocaleLowerCase();
      return this.eventos.filter(
        (evento: any) => evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1
        );
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
      
      salvarAlteracao(template: any){
        if(this.registerForm.valid){
          if (this.modoSalvar === 'post') {
            this.evento = Object.assign({}, this.registerForm.value);
            this.eventoService.postEvento(this.evento).subscribe(
              novoEvento => {
                console.log(novoEvento);
                template.hide();
                this.getEventos();
              }, error => {
                console.log(error);
              }
              );
            } else {
              this.evento = Object.assign({id: this.evento.id}, this.registerForm.value);
              this.eventoService.putEvento(this.evento).subscribe(
                novoEvento => {
                  console.log(novoEvento);
                  template.hide();
                  this.getEventos();
                }, error => {
                  console.log(error);
                }
                );
              }
              this.evento = Object.assign({}, this.registerForm.value);
              this.eventoService.postEvento(this.evento).subscribe(
                novoEvento => {
                  console.log(novoEvento);
                  template.hide();
                  this.getEventos();
                }, error => {
                  console.log(error);
                }
                );
              }
            }
            
            
            getEventos() {
              this.eventoService.getAllEvento().subscribe(
                (_eventos: Evento[]) => {
                  this.eventos = _eventos;
                  this.eventosFiltrados = this.eventos;
                  console.log(this.eventos)
                }, error => {
                  console.log(error);
                });
              }
            }
            