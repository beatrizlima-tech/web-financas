import { CommonModule } from '@angular/common';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { environment } from '../../environments/environment';
import { RouterLink } from '@angular/router';

interface MovimentacaoConsultaResponse {
  id: string;
  nome: string;
  data: string;
  valor: number;
  tipo: string;

  categoria: {
    id: string;
    nome: string;
  };
}

@Component({
  selector: 'app-movimentacoes-consulta',
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './movimentacoes-consulta.html',
  styleUrl: './movimentacoes-consulta.css',
})
export class MovimentacoesConsulta implements OnInit {

  private readonly http = inject(HttpClient);

  movimentacoes = signal<MovimentacaoConsultaResponse[]>([]);

  movimentacaoParaExcluir =
    signal<MovimentacaoConsultaResponse | null>(null);

  mensagemErro = signal<string>('');
  mensagemSucesso = signal<string>('');

  carregando = signal<boolean>(false);
  excluindo = signal<boolean>(false);

  dataInicio = signal<string>('');
  dataFim = signal<string>('');

  pageIndex = signal<number>(0);
  pageSize = signal<number>(25);

  totalElements = signal<number>(0);
  totalPages = signal<number>(0);
  numberOfElements = signal<number>(0);

  primeiraPagina = signal<boolean>(true);
  ultimaPagina = signal<boolean>(true);

  ngOnInit(): void {
    this.definirPeriodoAtual();
    this.consultarMovimentacoes();
  }

  definirPeriodoAtual(): void {

    const hoje = new Date();

    const primeiroDia = new Date(
      hoje.getFullYear(),
      hoje.getMonth(),
      1
    );

    const ultimoDia = new Date(
      hoje.getFullYear(),
      hoje.getMonth() + 1,
      0
    );

    this.dataInicio.set(this.formatarData(primeiroDia));
    this.dataFim.set(this.formatarData(ultimoDia));
  }

  formatarData(data: Date): string {

    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const dia = String(data.getDate()).padStart(2, '0');

    return `${ano}-${mes}-${dia}`;
  }

  consultarMovimentacoes(pagina: number = 0): void {

    if (!this.dataInicio() || !this.dataFim()) {
      this.mensagemErro.set(
        'Informe a data inicial e a data final.'
      );
      return;
    }

    if (this.dataInicio() > this.dataFim()) {
      this.mensagemErro.set(
        'A data inicial não pode ser maior que a data final.'
      );
      return;
    }

    this.carregando.set(true);
    this.mensagemErro.set('');

    const parametros = new HttpParams()
      .set('dataInicio', this.dataInicio())
      .set('dataFim', this.dataFim())
      .set('pageIndex', pagina.toString())
      .set('pageSize', this.pageSize().toString());

    this.http
      .get<any>(
        `${environment.apiFinancasUrl}/api/v1/movimentacoes/consultar`,
        {
          params: parametros
        }
      )
      .subscribe({
        next: (dados) => {

          this.movimentacoes.set(dados.content || []);

          this.pageIndex.set(dados.number);
          this.pageSize.set(dados.size);

          this.totalElements.set(dados.totalElements);
          this.totalPages.set(dados.totalPages);
          this.numberOfElements.set(dados.numberOfElements);

          this.primeiraPagina.set(dados.first);
          this.ultimaPagina.set(dados.last);

          this.carregando.set(false);
        },
        error: (e) => {

          this.movimentacoes.set([]);

          this.pageIndex.set(0);
          this.totalElements.set(0);
          this.totalPages.set(0);
          this.numberOfElements.set(0);

          this.primeiraPagina.set(true);
          this.ultimaPagina.set(true);

          this.carregando.set(false);

          this.mensagemErro.set(
            e.error?.message ||
            e.error ||
            'Não foi possível consultar as movimentações.'
          );
        }
      });
  }

  pesquisar(): void {
    this.consultarMovimentacoes(0);
  }

  atualizarConsulta(): void {
    this.consultarMovimentacoes(this.pageIndex());
  }

  paginaAnterior(): void {

    if (!this.primeiraPagina()) {
      this.consultarMovimentacoes(
        this.pageIndex() - 1
      );
    }
  }

  proximaPagina(): void {

    if (!this.ultimaPagina()) {
      this.consultarMovimentacoes(
        this.pageIndex() + 1
      );
    }
  }

  irParaPagina(pagina: number): void {

    if (
      pagina >= 0 &&
      pagina < this.totalPages() &&
      pagina !== this.pageIndex()
    ) {
      this.consultarMovimentacoes(pagina);
    }
  }

  alterarTamanhoPagina(tamanho: number | string): void {

    const novoTamanho = Number(tamanho);

    if (novoTamanho <= 0) {
      return;
    }

    this.pageSize.set(novoTamanho);
    this.consultarMovimentacoes(0);
  }

  paginasDisponiveis(): number[] {

    const quantidadePaginas = this.totalPages();

    if (quantidadePaginas === 0) {
      return [];
    }

    const paginaAtual = this.pageIndex();
    const quantidadeBotoes = 5;

    let inicio = Math.max(
      0,
      paginaAtual - Math.floor(quantidadeBotoes / 2)
    );

    let fim = Math.min(
      quantidadePaginas,
      inicio + quantidadeBotoes
    );

    if (fim - inicio < quantidadeBotoes) {
      inicio = Math.max(
        0,
        fim - quantidadeBotoes
      );
    }

    return Array
      .from(
        { length: fim - inicio },
        (_, indice) => inicio + indice
      );
  }

solicitarExclusao(
  movimentacao: MovimentacaoConsultaResponse
): void {
  this.mensagemSucesso.set('');
  this.mensagemErro.set('');
  this.movimentacaoParaExcluir.set(movimentacao);
}

cancelarExclusao(): void {
  if (this.excluindo()) {
    return;
  }

  this.movimentacaoParaExcluir.set(null);
}

confirmarExclusao(): void {
  const movimentacao = this.movimentacaoParaExcluir();

  if (!movimentacao) {
    return;
  }

  this.excluindo.set(true);
  this.mensagemSucesso.set('');
  this.mensagemErro.set('');

  this.http
    .delete(
      `${environment.apiFinancasUrl}/api/v1/movimentacoes/excluir/${movimentacao.id}`,
      {
        responseType: 'text'
      }
    )
    .subscribe({
      next: () => {
        const paginaAposExclusao =
          this.numberOfElements() === 1 &&
          this.pageIndex() > 0
            ? this.pageIndex() - 1
            : this.pageIndex();

        this.excluindo.set(false);
        this.movimentacaoParaExcluir.set(null);

        this.mensagemSucesso.set(
          `Movimentação "${movimentacao.nome}" excluída com sucesso!`
        );

        this.consultarMovimentacoes(paginaAposExclusao);
      },
      error: (error: HttpErrorResponse) => {
        this.excluindo.set(false);
        this.movimentacaoParaExcluir.set(null);

        this.mensagemErro.set(
          this.obterMensagemErro(
            error,
            'Não foi possível excluir a movimentação.'
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