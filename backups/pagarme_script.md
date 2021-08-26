```js
  customer: {
      external_id: '#123456789',
      name: 'Fulano',
      type: 'individual',
      country: 'br',
      email: 'fulano@email.com',
      documents: [
        {
          type: 'cpf',
          number: '71404665560',
        },
      ],
      phone_numbers: ['+5511999998888', '+5511888889999'],
      birthday: '1985-01-01',
    },
    billing: {
      name: 'Ciclano de Tal',
      address: {
        country: 'br',
        state: 'SP',
        city: 'São Paulo',
        neighborhood: 'Fulanos bairro',
        street: 'Rua dos fulanos',
        street_number: '123',
        zipcode: '05170060'
      }
    },
    shipping: {
      name: 'Ciclano de Tal',
      fee: 12345,
      delivery_date: '2017-12-25',
      expedited: true,
      address: {
        country: 'br',
        state: 'SP',
        city: 'São Paulo',
        neighborhood: 'Fulanos bairro',
        street: 'Rua dos fulanos',
        street_number: '123',
        zipcode: '05170060'
      }
    },
```