import {
  HttpClient,
  HttpErrorResponse
} from '@angular/common/http';

import {
  Component,
  inject,
  signal
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-recuperar-senha',
  imports: [ReactiveFormsModule],
  templateUrl: './recuperar-senha.html',
  styleUrl: './recuperar-senha.css',
})

export class RecuperarSenha {

  private readonly http = inject(HttpClient);

    mensagemSucesso = signal('');
    mensagemErro = signal('');
    enviando = signal(false);

  formRecuperacao = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.email,
        Validators.maxLength(100)
      ]
    })
  });

  solicitarRecuperacao(): void {
  if (this.formRecuperacao.invalid) {
    this.formRecuperacao.markAllAsTouched();
    return;
  }

  this.enviando.set(true);
  this.mensagemSucesso.set('');
  this.mensagemErro.set('');

  this.http
    .post<{ mensagem: string }>(
      'http://localhost:8082/api/v1/recuperacao-senha/solicitar',
      this.formRecuperacao.getRawValue()
    )
    .subscribe({
      next: (response) => {
        this.enviando.set(false);
        this.mensagemSucesso.set(response.mensagem);
      },
      error: (error: HttpErrorResponse) => {
        this.enviando.set(false);

        this.mensagemErro.set(
          error.error?.detail
          || error.error?.message
          || 'Não foi possível solicitar a recuperação da senha.'
        );
      }
    });
}

}
