# Documentação de Funções do Projeto TripTide

Este documento descreve todas as funções principais do sistema TripTide, especificando seus parâmetros de entrada, valores de retorno e uma breve descrição de sua funcionalidade.

## Contexto de Autenticação (AuthContext.tsx)

### `AuthProvider`
**Recebe:** 
- `children`: ReactNode - Componentes filhos que terão acesso ao contexto de autenticação

**Retorna:** 
- Provedor de contexto que envolve os componentes filhos

**Descrição:** 
Componente que gerencia o estado de autenticação global da aplicação, fornecendo funções de login, cadastro e logout para os componentes filhos.

### `useAuth`
**Recebe:** 
- Nenhum parâmetro

**Retorna:** 
- Objeto contendo o estado de autenticação atual e métodos para manipulá-lo

**Descrição:** 
Hook personalizado que permite que componentes acessem o contexto de autenticação.

### `login`
**Recebe:** 
- `email`: string - Email do usuário
- `password`: string - Senha do usuário

**Retorna:** 
- `Promise<boolean>` - Promessa que resolve para true se o login for bem-sucedido, false caso contrário

**Descrição:** 
Função que autentica um usuário com base em email e senha, armazenando as informações do usuário no localStorage e atualizando o estado de autenticação.

### `signup`
**Recebe:** 
- `name`: string - Nome completo do usuário
- `email`: string - Email do usuário
- `password`: string - Senha do usuário

**Retorna:** 
- `Promise<boolean>` - Promessa que resolve para true se o cadastro for bem-sucedido, false caso contrário

**Descrição:** 
Função que registra um novo usuário, armazenando suas informações no localStorage e atualizando o estado de autenticação.

### `logout`
**Recebe:** 
- Nenhum parâmetro

**Retorna:** 
- Void

**Descrição:** 
Função que encerra a sessão do usuário, removendo suas informações do localStorage e atualizando o estado de autenticação.

## Páginas de Autenticação

### Página de Login (Login.tsx)

#### `Login`
**Recebe:** 
- Nenhum parâmetro

**Retorna:** 
- Componente React

**Descrição:** 
Componente que renderiza o formulário de login, gerencia o estado do formulário e processa a submissão.

#### `handleSubmit`
**Recebe:** 
- `e`: React.FormEvent - Evento de submissão do formulário

**Retorna:** 
- Void

**Descrição:** 
Função que processa a submissão do formulário de login, chamando a função login do contexto de autenticação e redirecionando o usuário em caso de sucesso.

### Página de Cadastro (Signup.tsx)

#### `Signup`
**Recebe:** 
- Nenhum parâmetro

**Retorna:** 
- Componente React

**Descrição:** 
Componente que renderiza o formulário de cadastro, gerencia o estado do formulário e processa a submissão.

#### `handleSubmit`
**Recebe:** 
- `e`: React.FormEvent - Evento de submissão do formulário

**Retorna:** 
- Void

**Descrição:** 
Função que processa a submissão do formulário de cadastro, chamando a função signup do contexto de autenticação e redirecionando o usuário em caso de sucesso.

## Componentes de Propriedades

### `PropertyCard`
**Recebe:** 
- `property`: Property - Objeto contendo informações da propriedade

**Retorna:** 
- Componente React

**Descrição:** 
Componente que renderiza um card de propriedade, exibindo imagem, título, localização, preço e avaliação.

### `PropertyDetail`
**Recebe:** 
- Nenhum parâmetro direto (usa parâmetros de URL)

**Retorna:** 
- Componente React

**Descrição:** 
Componente que renderiza a página de detalhes de uma propriedade, exibindo informações completas e formulário de reserva.

### `FeaturedSection`
**Recebe:** 
- Nenhum parâmetro

**Retorna:** 
- Componente React

**Descrição:** 
Componente que renderiza a seção de propriedades em destaque na página inicial.

## Componentes de Reserva

### `BookingForm`
**Recebe:** 
- `propertyId`: string - ID da propriedade a ser reservada
- `pricePerNight`: number - Preço por noite da propriedade

**Retorna:** 
- Componente React

**Descrição:** 
Componente que renderiza o formulário de reserva, permitindo a seleção de datas e calculando o preço total.

### `createBooking`
**Recebe:** 
- `userId`: string - ID do usuário que está fazendo a reserva
- `propertyId`: string - ID da propriedade a ser reservada
- `checkIn`: Date - Data de check-in
- `checkOut`: Date - Data de check-out
- `totalPrice`: number - Preço total da reserva

**Retorna:** 
- `Promise<Booking>` - Promessa que resolve para o objeto de reserva criado

**Descrição:** 
Função que cria uma nova reserva no sistema.

### `cancelBooking`
**Recebe:** 
- `bookingId`: string - ID da reserva a ser cancelada

**Retorna:** 
- `Promise<boolean>` - Promessa que resolve para true se o cancelamento for bem-sucedido

**Descrição:** 
Função que cancela uma reserva existente.

### `getUserBookings`
**Recebe:** 
- `userId`: string - ID do usuário

**Retorna:** 
- `Promise<Booking[]>` - Promessa que resolve para um array de reservas do usuário

**Descrição:** 
Função que recupera todas as reservas feitas por um usuário específico.

## Componentes de UI

### `Navbar`
**Recebe:** 
- Nenhum parâmetro

**Retorna:** 
- Componente React

**Descrição:** 
Componente que renderiza a barra de navegação principal, incluindo links e estado de autenticação.

### `Footer`
**Recebe:** 
- Nenhum parâmetro

**Retorna:** 
- Componente React

**Descrição:** 
Componente que renderiza o rodapé da aplicação.

### `Toast`
**Recebe:** 
- `title`: string - Título da notificação
- `description`: string - Descrição da notificação
- `variant`: "default" | "destructive" (opcional) - Variante visual da notificação

**Retorna:** 
- Void

**Descrição:** 
Função que exibe uma notificação toast na interface do usuário.

## Funções Utilitárias

### `formatCurrency`
**Recebe:** 
- `amount`: number - Valor monetário a ser formatado
- `currency`: string (opcional, padrão "BRL") - Código da moeda

**Retorna:** 
- `string` - Valor formatado como string

**Descrição:** 
Função que formata um valor numérico como moeda.

### `calculateDaysBetween`
**Recebe:** 
- `startDate`: Date - Data inicial
- `endDate`: Date - Data final

**Retorna:** 
- `number` - Número de dias entre as duas datas

**Descrição:** 
Função que calcula o número de dias entre duas datas.

### `isDateAvailable`
**Recebe:** 
- `propertyId`: string - ID da propriedade
- `checkIn`: Date - Data de check-in desejada
- `checkOut`: Date - Data de check-out desejada

**Retorna:** 
- `Promise<boolean>` - Promessa que resolve para true se as datas estiverem disponíveis

**Descrição:** 
Função que verifica se uma propriedade está disponível para reserva em um período específico.