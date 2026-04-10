import { create } from 'zustand'
import { escolaRepository } from '../repositories/escolaRepository'
import { Escola, Turma } from '../types/escola'

interface EscolaStore {
  escolas: Escola[]

  carregarEscolas: () => Promise<void>
  adicionarEscola: (dados: Omit<Escola, 'id' | 'turmas'>) => Promise<void>
  editarEscola: (escola: Escola) => Promise<void>
  removerEscola: (id: string) => Promise<void>

  adicionarTurma: (escolaId: string, dados: Omit<Turma, 'id'>) => Promise<void>
  editarTurma: (id: string, escolaId: string, dados: Omit<Turma, 'id'>) => Promise<void>
  removerTurma: (id: string) => Promise<void>
}

export const useEscolaStore = create<EscolaStore>((set) => ({
  escolas: [],

  carregarEscolas: async () => {
    const escolas = await escolaRepository.listar()
    set({ escolas })
  },

  adicionarEscola: async (dados) => {
    const novaEscola: Escola = {
      ...dados,
      id: Date.now().toString(),
      turmas: []
    }

    await escolaRepository.adicionar(novaEscola)

    const escolas = await escolaRepository.listar()
    set({ escolas })
  },

  editarEscola: async (escola) => {
    await escolaRepository.editar(escola)

    const escolas = await escolaRepository.listar()
    set({ escolas })
  },

  removerEscola: async (id) => {
    await escolaRepository.remover(id)

    const escolas = await escolaRepository.listar()
    set({ escolas })
  },

  adicionarTurma: async (escolaId, dados) => {
    const novaTurma: Turma = {
      ...dados,
      id: Date.now().toString()
    }

    await escolaRepository.adicionarTurma(escolaId, novaTurma)

    const escolas = await escolaRepository.listar()
    set({ escolas })
  },

  editarTurma: async (id, escolaId, dados) => {
    const escolas = await escolaRepository.listar()

    let turmaAntiga: Turma | null = null
    const escolasSemTurma = escolas.map((escola) => {
      const encontrou = escola.turmas.find(t => t.id === id)

      if (encontrou) {
        turmaAntiga = encontrou
        return {
          ...escola,
          turmas: escola.turmas.filter(t => t.id !== id)
        }
      }

      return escola
    })

    const escolasAtualizadas = escolasSemTurma.map((escola) => {
      if (escola.id === escolaId) {
        return {
          ...escola,
          turmas: [
            ...escola.turmas,
            {
              ...turmaAntiga!,
              ...dados,
              id
            }
          ]
        }
      }
      return escola
    })

    await escolaRepository.salvarTodas(escolasAtualizadas)

    set({ escolas: escolasAtualizadas })
  },

  removerTurma: async (id) => {
    await escolaRepository.removerTurma(id)

    const escolas = await escolaRepository.listar()
    set({ escolas })
  },
}))