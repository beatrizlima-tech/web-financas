import { Routes } from '@angular/router';
import { AutenticarUsuario } from './autenticar-usuario/autenticar-usuario';
import { CriarUsuario } from './criar-usuario/criar-usuario';
import { Dashboard } from './dashboard/dashboard';
import { CategoriasCadastro } from './categorias-cadastro/categorias-cadastro';
import { CategoriasEdicao } from './categorias-edicao/categorias-edicao';
import { CategoriasConsulta } from './categorias-consulta/categorias-consulta';
import { MovimentacoesCadastro } from './movimentacoes-cadastro/movimentacoes-cadastro';
import { MovimentacoesConsulta } from './movimentacoes-consulta/movimentacoes-consulta';
import { MovimentacoesEdicao } from './movimentacoes-edicao/movimentacoes-edicao';

export const routes: Routes = [
    {
        path: 'pages/autenticar', //rota de navegação
        component: AutenticarUsuario //componente renderizado
    },
    {
        path: 'pages/criar-usuario', //rota de navegação
        component: CriarUsuario //componente renderizado
    },
    {
        path: 'app/dashboard', //rota de navegação
        component: Dashboard //componente renderizado
    },
    {
        path: 'app/categorias-cadastro', //rota de navegação
        component: CategoriasCadastro //componente renderizado
    },
    {
        path: 'app/categorias-consulta', //rota de navegação
        component: CategoriasConsulta //componente renderizado
    },
    {
        path: 'app/categorias-edicao', //rota de navegação
        component: CategoriasEdicao //componente renderizado
    },
    {
        path: 'app/movimentacoes-cadastro', //rota de navegação
        component: MovimentacoesCadastro //componente renderizado
    },
    {
        path: 'app/movimentacoes-consulta', //rota de navegação
        component: MovimentacoesConsulta //componente renderizado
    },
    {
        path: 'app/movimentacoes-edicao', //rota de navegação
        component: MovimentacoesEdicao //componente renderizado
    },
    {
        path: '', pathMatch: 'full', //rota raiz
        redirectTo: '/pages/autenticar' //redurecionamento
    }
];
