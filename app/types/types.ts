export interface typeUsuarios {
    id: number;
    nome_usua: string;
    email_usua: string;
    senha_usua: string;
}

export interface typePostagens {
    id?: number;
    nome_usua?: string;
    usuario_id: number;
    mensagem_post: string;
    criacao_post: Date;
    enviadaPorMim?: boolean;
}