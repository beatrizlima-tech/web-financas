import { Routes } from '@angular/router';

import { AutenticarUsuario } from './autenticar-usuario/autenticar-usuario';
import { CriarUsuario } from './criar-usuario/criar-usuario';
import { RecuperarSenha } from './recuperar-senha/recuperar-senha';
import { Dashboard } from './dashboard/dashboard';
import { CategoriasCadastro } from './categorias-cadastro/categorias-cadastro';
import { CategoriasEdicao } from './categorias-edicao/categorias-edicao';
import { CategoriasConsulta } from './categorias-consulta/categorias-consulta';
import { MovimentacoesCadastro } from './movimentacoes-cadastro/movimentacoes-cadastro';
import { MovimentacoesConsulta } from './movimentacoes-consulta/movimentacoes-consulta';
import { MovimentacoesEdicao } from './movimentacoes-edicao/movimentacoes-edicao';
import { authGuard } from './core/auth/auth.guard';

export const routes: Routes = [
  {
    path: 'pages/autenticar',
    component: AutenticarUsuario
  },
  {
    path: 'pages/criar-usuario',
    component: CriarUsuario
  },
  {
    path: 'pages/recuperar-senha',
    component: RecuperarSenha
  },
  {
    path: 'app/dashboard',
    component: Dashboard,
    canActivate: [authGuard]
  },
  {
    path: 'app/categorias-cadastro',
    component: CategoriasCadastro,
    canActivate: [authGuard]
  },
  {
    path: 'app/categorias-consulta',
    component: CategoriasConsulta,
    canActivate: [authGuard]
  },
  {
  path: 'app/categorias-edicao/:id',
  component: CategoriasEdicao,
  canActivate: [authGuard]
  },
  {
    path: 'app/movimentacoes-cadastro',
    component: MovimentacoesCadastro,
    canActivate: [authGuard]
  },
  {
    path: 'app/movimentacoes-consulta',
    component: MovimentacoesConsulta,
    canActivate: [authGuard]
  },
  {
  path: 'app/movimentacoes-edicao/:id',
  component: MovimentacoesEdicao,
  canActivate: [authGuard]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'pages/autenticar'
  }
];