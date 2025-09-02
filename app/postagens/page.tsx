'use client'

import { useEffect, useState } from "react"
import EmojiPicker from "../componentes/emoji";
import { postagensFindAll } from "../lib/api/postagens";
import { typePostagens } from "../types/types";

const Postagem = () => {
    const [novaMensagem, setNovaMensagem] = useState<string>("");
    const [mensagem, setMensagem] = useState<typePostagens[]>([]);
    const [showEmoji, setShowEmoji] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);  // Definir o estado loading

    const handleCarregar = async () => {
        setLoading(true);
        try {
            const response = await postagensFindAll();

            if (response) {
                const mensagens = response.map((msg) => ({
                    ...msg,
                    nome_usua: "Usuário",
                    criacao_post: new Date(msg.criacao_post),  // Forçar a conversão para Date
                }));
                setMensagem(mensagens);
            } else {
                setMensagem([]);
            }
        } catch (error) {
            console.error("Erro ao carregar postagens:", error);
        } finally {
            setLoading(false); // Desativar o carregamento
        }
    };

    useEffect(() => {
        handleCarregar();
    }, []);


    const handleEnviar = () => {
        if (!novaMensagem.trim()) return;

        const idBase = mensagem.length + 1;

        const suaMensagem: typePostagens = {
            id: idBase,
            usuario_id: idBase,
            nome_usua: "Você",
            mensagem_post: novaMensagem,
            criacao_post: new Date(),
            enviadaPorMim: true
        }

        const resposta: typePostagens = {
            id: idBase + 1,
            usuario_id: idBase + 1,
            nome_usua: "Mensagem Enviada",
            mensagem_post: "",
            criacao_post: new Date(),
            enviadaPorMim: false
        }

        setMensagem([...mensagem, suaMensagem, resposta])
        setNovaMensagem('')
    }

    return (
        <div style={{
            maxWidth: "800px",
            margin: "0 auto"
        }}>
            <h2>Mensagens</h2>
            <div style={{
                border: "1px solid #ccc",
                padding: "10px",
                borderRadius: "8px",
                height: "400px",
                overflow: "auto",
                marginBottom: "12px",
                display: "flex",
                flexDirection: "column",
                gap: "8px"
            }}>
                {mensagem && mensagem.map((msg) => (
                    <div key={msg.id} style={{
                        display: "flex",
                        justifyContent: msg.enviadaPorMim ? "flex-start" : "flex-end"
                    }}>
                        <div style={{
                            padding: "8px",
                            borderRadius: "10px",
                            background: msg.enviadaPorMim ? "#1976d2" : "#e0e0e0",
                            color: msg.enviadaPorMim ? "white" : "black",
                            maxWidth: "60%",
                            fontSize: "15px"
                        }}>
                            <strong>{msg.nome_usua}</strong>
                            <p>{msg.mensagem_post}</p>
                            <small>{msg.criacao_post.toLocaleDateString("pt-BR", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: false,
                            })}</small>
                        </div>
                    </div>
                ))}
            </div>
            <div style={{ display: "flex", gap: "10px" }}>

                <button style={{
                    padding: "8px 10px",
                    background: "#f0f0f0",
                    color: "white",
                    border: "1px solid #ccc",
                    borderRadius: "20px",
                    cursor: "pointer"
                }} onClick={() => setShowEmoji(!showEmoji)}>😀</button>

                {showEmoji && (
                    <EmojiPicker onSelect={(emoji) => {
                        setNovaMensagem((prev) => prev + emoji);
                        setShowEmoji(false);
                    }}></EmojiPicker>
                )}

                <input
                    type="text"
                    placeholder="Digite sua mensagem..."
                    value={novaMensagem}
                    onChange={(e) => setNovaMensagem(e.target.value)}
                    style={{
                        flex: 1,
                        padding: "8px",
                        borderRadius: "6px",
                        border: "1px solid #ccc",
                    }}
                ></input>

                <button style={{
                    padding: "8px 16px",
                    background: "#1976d2",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer"
                }} onClick={handleEnviar}>Enviar</button>
            </div>
        </div>
    )
}

export default Postagem