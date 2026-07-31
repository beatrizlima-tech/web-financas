import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from '../../environments/environment';
import { AuthService } from '../core/auth/auth.service';
import { UsuarioAutenticado } from '../core/auth/auth.models';

@Component({
  selector: 'app-autenticar-usuario',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './autenticar-usuario.html',
  styleUrl: './autenticar-usuario.css',
})
export class AutenticarUsuario {

  private http = inject(HttpClient);
  private authService = inject(AuthService);

  mensagemErro = signal<string>('');

  formAutenticar = new FormGroup({
    email : new FormControl('', [Validators.required]),
    senha : new FormControl('', [Validators.required])
  });

  autenticar() {
    this.http.post<UsuarioAutenticado>(`${environment.apiAutenticacaoUrl}/api/v1/usuario/autenticar`, this.formAutenticar.value)
      .subscribe({
        next: (response) => {
          this.authService.salvar(response);
          location.href = '/app/dashboard';
        },
        error: (e) => {
          this.mensagemErro.set(e.error);
        }
      });
  }

}
