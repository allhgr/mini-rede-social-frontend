import { perfilCreate, perfilUpdate } from "@/app/lib/api/perfil";
import { typePerfil } from "@/app/types/types";
import { useState } from "react";

interface propsPerfil {
  perfil?: typePerfil;
  onClose: () => void;
  onAtualizar: () => void;
}

const PerfilEditar = ({ perfil, onClose, onAtualizar }: propsPerfil) => {
  const [userid, setUserid] = useState(perfil?.usuario_id ?? "");
  const [nome_per, setNomePer] = useState(perfil?.nome_per ?? "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const dados: typePerfil = {
      usuario_id: Number(userid),
      nome_per: nome_per
    };

    const response = perfil
      ? await perfilUpdate(perfil.id!, dados)
      : await perfilCreate(dados);

    if (response) onAtualizar();
    else alert("Erro ao salvar usuário");
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{perfil ? "Editar Perfil" : "Cadastrar Perfil"}</h2>
        <form onSubmit={handleSubmit} className="modal-form">
          <label>
            ID Usuário:
            <input
              type="number"
              value={userid}
              onChange={(e) => setUserid(e.target.value)}
              required
            />
          </label>
          <label>
            Perfil:
            <input
              type="text"
              value={nome_per}
              onChange={(e) => setNomePer(e.target.value)}
              required
            />
          </label>
          <div className="modal-buttons">
            <button type="button" onClick={onClose} className="btn-cancel">
              Cancelar
            </button>
            <button type="submit" className="btn-save">
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PerfilEditar;