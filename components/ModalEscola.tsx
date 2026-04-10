import {
  Box,
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

type Props = {
  isOpen: boolean
  onClose: () => void
  onSalvar: () => void

  editandoId: string | null

  nome: string
  setNome: (v: string) => void

  cep: string
  setCep: (v: string) => void

  rua: string
  setRua: (v: string) => void

  numero: string
  setNumero: (v: string) => void

  bairro: string
  setBairro: (v: string) => void

  cidade: string
  setCidade: (v: string) => void

  estado: string
  setEstado: (v: string) => void

  buscarCep: (v: string) => void
}

export function ModalEscola(props: Props) {

  const UFS = [
    'AC','AL','AP','AM','BA','CE','DF','ES','GO','MA',
    'MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN',
    'RS','RO','RR','SC','SP','SE','TO'
  ]

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalBackdrop />

      <ModalContent>
        <ModalHeader>
          <Text bold>
            {props.editandoId ? 'Editar escola' : 'Cadastrar escola'}
          </Text>
        </ModalHeader>

        <ModalBody>

          <Text>Nome:</Text>
          <Input mb="$3">
            <InputField value={props.nome} onChangeText={props.setNome} />
          </Input>

          <Text>CEP:</Text>
          <Input mb="$3">
            <InputField value={props.cep} onChangeText={props.buscarCep} />
          </Input>

          <Text>Rua:</Text>
          <Input mb="$3">
            <InputField value={props.rua} onChangeText={props.setRua} />
          </Input>

          <Box flexDirection="row" gap="$2">
            <Box flex={1}>
              <Text>Bairro:</Text>
              <Input>
                <InputField value={props.bairro} onChangeText={props.setBairro} />
              </Input>
            </Box>

            <Box flex={1}>
              <Text>Cidade:</Text>
              <Input>
                <InputField value={props.cidade} onChangeText={props.setCidade} />
              </Input>
            </Box>
          </Box>

          <Box flexDirection="row" gap="$2" mt="$3">
            <Box flex={1}>
              <Text>Número:</Text>
              <Input>
                <InputField value={props.numero} onChangeText={props.setNumero} />
              </Input>
            </Box>

            <Box width={100}>
              <Text>UF:</Text>
              <Select selectedValue={props.estado} onValueChange={props.setEstado}>
                <SelectTrigger>
                  <SelectInput placeholder="UF" />
                </SelectTrigger>

                <SelectPortal>
                  <SelectContent>
                    {UFS.map((uf) => (
                      <SelectItem key={uf} label={uf} value={uf} />
                    ))}
                  </SelectContent>
                </SelectPortal>
              </Select>
            </Box>
          </Box>

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