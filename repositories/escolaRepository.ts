import { Escola, Turma } from '../types/escola'

let escolasMock: Escola[] = []

export const escolaRepository = {

  async listar(): Promise<Escola[]> {
    return escolasMock
  },

  async adicionar(escola: Escola): Promise<void> {
    escolasMock.push(escola)
  },

  async editar(escola: Escola): Promise<void> {
    escolasMock = escolasMock.map(e =>
      e.id === escola.id ? escola : e
    )
  },

  async remover(id: string): Promise<void> {
    escolasMock = escolasMock.filter(e => e.id !== id)
  },

  async adicionarTurma(escolaId: string, turma: Turma): Promise<void> {
    escolasMock = escolasMock.map(e =>
      e.id === escolaId
        ? { ...e, turmas: [...e.turmas, turma] }
        : e
    )
  },

  async editarTurma(turmaId: string, turmaAtualizada: Turma): Promise<void> {
    escolasMock = escolasMock.map(e => ({
      ...e,
      turmas: e.turmas.map(t =>
        t.id === turmaId ? turmaAtualizada : t
      )
    }))
  },

  async removerTurma(turmaId: string): Promise<void> {
    escolasMock = escolasMock.map(e => ({
      ...e,
      turmas: e.turmas.filter(t => t.id !== turmaId)
    }))
  }

}