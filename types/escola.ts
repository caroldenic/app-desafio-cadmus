import { Periodo } from "./periodo"

export interface Turma {
  id: string
  nome: string
  turno: Periodo
  ano: number
}

export interface Escola {
  id: string
  nome: string
  endereco: {
    cep: string
    rua: string
    numero: string
    bairro: string
    cidade: string
    estado: string
  }
  turmas: Turma[]
}