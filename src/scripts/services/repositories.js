import { baseUrl, repositoriesQuantity } from '../variable.js';

async function getrepositories(userName) {
    const response = await fetch(`${baseUrl}/${userName}/repos?per_page=${repositoriesQuantity}`);
    return await response.json();
}

export { getrepositories };