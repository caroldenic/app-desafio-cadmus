import {
  Button, ButtonText,
  Input, InputField,
  Modal, ModalBackdrop, ModalBody, ModalContent,
  ModalFooter, ModalHeader,
  Select,
  SelectContent,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
  Text
} from '@gluestack-ui/themed'

import { Periodo } from '@/types/periodo'
import { Escola } from '../types/escola'

type Props = {
  isOpen: boolean
  onClose: () => void
  onSalvar: () => void

  editandoId: string | null

  nome: string
  setNome: (v: string) => void

  turno: Periodo | ''
  setTurno: (v: Periodo) => void

  ano: string
  setAno: (v: string) => void

  escolaId: string
  setEscolaId: (v: string) => void

  escolas: Escola[]
}

export function ModalTurma(props: Props) {

  const PERIODOS = ['Manhã', 'Tarde', 'Noite']

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalBackdrop />

      <ModalContent>
        <ModalHeader>
          <Text bold>
            {props.editandoId ? 'Editar turma' : 'Cadastrar turma'}
          </Text>
        </ModalHeader>

        <ModalBody>

          <Text>Nome:</Text>
          <Input mb="$3">
            <InputField value={props.nome} onChangeText={props.setNome} />
          </Input>

          <Text>Escola:</Text>
          <Select selectedValue={props.escolaId} onValueChange={props.setEscolaId}>
            <SelectTrigger>
              <SelectInput placeholder="Selecione a escola" />
            </SelectTrigger>

            <SelectPortal>
              <SelectContent>
                {props.escolas.map((e) => (
                  <SelectItem key={e.id} label={e.nome} value={e.id} />
                ))}
              </SelectContent>
            </SelectPortal>
          </Select>

          <Text mt="$3">Período:</Text>
          <Select selectedValue={props.turno} onValueChange={(value) => props.setTurno(value as Periodo)}>
            <SelectTrigger>
              <SelectInput placeholder="Selecione" />
            </SelectTrigger>

            <SelectPortal>
              <SelectContent>
                {PERIODOS.map((p) => (
                  <SelectItem key={p} label={p} value={p} />
                ))}
              </SelectContent>
            </SelectPortal>
          </Select>

          <Text mt="$3">Ano:</Text>
          <Input>
            <InputField
              value={props.ano}
              onChangeText={props.setAno}
              keyboardType="numeric"
            />
          </Input>

        </ModalBody>

        <ModalFooter>
          <Button mr="$2" action="secondary" onPress={props.onClose}>
            <ButtonText>Cancelar</ButtonText>
          </Button>

          <Button bgColor='$pink700' onPress={props.onSalvar}>
            <ButtonText>Salvar</ButtonText>
          </Button>
        </ModalFooter>

      </ModalContent>
    </Modal>
  )
}