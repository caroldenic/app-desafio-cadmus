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
  editarTurma: (id: string, dados: Omit<Turma, 'id'>) => Promise<void>
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

  editarTurma: async (id, dados) => {
    const turmaAtualizada: Turma = {
      ...dados,
      id
    }

    await escolaRepository.editarTurma(id, turmaAtualizada)

    const escolas = await escolaRepository.listar()
    set({ escolas })
  },

  removerTurma: async (id) => {
    await escolaRepository.removerTurma(id)

    const escolas = await escolaRepository.listar()
    set({ escolas })
  },
}))