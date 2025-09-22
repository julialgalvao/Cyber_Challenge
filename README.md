# InvestBot - Mobile Development Challenge XP

## Contexto

  Este projeto foi desenvolvido durante o **Challenge XP Inc. 2025 – Assessor Virtual de Investimentos**, na disciplina de Mobile Development and IoT. O objetivo é oferecer um **chatbot educacional** que recomenda carteiras personalizadas e ensina conceitos financeiros de forma acessível.

## Funcionalidades

* **Autenticação & Cadastro**: fluxo de criação de conta e login local.
  
* **Quiz de Perfil**: determina o perfil (*Conservador*, *Moderado* ou *Agressivo*) através de perguntas interativas.
  
* **Recomendações**: exibe carteiras adequadas ao perfil obtido no quiz.
  
* **XP Bot**: chatbot com tópicos educativos (Renda Fixa, Liquidez, Diversificação, FIIs, Ações) e respostas em diferentes níveis de profundidade.
  
* **Perfil do Usuário**: mostra nome e e‑mail, com opção de logout.
  
* **UI/UX**: tema escuro com destaques em amarelo XP, navbar inferior customizada e logo fixa no header.

## Link do Figma

https://www.figma.com/design/BYiRCM0Ay9LoOUVta1cN9R/InvestBot---Challenge-Mobile-XP?node-id=0-1&t=gUV677zlEi6gOFip-1

## Tecnologias

* **Expo** (React Native)
* **TypeScript**
* **React Navigation** (Stack & Bottom Tabs)
* **AsyncStorage** para persistência local de dados

## Estrutura

```plaintext
Mobile_Challenge/
├─ App.tsx
├─ src/
│  ├─ navigation/
│  │  ├─ AppNavigator.tsx
│  │  └─ HomeTabs.tsx
│  ├─ screens/
│  │  ├─ LoginScreen.tsx
│  │  ├─ SignupScreen.tsx
│  │  ├─ SimulationScreen.tsx
│  │  ├─ RecommendationScreen.tsx
│  │  ├─ LearningPathScreen.tsx
│  │  └─ ProfileScreen.tsx
│  └─ assets/
└─ package.json
```

## Instalação e Execução

1. **Clone o repositório**:

   ```bash
   git clone https://github.com/Millkyy/Mobile_Challenge.git
   cd Mobile_Challenge
   ```
2. **Instale as dependências**:

   ```bash
   npm install
   expo install react-native-gesture-handler react-native-screens react-native-safe-area-context @react-navigation/native @react-navigation/stack @react-navigation/bottom-tabs @react-native-async-storage/async-storage
   ```
3. **Inicie o servidor Metro**:

   ```bash
   npx expo start
   ```

## Uso

1. Crie uma conta em **Criar Conta**.
2. Faça login.
3. Responda ao **Quiz de Perfil**.
4. Navegue pelas abas: **Simulação**, **Recomendações**, **XP Bot** e **Perfil**.

## Telas
![image](https://github.com/user-attachments/assets/27c63b6e-bb86-4cfe-a3bd-a2ae56e49500)

**Página de Login** erro se tentar fazer login sem nenhum campo preenchido ou com usuário e senha errados.


![image](https://github.com/user-attachments/assets/6b5ead48-e6a4-4733-9aa1-34bf33f3868b)

**Página de Cadastro** erro se tentar fazer cadastro sem preencher todos os campos.


![image](https://github.com/user-attachments/assets/e9076200-7d98-47aa-b330-c227bd3fbd3b)

**Página do Quiz de perfil** determina o perfil de investimento.


![image](https://github.com/user-attachments/assets/8d712690-874e-438d-8190-d49a8bba3ada)

**Página de Recomendação** mensagem que aparece se o usuário tenta acessar a página antes de completar o quiz.


![image](https://github.com/user-attachments/assets/ad583da6-1e76-4bfb-93f1-71b22d135d4f)

**Página de Recomendação** mostra recomendações personalizadas de acordo com o perfil de investimento.


![image](https://github.com/user-attachments/assets/b47aef3c-d176-4411-9e49-a7646d056fc3)

**Página do XP Bot** chatbot educativo.


![image](https://github.com/user-attachments/assets/e2bf2cc2-2f25-47e2-a15c-d82af8594785)

**Página do Perfil** mostra seu nome, email e a opção de sair.

## Grupo

Aline Fernandes Zeppelini - RM97966

Camilly Breitbach Ishida - RM551474

Jessica Costacurta - RM99068

Julia Leite Galvão - RM550201
