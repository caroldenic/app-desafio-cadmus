import { Box, Button, ButtonText, Input, InputField, Text } from '@gluestack-ui/themed'
import { useEffect, useState } from 'react'
import { ScrollView } from 'react-native'
import { EscolaCard } from '../../components/EscolaCard'
import { ModalEscola } from '../../components/ModalEscola'
import { ModalAviso } from '../../components/ModalAviso'
import { ModalConfirmacao } from '../../components/ModalConfirmacao'
import { useCep } from '../../hooks/useCEP'
import { useEscolas } from '../../hooks/useEscolas'
import { useModal } from '../../hooks/useModal'
import { useEscolaStore } from '../../store/escolaStore'

export default function EscolasScreen() {
  const { escolas, carregarEscolas, adicionarEscola, editarEscola, removerEscola } = useEscolaStore()
  const modal = useModal()
  const { buscarCep } = useCep()
  const [busca, setBusca] = useState('')
  const [nome, setNome] = useState('')
  const [cep, setCep] = useState('')
  const [rua, setRua] = useState('')
  const [numero, setNumero] = useState('')
  const [bairro, setBairro] = useState('')
  const [cidade, setCidade] = useState('')
  const [estado, setEstado] = useState('')
  const [editandoId, setEditandoId] = useState<string | null>(null)
  const [modalConfirmacao, setModalConfirmacao] = useState(false)
  const [escolaParaExcluir, setEscolaParaExcluir] = useState<string | null>(null)
  const [modalAviso, setModalAviso] = useState(false)
  const [mensagemAviso, setMensagemAviso] = useState('')

  useEffect(() => {
    carregarEscolas()
  }, [carregarEscolas])


  const handleBuscarCep = async (valor: string) => {
    setCep(valor)

    const data = await buscarCep(valor)

    if (data && !data.erro) {
      setRua(data.logradouro || '')
      setBairro(data.bairro || '')
      setCidade(data.localidade || '')
      setEstado(data.uf || '')
    }
  }

  const resetForm = () => {
    setNome('')
    setCep('')
    setRua('')
    setNumero('')
    setBairro('')
    setCidade('')
    setEstado('')
    setEditandoId(null)
  }

  const handleSalvar = async () => {
    if (!nome || !cep || !rua || !numero || !bairro || !cidade || !estado) {
      setMensagemAviso('Preencha todos os campos')
      setModalAviso(true)
      return
    }

    const escolaAtual = escolas.find(e => e.id === editandoId)

    if (editandoId && escolaAtual) {
      await editarEscola({
        id: editandoId,
        nome,
        endereco: {
          cep,
          rua,
          numero,
          bairro,
          cidade,
          estado
        },
        turmas: escolaAtual.turmas,
      })
    } else {
      await adicionarEscola({
        nome,
        endereco: {
          cep,
          rua,
          numero,
          bairro,
          cidade,
          estado
        }
      })
    }

    resetForm()
    modal.fechar()
  }

  const { escolasFiltradas } = useEscolas(escolas, busca.trim())

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
        <ButtonText>Cadastrar escola</ButtonText>
      </Button>

      <Input mb="$4">
        <InputField
          placeholder="Buscar por nome, cidade, bairro ou estado..."
          value={busca}
          onChangeText={setBusca}
        />
      </Input>

      {escolasFiltradas.length === 0 && (
        <Box mt="$6" alignItems="center">
          <Text size="lg" bold>
            Nenhuma escola cadastrada
          </Text>
          <Text mt="$2">
            Clique em "Cadastrar escola" para começar
          </Text>
        </Box>
      )}

      {escolasFiltradas.map((escola) => (
        <EscolaCard
          key={escola.id}
          escola={escola}
          onEditar={(e) => {
            setNome(e.nome)
            setCep(e.endereco.cep)
            setRua(e.endereco.rua)
            setNumero(e.endereco.numero)
            setBairro(e.endereco.bairro)
            setCidade(e.endereco.cidade)
            setEstado(e.endereco.estado)
            setEditandoId(e.id)
            modal.abrir()
          }}
          onRemover={(id) => {
            setEscolaParaExcluir(id)
            setModalConfirmacao(true)
          }}
        />
      ))}

      <ModalEscola
        isOpen={modal.isOpen}
        onClose={modal.fechar}
        onSalvar={handleSalvar}

        editandoId={editandoId}

        nome={nome}
        setNome={setNome}

        cep={cep}
        setCep={setCep}

        rua={rua}
        setRua={setRua}

        numero={numero}
        setNumero={setNumero}

        bairro={bairro}
        setBairro={setBairro}

        cidade={cidade}
        setCidade={setCidade}

        estado={estado}
        setEstado={setEstado}

        buscarCep={handleBuscarCep}
      />

      <ModalConfirmacao
        isOpen={modalConfirmacao}
        onClose={() => {
          setModalConfirmacao(false)
          setEscolaParaExcluir(null)
        }}
        onConfirm={() => {
          if (escolaParaExcluir) {
            removerEscola(escolaParaExcluir)
          }
          setModalConfirmacao(false)
          setEscolaParaExcluir(null)
        }}
        mensagem="Tem certeza que deseja excluir? Todas as turmas dessa escola também serão excluídas."
      />

      <ModalAviso
        isOpen={modalAviso}
        onClose={() => setModalAviso(false)}
        mensagem={mensagemAviso}
      />

    </ScrollView>
  )
}