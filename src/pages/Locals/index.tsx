import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { Line } from 'components/Line'
import { Table } from 'components/Table'
import { Button } from 'components/Button'
import { TopInfosContainer } from 'components/TopInfosContainer'

import { LocalItemDTO } from 'dtos/LocalDTO'

import { localsTableHeaders } from 'constants/table'

import { Container, ContainerHeader, Title } from './styles'
import { Input } from 'components/Input'

export const Locals = () => {
  const { t } = useTranslation()

  const localTableData: LocalItemDTO[] = [
    {
      id: 1,
      name: 'João Silva',
      mac: '00:1A:2B:3C:4D:5E',
      grupos: ['Clientes Premium', 'VIP'],
    },
    {
      id: 2,
      name: 'Maria Oliveira',
      mac: '11:2B:3C:4D:5E:6F',
      grupos: ['Clientes Básicos'],
    },
    {
      id: 3,
      name: 'Pedro Santos',
      mac: '22:3C:4D:5E:6F:7G',
      grupos: ['Clientes Premium'],
    },
    {
      id: 4,
      name: 'Ana Paula',
      mac: '33:4D:5E:6F:7G:8H',
      grupos: ['Clientes Novos', 'Testes'],
    },
  ]

  return (
    <Container>
      <ContainerHeader>
        <Title> {t('title.locals')} </Title>
        <NavLink to={'/locals/new'}>
          <Button text={t('button.create')} color="PRIMARY_LIGHT" />
        </NavLink>
      </ContainerHeader>

      <Line />

      {localTableData.length > 0 && (
        <>
          <TopInfosContainer
            topInfos={[
              { title: 'Último adicionado', text: localTableData[0].name },
              {
                title: 'Quantidade de locais',
                text: localTableData.length.toString(),
              },
            ]}
          />

          <Line />

          <Input placeholder={t('placeholder.find', { name: 'nome' })} />
        </>
      )}

      <Table
        headers={localsTableHeaders}
        content={localTableData.map((obj) => Object.values(obj))}
      />
    </Container>
  )
}
