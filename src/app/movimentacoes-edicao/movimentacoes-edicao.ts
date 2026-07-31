import {
  HttpClient,
  HttpErrorResponse
} from '@angular/common/http';
import {
  Component,
  inject,
  OnInit,
  signal
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import {
  ActivatedRoute,
  Router
} from '@angular/router';

import { environment } from '../../environments/environment';

interface CategoriaResponse {
  id: string;
  nome: string;
}

interface MovimentacaoResponse {
  id: string;
  nome: string;
  data: string;
  valor: number;
  tipo: string;
  categoria: CategoriaResponse;
}

@Component({
  selector: 'app-movimentacoes-edicao',
  imports: [ReactiveFormsModule],
  templateUrl: './movimentacoes-edicao.html',
  styleUrl: './movimentacoes-edicao.css'
})
export class MovimentacoesEdicao implements OnInit {

  private readonly http = inject(HttpClient);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);

  private movimentacaoId = '';

  categorias = signal<CategoriaResponse[]>([]);

  carregando = signal(false);
  carregandoCategorias = signal(false);
  salvando = signal(false);

  mensagemSucesso = signal('');
  mensagemErro = signal('');

  formulario = new FormGroup({
    nome: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(150)
      ]
    }),

    data: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    }),

    valor: new FormControl<number | null>(null, {
      validators: [
        Validators.required,
        Validators.min(0.01)
      ]
    }),

    tipo: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    }),

    categoriaId: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    })
  });

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    if (!id) {
      this.mensagemErro.set(
        'Não foi possível identificar a movimentação que será alterada.'
      );
      return;
    }

    this.movimentacaoId = id;

    this.carregarCategorias();
    this.carregarMovimentacao();
  }

  carregarCategorias(): void {
    this.carregandoCategorias.set(true);

    this.http
      .get<CategoriaResponse[]>(
        `${environment.apiFinancasUrl}/api/v1/categorias/consultar`
      )
      .subscribe({
        next: (categorias) => {
          this.categorias.set(categorias);
          this.carregandoCategorias.set(false);
        },
        error: (error: HttpErrorResponse) => {
          this.categorias.set([]);
          this.carregandoCategorias.set(false);

          this.mensagemErro.set(
            this.obterMensagemErro(
              error,
              'Não foi possível carregar as categorias.'
            )
          );
        }
      });
  }

  carregarMovimentacao(): void {
    this.carregando.set(true);
    this.mensagemErro.set('');

    this.http
      .get<MovimentacaoResponse>(
        `${environment.apiFinancasUrl}/api/v1/movimentacoes/obter/${this.movimentacaoId}`
      )
      .subscribe({
        next: (movimentacao) => {
          this.formulario.patchValue({
            nome: movimentacao.nome,
            data: movimentacao.data,
            valor: movimentacao.valor,
            tipo: movimentacao.tipo,
            categoriaId: movimentacao.categoria.id
          });

          this.carregando.set(false);
        },
        error: (error: HttpErrorResponse) => {
          this.carregando.set(false);

          this.mensagemErro.set(
            this.obterMensagemErro(
              error,
              'Não foi possível carregar a movimentação.'
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
      .put<MovimentacaoResponse>(
        `${environment.apiFinancasUrl}/api/v1/movimentacoes/alterar/${this.movimentacaoId}`,
        this.formulario.getRawValue()
      )
      .subscribe({
        next: (movimentacao) => {
          this.formulario.patchValue({
            nome: movimentacao.nome,
            data: movimentacao.data,
            valor: movimentacao.valor,
            tipo: movimentacao.tipo,
            categoriaId: movimentacao.categoria.id
          });

          this.salvando.set(false);
          this.mensagemSucesso.set(
            'Movimentação alterada com sucesso!'
          );
        },
        error: (error: HttpErrorResponse) => {
          this.salvando.set(false);

          this.mensagemErro.set(
            this.obterMensagemErro(
              error,
              'Não foi possível alterar a movimentação.'
            )
          );
        }
      });
  }

  voltar(): void {
    this.router.navigate(['/app/movimentacoes-consulta']);
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