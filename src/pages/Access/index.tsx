import { NavLink } from "react-router-dom"

import { accessTableHeaders, customersTableHeaders } from "constants/table"
import { AccessTableData } from "dtos/AccessDTO"

import { Input } from "components/Input"
import { Table } from "components/Table"
import { Button } from "components/Button"

import { Container, InputsContainer, Title } from "./styles"

export const Access = () => {

    const accessTableData: AccessTableData[] = [
      {
          id: 1,
          customer: 'Customer A',
          local: 'Location 1',
          situation: 'Active'
      },
      {
          id: 2,
          customer: 'Customer B',
          local: 'Location 2',
          situation: 'Inactive'
      },
      {
          id: 3,
          customer: 'Customer C',
          local: 'Location 3',
          situation: 'Active'
      },
      {
          id: 4,
          customer: 'Customer D',
          local: 'Location 4',
          situation: 'Inactive'
      }
      ];
      
    return (
        <Container>
            <Title> Acessos </Title>
            <InputsContainer>
                <Input placeholder="Digite aqui..." />
                <Button text="Filtrar" width={90}/>
            </InputsContainer>
            <Table headers={accessTableHeaders} content={accessTableData}/>
        </Container>
    )
}