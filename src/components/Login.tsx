import React, { useState } from "react";
import DOMPurify from "dompurify";
import { postSecure } from "../privacy/httpClient";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // higienização básica
    const cleanEmail = DOMPurify.sanitize(email).trim();
    const cleanSenha = senha.trim();

    try {
      // HTTPS obrigatório pelo postSecure()
      await postSecure("https://api.exemplo.com/login", "login", {
        email: cleanEmail,
        password: cleanSenha,
      });

      alert(`Login realizado com: ${cleanEmail}`);
      // TODO: navegar para a próxima tela/limpar estado
    } catch (err) {
      console.warn("Falha no login", err);
      alert("Não foi possível fazer login. Tente novamente.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        required
      />
      <button type="submit">Entrar</button>
    </form>
  );
}
