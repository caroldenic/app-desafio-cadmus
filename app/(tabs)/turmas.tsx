import { Box, Button, ButtonText, Input, InputField, Text } from '@gluestack-ui/themed'
import { useState } from 'react'
import { ScrollView } from 'react-native'
import { ModalTurma } from '../../components/ModalTurma'
import { ModalConfirmacao } from '../../components/ModalConfirmacao'
import { ModalAviso } from '../../components/ModalAviso'
import { TurmaCard } from '../../components/TurmaCard'
import { useModal } from '../../hooks/useModal'
import { useTurmas } from '../../hooks/useTurmas'
import { useEscolaStore } from '../../store/escolaStore'
import { Periodo } from '../../types/periodo'


export default function TurmasScreen() {
  const { escolas, adicionarTurma, editarTurma, removerTurma } = useEscolaStore()
  const modal = useModal()
  const [busca, setBusca] = useState('')
  const [nome, setNome] = useState('')
  const [turno, setTurno] = useState<Periodo | ''>('')
  const [ano, setAno] = useState('')
  const [escolaId, setEscolaId] = useState('')
  const [editandoId, setEditandoId] = useState<string | null>(null)
  const [modalConfirmacao, setModalConfirmacao] = useState(false)
  const [turmaParaExcluir, setTurmaParaExcluir] = useState<string | null>(null)
  const [modalAviso, setModalAviso] = useState(false)
  const [mensagemAviso, setMensagemAviso] = useState('')

  const handleSalvar = async () => {
    if (!nome || !turno || !ano || !escolaId) {
      setMensagemAviso('Preencha todos os campos')
      setModalAviso(true)
      return
    }

    if (editandoId) {
      await editarTurma(editandoId, escolaId, {
        nome,
        turno: turno as Periodo,
        ano: Number(ano),
      })
    } else {
      await adicionarTurma(escolaId, {
        nome,
        turno: turno as Periodo,
        ano: Number(ano),
      })
    }

    resetForm()
    modal.fechar()
  }

  const resetForm = () => {
    setNome('')
    setTurno('')
    setAno('')
    setEscolaId('')
    setEditandoId(null)
  }

  const { turmasFiltradas } = useTurmas(escolas, busca.trim())

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>

      <Button
        bgColor='$pink700'
        mb="$4"
        onPress={() => {
          resetForm()
          modal.abrir()
        }}
      >
        <ButtonText>Cadastrar turma</ButtonText>
      </Button>

      <Input mb="$4">
        <InputField
          placeholder="Buscar por nome, escola, período ou ano..."
          value={busca}
          onChangeText={setBusca}
        />
      </Input>

      {turmasFiltradas.length === 0 && (
        <Box mt="$6" alignItems="center">
          <Text bold size="lg">Nenhuma turma encontrada</Text>
          <Text mt="$2" color="$gray500">
            Cadastre uma turma para começar
          </Text>
        </Box>
      )}

      {turmasFiltradas.map((turma) => (
        <TurmaCard
          key={turma.id}
          turma={turma}
          onEditar={(t) => {
            setNome(t.nome)
            setTurno(t.turno)
            setAno(String(t.ano))
            setEscolaId(t.escolaId)
            setEditandoId(t.id)
            modal.abrir()
          }}
          onRemover={(id) => {
            setTurmaParaExcluir(id)
            setModalConfirmacao(true)
          }}
        />
      ))}

      <ModalTurma
        isOpen={modal.isOpen}
        onClose={modal.fechar}
        onSalvar={handleSalvar}

        editandoId={editandoId}

        nome={nome}
        setNome={setNome}

        turno={turno}
        setTurno={setTurno}

        ano={ano}
        setAno={setAno}

        escolaId={escolaId}
        setEscolaId={setEscolaId}

        escolas={escolas}
      />

      <ModalConfirmacao
        isOpen={modalConfirmacao}
        onClose={() => {
          setModalConfirmacao(false)
          setTurmaParaExcluir(null)
        }}
        onConfirm={() => {
          if (turmaParaExcluir) {
            removerTurma(turmaParaExcluir)
          }
          setModalConfirmacao(false)
          setTurmaParaExcluir(null)
        }}
        mensagem="Tem certeza que deseja excluir a turma?"
      />

      <ModalAviso
        isOpen={modalAviso}
        onClose={() => setModalAviso(false)}
        mensagem={mensagemAviso}
      />

    </ScrollView>
  )
}