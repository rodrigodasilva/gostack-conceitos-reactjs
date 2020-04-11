import React, { useEffect, useState } from "react";

import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    async function fetchRepositories() {
      const response = await api.get("/repositories");
      setRepositories(response.data);
    }

    fetchRepositories();
  }, []);

  async function handleAddRepository() {
    const newRepository = {
      title: `Desafio NodeJS ${Date.now()}`,
      url: "http://github.com/desafio-nodejs",
      techs: ["react", "express"],
    };

    const responseNewRepository = await api.post(
      "/repositories",
      newRepository
    );

    setRepositories([...repositories, responseNewRepository.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);

    const newArrayRepositories = repositories.filter(
      (repository) => repository.id !== id
    );

    setRepositories(newArrayRepositories);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
