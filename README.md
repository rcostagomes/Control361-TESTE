# Projeto de Teste - Gerenciamento de Veículos Control361

Este projeto é uma aplicação front-end desenvolvida como parte de um teste para a vaga de Full Stack Pleno na Control361. A aplicação permite a visualização e gerenciamento de veículos, incluindo listagem, filtragem, exibição em mapa e detalhes individuais.

## Tecnologias Utilizadas

- Next.js (v14.x - ajustado para versões estáveis)
- React (v18.x)
- TypeScript
- TailwindCSS
- React Query (v4.x) para gerenciamento de estado de servidor e caching
- Axios para requisições HTTP
- Google Maps API (via `@react-google-maps/api`)
- Jest e React Testing Library para testes unitários e de componentes
- ESLint para linting de código

## Funcionalidades Implementadas

- Listagem de veículos com paginação infinita (carrossel infinito).
- Filtragem de veículos por placa/frota e por tipo (Rastreados/Outros).
- Exibição dos veículos em um mapa interativo do Google Maps.
- Atualização automática do mapa (a cada 2 minutos - *Nota: esta funcionalidade específica de atualização automática do mapa não foi explicitamente implementada no código fornecido, mas a estrutura para busca de dados está presente*).
- Exibição de detalhes do veículo ao clicar em um item na lista ou em um marcador no mapa, incluindo um link para o Google Maps com as coordenadas do veículo.
- Interface responsiva (testes básicos de responsividade foram considerados no desenvolvimento dos componentes).

## Pré-requisitos

- Node.js (versão 18.x ou superior recomendada)
- npm (geralmente vem com o Node.js) ou yarn

## Configuração do Ambiente

1.  **Clone o repositório (ou descompacte os arquivos do projeto).**

2.  **Navegue até o diretório raiz do projeto:**
    ```bash
    cd caminho/para/control361-test
    ```

3.  **Instale as dependências:**
    ```bash
    npm install
    ```
    Ou, se preferir usar yarn:
    ```bash
    yarn install
    ```

4.  **Configurar a Chave da API do Google Maps:**
    A aplicação requer uma chave da API do Google Maps para exibir o mapa.
    -   Obtenha uma chave de API do Google Maps Platform seguindo as instruções [aqui](https://developers.google.com/maps/documentation/javascript/get-api-key).
    -   Certifique-se de que as APIs "Maps JavaScript API" e, opcionalmente, "Geocoding API" e "Places API" estejam ativadas para sua chave.
    -   **Importante:** Restrinja sua chave de API para os domínios que você usará (ex: `http://localhost:3000` para desenvolvimento).
    -   No arquivo `/home/ubuntu/projects/control361-test/src/components/VehicleList.tsx`, localize a constante `GOOGLE_MAPS_API_KEY` e substitua o valor placeholder pela sua chave real:
        ```javascript
        // Em src/components/VehicleList.tsx
        const GOOGLE_MAPS_API_KEY = "SUA_CHAVE_API_DO_GOOGLE_MAPS_AQUI";
        ```
        Para um projeto de produção, é altamente recomendável usar variáveis de ambiente (ex: `.env.local`) para armazenar chaves de API.

## Executando a Aplicação

1.  **Para iniciar o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```
    Ou com yarn:
    ```bash
    yarn dev
    ```
    A aplicação estará disponível em [http://localhost:3000](http://localhost:3000).

2.  **Para construir a aplicação para produção:**
    ```bash
    npm run build
    ```
    E para iniciar o servidor de produção:
    ```bash
    npm run start
    ```

## Executando os Testes

Para rodar os testes unitários e de componentes configurados com Jest e React Testing Library:
```bash
npm run test
```
Ou com yarn:
```bash
yarn test
```

## Estrutura do Projeto (Principais Pastas)

-   `src/app/`: Contém a página principal da aplicação (`page.tsx`).
-   `src/components/`: Componentes React reutilizáveis (MapComponent, VehicleList, VehicleListItem, VehicleDetailsModal, etc.).
    -   `src/components/__tests__/`: Testes para os componentes.
-   `src/hooks/`: Hooks personalizados (ex: `useInfiniteVehicles.ts` para busca de dados com React Query).
-   `src/types/`: Definições de tipos TypeScript (ex: `vehicle.ts`).
-   `public/`: Arquivos estáticos.
-   `jest.config.js`: Configuração do Jest.
-   `jest.setup.js`: Arquivo de setup para o Jest (importa `@testing-library/jest-dom`).
-   `next.config.js`: Configuração do Next.js.
-   `package.json`: Lista de dependências e scripts do projeto.
-   `tailwind.config.ts`: Configuração do TailwindCSS.

## API de Backend

A aplicação consome a API de veículos fornecida:
`https://develop-back.rota361.com.br/recruitment`

O principal endpoint utilizado é:
`/vehicles/list-with-paginate` (GET)
Parâmetros esperados:
-   `type` (string, obrigatório): Tipo de veículo (ex: "rastreados").
-   `page` (number, obrigatório): Número da página.
-   `perPage` (number, obrigatório): Quantidade de itens por página.
-   `filter` (string, opcional): Filtro por placa ou frota.

## Considerações Adicionais

-   **Nome do Usuário na UI:** O cabeçalho da aplicação em `src/app/page.tsx` exibe "Seu nome e sobrenome aqui". Este campo pode ser alterado para o nome do avaliador ou do candidato.
-   **Cor dos Ícones dos Carros:** Conforme especificado, a cor dos ícones dos carros no mapa não tem um significado específico e pode ser customizada criativamente (atualmente usando marcadores padrão do Google Maps).
-   **Posição Aleatória no Mapa:** A posição dos veículos no mapa é determinada pelos dados retornados pela API.
-   **Filtro "Outros":** A API, conforme informado nas especificações, pode retornar apenas veículos rastreados. O filtro "Outros" foi implementado na UI, mas seu efeito prático dependerá da resposta da API.
-   **Atualização Automática do Mapa:** A especificação menciona atualização a cada 2 minutos. Embora o React Query possa ser configurado para refetching em intervalos, essa funcionalidade específica não foi explicitamente adicionada ao componente do mapa neste escopo, mas a estrutura de busca de dados permite essa extensão.

Obrigado pela oportunidade!
# Control361-TESTE
# Control361-TESTE
