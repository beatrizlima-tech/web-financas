import { Injectable } from '@angular/core';
import { UsuarioAutenticado } from './auth.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly storageKey = 'auth';

  salvar(usuario: UsuarioAutenticado): void {
    sessionStorage.setItem(
      this.storageKey,
      JSON.stringify(usuario)
    );
  }

  obterUsuario(): UsuarioAutenticado | null {
    const dados = sessionStorage.getItem(this.storageKey);

    if (!dados) {
      return null;
    }

    try {
      return JSON.parse(dados) as UsuarioAutenticado;
    } catch {
      this.sair();
      return null;
    }
  }

  obterToken(): string | null {
    return this.obterUsuario()?.accessToken ?? null;
  }

  estaAutenticado(): boolean {
    return this.obterToken() !== null;
  }

  sair(): void {
    sessionStorage.removeItem(this.storageKey);
  }
}