export interface UsuarioAutenticado {
  id: string;
  nome: string;
  email: string;
  perfil: string;
  dataHoraAcesso: string;
  accessToken: string;
}