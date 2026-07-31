import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';

export const authInterceptor: HttpInterceptorFn = (request, next) => {

  const authService = inject(AuthService);
  const token = authService.obterToken();

  const rotaProtegida =
    request.url.startsWith(
      `${environment.apiFinancasUrl}/api/v1/categorias`
    )
    ||
    request.url.startsWith(
      `${environment.apiFinancasUrl}/api/v1/movimentacoes`
    );

  if (!token || !rotaProtegida) {
    return next(request);
  }

  const requisicaoAutenticada = request.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });

  return next(requisicaoAutenticada);
};