import { Escola } from '../types/escola'

export function useEscolas(escolas: Escola[], busca: string) {

  const texto = busca.toLowerCase()

  const escolasFiltradas = escolas.filter((e) =>
    e.nome.toLowerCase().includes(texto) ||
    e.endereco.cidade.toLowerCase().includes(texto) ||
    e.endereco.bairro.toLowerCase().includes(texto) ||
    e.endereco.rua.toLowerCase().includes(texto) ||
    e.endereco.estado.toLowerCase().includes(texto)
  )

  return {
    escolasFiltradas
  }
}