import { CommonModule } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {

  http = inject(HttpClient);

  dataInicio = signal<string>('');
  dataFim = signal<string>('');

  gerandoRelatorio = signal<boolean>(false);
  mensagemSucesso = signal<string>('');
  mensagemErro = signal<string>('');

  ngOnInit(): void {
    this.definirPeriodoAtual();
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

  gerarRelatorio(): void {

    this.mensagemSucesso.set('');
    this.mensagemErro.set('');

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

    this.gerandoRelatorio.set(true);

    const parametros = new HttpParams()
      .set('dataInicio', this.dataInicio())
      .set('dataFim', this.dataFim());

    this.http
      .post(
        `${environment.apiFinancasUrl}/api/v1/movimentacoes/gerar-relatorio`,
        null,
        {
          params: parametros,
          responseType: 'text'
        }
      )
      .subscribe({
        next: (resposta) => {

          this.mensagemSucesso.set(
            resposta ||
            'Os dados foram enviados para análise. Em breve você receberá o relatório por e-mail.'
          );

          this.gerandoRelatorio.set(false);
        },
        error: (e) => {

          this.gerandoRelatorio.set(false);

          this.mensagemErro.set(
            e.error?.message ||
            e.error ||
            'Não foi possível solicitar a geração do relatório.'
          );
        }
      });
  }
}