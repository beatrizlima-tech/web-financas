import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-movimentacoes-cadastro',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './movimentacoes-cadastro.html',
  styleUrl: './movimentacoes-cadastro.css',
})
export class MovimentacoesCadastro implements OnInit {

  http = inject(HttpClient);

  categorias = signal<any[]>([]);

  mensagemSucesso = signal<string>('');
  mensagemErro = signal<string>('');
  carregandoCategorias = signal<boolean>(false);
  enviando = signal<boolean>(false);

  formulario = new FormGroup({
    nome: new FormControl('', [
      Validators.required
    ]),

    data: new FormControl('', [
      Validators.required
    ]),

    valor: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(0.01)
    ]),

    tipo: new FormControl('', [
      Validators.required
    ]),

    categoriaId: new FormControl('', [
      Validators.required
    ])
  });

  ngOnInit(): void {
    this.consultarCategorias();
  }

  consultarCategorias(): void {

    this.carregandoCategorias.set(true);
    this.mensagemErro.set('');

    this.http
      .get<any[]>(`${environment.apiFinancasUrl}/api/v1/categorias/consultar`)
      .subscribe({
        next: (dados) => {
          this.categorias.set(dados);
          this.carregandoCategorias.set(false);
        },
        error: (e) => {
          this.categorias.set([]);
          this.carregandoCategorias.set(false);

          this.mensagemErro.set(
            e.error?.message ||
            e.error ||
            'Não foi possível consultar as categorias.'
          );
        }
      });
  }

  cadastrar(): void {

    this.formulario.markAllAsTouched();

    if (this.formulario.invalid) {
      return;
    }

    this.enviando.set(true);
    this.mensagemSucesso.set('');
    this.mensagemErro.set('');

    this.http
      .post(`${environment.apiFinancasUrl}/api/v1/movimentacoes/criar`,this.formulario.value)
      .subscribe({
        next: () => {
          this.mensagemSucesso.set(
            'Movimentação cadastrada com sucesso!'
          );

          this.formulario.reset();
          this.enviando.set(false);
        },
        error: (e) => {
          this.enviando.set(false);

          this.mensagemErro.set(
            e.error?.message ||
            e.error ||
            'Não foi possível cadastrar a movimentação.'
          );
        }
      });
  }
}
