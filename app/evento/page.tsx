"use client"

import { useState } from "react"

const NovoEvento = () => {
  const [rows, setRows] = useState([
    {
      unidade: "",
      oficial: 0,
      aPe: 0,
      vtr4r: 0,
      vtr2r: 0,
      conjunto: "",
      subtotal: 0,
    },
  ])

  const handleAddRow = () => {
    setRows([
      ...rows,
      {
        unidade: "",
        oficial: 0,
        aPe: 0,
        vtr4r: 0,
        vtr2r: 0,
        conjunto: "",
        subtotal: 0,
      },
    ])
  }

  const handleRowChange = (
    index: number,
    field: string,
    value: string | number
  ) => {
    const newRows = [...rows]
    newRows[index] = { ...newRows[index], [field]: value }
    setRows(newRows)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const formData = {
      evento: (e.target as any).eventName.value,
      local: (e.target as any).location.value,
      responsavel: (e.target as any).responsible.value,
      data: (e.target as any).date.value,
      contato: (e.target as any).contact.value,
      unidades: rows,
    }

    const response = await fetch("/api/eventos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })

    if (response.ok) {
      alert("Evento salvo com sucesso!")
    } else {
      alert("Erro ao salvar evento!")
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Cadastro de Evento
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="eventName"
            placeholder="Evento"
            required
            className="p-2 border rounded w-full"
          />
          <input
            type="text"
            name="location"
            placeholder="Local (Município/Bairro)"
            required
            className="p-2 border rounded w-full"
          />
          <input
            type="text"
            name="responsible"
            placeholder="Responsável Policiamento"
            required
            className="p-2 border rounded w-full"
          />
          <input
            type="date"
            name="date"
            required
            className="p-2 border rounded w-full"
          />
          <input
            type="text"
            name="contact"
            placeholder="Contato"
            required
            className="p-2 border rounded w-full"
          />
        </div>
        <h2 className="text-lg font-semibold mt-4">Efetivo das Unidades</h2>
        <div className="space-y-4">
          {rows.map((row, index) => (
            <div key={index} className="grid grid-cols-6 gap-2">
              <input
                type="text"
                placeholder="Unidade"
                value={row.unidade}
                onChange={(e) =>
                  handleRowChange(index, "unidade", e.target.value)
                }
                className="p-2 border rounded"
              />
              <input
                type="number"
                placeholder="Oficial"
                value={row.oficial}
                onChange={(e) =>
                  handleRowChange(index, "oficial", parseInt(e.target.value))
                }
                className="p-2 border rounded"
              />
              <input
                type="number"
                placeholder="A Pé"
                value={row.aPe}
                onChange={(e) =>
                  handleRowChange(index, "aPe", parseInt(e.target.value))
                }
                className="p-2 border rounded"
              />
              <input
                type="number"
                placeholder="VTR-4R"
                value={row.vtr4r}
                onChange={(e) =>
                  handleRowChange(index, "vtr4r", parseInt(e.target.value))
                }
                className="p-2 border rounded"
              />
              <input
                type="number"
                placeholder="VTR-2R"
                value={row.vtr2r}
                onChange={(e) =>
                  handleRowChange(index, "vtr2r", parseInt(e.target.value))
                }
                className="p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Conjunto (opcional)"
                value={row.conjunto}
                onChange={(e) =>
                  handleRowChange(index, "conjunto", e.target.value)
                }
                className="p-2 border rounded"
              />
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={handleAddRow}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Adicionar Unidade/OME
        </button>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Salvar Evento
        </button>
      </form>
    </div>
  )
}

export default NovoEvento
