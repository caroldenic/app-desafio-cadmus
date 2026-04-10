import { Escola, Turma } from '../types/escola'

const STORAGE_KEY = 'escolas'

let memoria: Escola[] = []

const isWeb = typeof window !== 'undefined' && !!window.localStorage

export const escolaRepository = {

  listar: async (): Promise<Escola[]> => {
    if (isWeb) {
      const data = localStorage.getItem(STORAGE_KEY)
      return data ? JSON.parse(data) : []
    }

    return memoria
  },

  salvarTodas: async (escolas: Escola[]) => {
    if (isWeb) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(escolas))
    } else {
      memoria = escolas
    }
  },

  adicionar: async (novaEscola: Escola) => {
    const escolas = await escolaRepository.listar()
    escolas.push(novaEscola)
    await escolaRepository.salvarTodas(escolas)
  },

  editar: async (escolaAtualizada: Escola) => {
    const escolas = await escolaRepository.listar()

    const novas = escolas.map(e =>
      e.id === escolaAtualizada.id ? escolaAtualizada : e
    )

    await escolaRepository.salvarTodas(novas)
  },

  remover: async (id: string) => {
    const escolas = await escolaRepository.listar()

    const novas = escolas.filter(e => e.id !== id)

    await escolaRepository.salvarTodas(novas)
  },

  adicionarTurma: async (escolaId: string, novaTurma: Turma) => {
    const escolas = await escolaRepository.listar()

    const novas = escolas.map(e => {
      if (e.id === escolaId) {
        return {
          ...e,
          turmas: [...e.turmas, novaTurma]
        }
      }
      return e
    })

    await escolaRepository.salvarTodas(novas)
  },

  editarTurma: async (id: string, turmaAtualizada: Turma) => {
    const escolas = await escolaRepository.listar()

    const novas = escolas.map(e => ({
      ...e,
      turmas: e.turmas.map(t =>
        t.id === id ? turmaAtualizada : t
      )
    }))

    await escolaRepository.salvarTodas(novas)
  },

  removerTurma: async (id: string) => {
    const escolas = await escolaRepository.listar()

    const novas = escolas.map(e => ({
      ...e,
      turmas: e.turmas.filter(t => t.id !== id)
    }))

    await escolaRepository.salvarTodas(novas)
  }
}