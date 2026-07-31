import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-categorias-cadastro',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './categorias-cadastro.html',
  styleUrl: './categorias-cadastro.css',
})
export class CategoriasCadastro {

  http = inject(HttpClient);

  mensagemSucesso = signal<string>('');
  mensagemErro = signal<string>('');

  formulario = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)])
  });

  cadastrar() {
    this.http.post(`${environment.apiFinancasUrl}/api/v1/categorias/criar`, this.formulario.value)
      .subscribe({
        next: () => {
          this.mensagemSucesso.set('Categoria cadastrada com sucesso!');
          this.formulario.reset();
        },
        error: (e) => {
          this.mensagemErro.set(e.error);
        }        
      });
  }
}