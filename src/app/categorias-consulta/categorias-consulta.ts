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
import { RouterLink } from '@angular/router';

import { environment } from '../../environments/environment';

interface CategoriaResponse {
  id: string;
  nome: string;
}

@Component({
  selector: 'app-categorias-consulta',
  imports: [RouterLink],
  templateUrl: './categorias-consulta.html',
  styleUrl: './categorias-consulta.css'
})
export class CategoriasConsulta implements OnInit {

  private readonly http = inject(HttpClient);

  categorias = signal<CategoriaResponse[]>([]);

  categoriaParaExcluir = signal<CategoriaResponse | null>(null);

  mensagemSucesso = signal('');
  mensagemErro = signal('');

  carregando = signal(false);
  excluindo = signal(false);

  ngOnInit(): void {
    this.consultarCategorias();
  }

  consultarCategorias(): void {
    this.carregando.set(true);
    this.mensagemErro.set('');

    this.http
      .get<CategoriaResponse[]>(
        `${environment.apiFinancasUrl}/api/v1/categorias/consultar`
      )
      .subscribe({
        next: (categorias) => {
          this.categorias.set(categorias);
          this.carregando.set(false);
        },
        error: (error: HttpErrorResponse) => {
          this.categorias.set([]);
          this.carregando.set(false);

          this.mensagemErro.set(
            this.obterMensagemErro(
              error,
              'Não foi possível consultar as categorias.'
            )
          );
        }
      });
  }

  solicitarExclusao(categoria: CategoriaResponse): void {
    this.mensagemSucesso.set('');
    this.mensagemErro.set('');
    this.categoriaParaExcluir.set(categoria);
  }

  cancelarExclusao(): void {
    if (this.excluindo()) {
      return;
    }

    this.categoriaParaExcluir.set(null);
  }

  confirmarExclusao(): void {
    const categoria = this.categoriaParaExcluir();

    if (!categoria) {
      return;
    }

    this.excluindo.set(true);
    this.mensagemSucesso.set('');
    this.mensagemErro.set('');

    this.http
      .delete(
        `${environment.apiFinancasUrl}/api/v1/categorias/excluir/${categoria.id}`,
        {
          responseType: 'text'
        }
      )
      .subscribe({
        next: () => {
          this.categorias.update((categorias) =>
            categorias.filter(
              (item) => item.id !== categoria.id
            )
          );

          this.excluindo.set(false);
          this.categoriaParaExcluir.set(null);

          this.mensagemSucesso.set(
            `Categoria "${categoria.nome}" excluída com sucesso!`
          );
        },
        error: (error: HttpErrorResponse) => {
          this.excluindo.set(false);
          this.categoriaParaExcluir.set(null);

          this.mensagemErro.set(
            this.obterMensagemErro(
              error,
              'Não foi possível excluir a categoria.'
            )
          );
        }
      });
  }

  private obterMensagemErro(
  error: HttpErrorResponse,
  mensagemPadrao: string
): string {
  if (typeof error.error === 'string') {
    try {
      const problema = JSON.parse(error.error) as {
        detail?: string;
        message?: string;
      };

      return problema.detail
        || problema.message
        || mensagemPadrao;
    } catch {
      return error.error || mensagemPadrao;
    }
  }

  return error.error?.detail
    || error.error?.message
    || mensagemPadrao;
  }

}