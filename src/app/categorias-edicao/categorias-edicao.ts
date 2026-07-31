import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { environment } from '../../environments/environment';

interface CategoriaResponse {
  id: string;
  nome: string;
}

@Component({
  selector: 'app-categorias-edicao',
  imports: [ReactiveFormsModule],
  templateUrl: './categorias-edicao.html',
  styleUrl: './categorias-edicao.css'
})
export class CategoriasEdicao implements OnInit {

  private readonly http = inject(HttpClient);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);

  private categoriaId = '';

  carregando = signal(false);
  salvando = signal(false);
  mensagemSucesso = signal('');
  mensagemErro = signal('');

  formulario = new FormGroup({
    nome: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ]
    })
  });

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    if (!id) {
      this.mensagemErro.set(
        'Não foi possível identificar a categoria que será alterada.'
      );
      return;
    }

    this.categoriaId = id;
    this.carregarCategoria();
  }

  carregarCategoria(): void {
    this.carregando.set(true);
    this.mensagemErro.set('');

    this.http
      .get<CategoriaResponse>(
        `${environment.apiFinancasUrl}/api/v1/categorias/obter/${this.categoriaId}`
      )
      .subscribe({
        next: (categoria) => {
          this.formulario.patchValue({
            nome: categoria.nome
          });

          this.carregando.set(false);
        },
        error: (error: HttpErrorResponse) => {
          this.carregando.set(false);
          this.mensagemErro.set(
            this.obterMensagemErro(
              error,
              'Não foi possível carregar a categoria.'
            )
          );
        }
      });
  }

  alterar(): void {
    this.mensagemSucesso.set('');
    this.mensagemErro.set('');

    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    this.salvando.set(true);

    this.http
      .put<CategoriaResponse>(
        `${environment.apiFinancasUrl}/api/v1/categorias/alterar/${this.categoriaId}`,
        this.formulario.getRawValue()
      )
      .subscribe({
        next: (categoria) => {
          this.formulario.patchValue({
            nome: categoria.nome
          });

          this.salvando.set(false);
          this.mensagemSucesso.set(
            'Categoria alterada com sucesso!'
          );
        },
        error: (error: HttpErrorResponse) => {
          this.salvando.set(false);
          this.mensagemErro.set(
            this.obterMensagemErro(
              error,
              'Não foi possível alterar a categoria.'
            )
          );
        }
      });
  }

  voltar(): void {
    this.router.navigate(['/app/categorias-consulta']);
  }

  private obterMensagemErro(
    error: HttpErrorResponse,
    mensagemPadrao: string
  ): string {
    return error.error?.detail
      || error.error?.message
      || (typeof error.error === 'string' ? error.error : '')
      || mensagemPadrao;
  }
}
