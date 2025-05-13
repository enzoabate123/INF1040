# Requisitos do Projeto TripTide

## 1. Requisitos Funcionais

### 1.1 Autenticação e Gerenciamento de Usuários
- RF01: O sistema deve permitir que novos usuários se cadastrem fornecendo nome, email e senha
- RF02: O sistema deve permitir que usuários façam login com email e senha
- RF03: O sistema deve permitir que usuários visualizem e atualizem suas informações de perfil
- RF04: O sistema deve permitir que usuários alterem suas senhas
- RF05: O sistema deve permitir que usuários façam logout
- RF06: O sistema deve permitir que usuários excluam suas contas

### 1.2 Gerenciamento de Propriedades
- RF07: O sistema deve exibir propriedades em destaque na página inicial
- RF08: O sistema deve permitir a visualização detalhada de uma propriedade
- RF09: O sistema deve listar todas as propriedades disponíveis

### 1.3 Reservas
- RF10: O sistema deve permitir que usuários autenticados façam reservas de propriedades
- RF11: O sistema deve permitir a seleção de datas de check-in e check-out
- RF12: O sistema deve calcular o preço total da reserva
- RF13: O sistema deve permitir que usuários visualizem suas reservas
- RF14: O sistema deve permitir que usuários cancelem suas reservas

## 2. Requisitos Não Funcionais

### 2.1 Usabilidade
- RNF01: A interface do usuário deve ser responsiva e funcionar em dispositivos móveis e desktop
- RNF02: O sistema deve fornecer feedback visual para ações do usuário (toasts)
- RNF03: O sistema deve ter uma navegação intuitiva e consistente

### 2.2 Desempenho
- RNF04: O sistema deve carregar a página inicial em menos de 3 segundos
- RNF05: As transições entre páginas devem ser fluidas e rápidas

### 2.3 Segurança
- RNF06: As senhas dos usuários devem ser armazenadas de forma segura
- RNF07: O sistema deve utilizar autenticação para proteger rotas privadas
- RNF08: O sistema deve implementar proteção contra ataques comuns (XSS, CSRF)

### 2.4 Tecnologias
- RNF09: Frontend desenvolvido com React e TypeScript
- RNF10: Estilização utilizando Tailwind CSS
- RNF11: Gerenciamento de estado com Context API
- RNF12: Construção e empacotamento com Vite

## 3. Regras de Negócio

- RN01: Apenas usuários autenticados podem fazer reservas
- RN02: Uma reserva não pode ter data de check-out anterior à data de check-in
- RN03: Uma propriedade não pode ser reservada para datas já ocupadas
- RN04: O status de uma reserva pode ser: confirmada, pendente ou cancelada
- RN05: Usuários só podem visualizar e gerenciar suas próprias reservas