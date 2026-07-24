import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-categorias-consulta',
  imports: [],
  templateUrl: './categorias-consulta.html',
  styleUrl: './categorias-consulta.css',
})
export class CategoriasConsulta implements OnInit {

  http = inject(HttpClient);

  categorias = signal<any[]>([]);
  mensagemErro = signal<string>('');
  carregando = signal<boolean>(false);

  ngOnInit(): void {
    this.consultarCategorias();
  }

  consultarCategorias(): void {

    this.carregando.set(true);
    this.mensagemErro.set('');

    this.http
      .get<any[]>('http://localhost:8083/api/v1/categorias/consultar')
      .subscribe({
        next: (dados) => {
          this.categorias.set(dados);
          this.carregando.set(false);
        },
        error: (e) => {
          this.categorias.set([]);
          this.carregando.set(false);

          this.mensagemErro.set(
            e.error?.message ||
            e.error ||
            'Não foi possível consultar as categorias.'
          );
        }
      });
  }
}