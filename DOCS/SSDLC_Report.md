# SSDLC 

**Projeto:** Cyber_Challenge - InvestBot  
**Turma:** 3ESR  
**Disciplina:** Cybersecurity  
**Sprint:** 4 - Tarefa 1

## Objetivo
Implementar práticas de codificação segura (sanitização, autenticação e tratamento de erros) com validação automatizada via GitHub Actions.

## Implementações
- Sanitização de entradas com DOMPurify.
- ESLint configurado com plugin de segurança.
- Testes automatizados de segurança com Jest.
- Workflow `security.yml` executando auditoria e testes.

## Evidências
- Todos os testes passaram.
- Lint report: 0 erros críticos.
- Pipeline automatizado ativo no GitHub Actions.

## Conclusão
O pipeline SSDLC foi integrado com sucesso ao CI. Cada push é analisado automaticamente, bloqueando builds inseguros e garantindo a conformidade com as boas práticas de desenvolvimento seguro.
