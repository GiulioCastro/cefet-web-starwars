// Seu javascript aqui :)
// Use a Star Wars API: https://swapi.dev/
// para fazer uma requisição assíncrona e:
//  - Pegar a lista de filmes (AJAX) e preencher no HTML
//  - Quando um filme for clicado, exibir sua introdução

const API_ENDPOINT = 'https://swapi.dev/api'

import { play } from './music.js';
import { restartAnimation } from './restart-animation.js';

play({
    audioUrl: './audio/tema-sw.mp3',
    coverImageUrl: './imgs/logo.svg',
    title: 'Intro',
    artist: 'John Williams'
}, document.body);

function converterDecimalParaRomano(numeral) {
    const dados = {
        '1': 'I',
        '2': 'II',
        '3': 'III',
        '4': 'IV',
        '5': 'V',
        '6': 'VI',
    };
    return dados[numeral];
}

fetch(`${API_ENDPOINT}/films`)
.then(response => response.json())
.then(response => {
    const filmes = response.results;
    const listaFilmesEl = document.querySelector('#filmes ul');
    filmes.forEach(filme => {        
        const filmeEl = document.createElement('li');
        filmeEl.innerHTML = `EPISODE ${converterDecimalParaRomano(filme.episode_id)} - ${filme.title.toUpperCase()}`;

        filmeEl.addEventListener('click', (e) => {
            const introducaoEl = document.querySelector('pre.introducao');
            introducaoEl.innerHTML = `
                Episode ${converterDecimalParaRomano(filme.episode_id)}
                ${filme.title.toUpperCase()}   
                         
                ${filme.opening_crawl}
            `;
            restartAnimation(introducaoEl);
        });
        
        listaFilmesEl.appendChild(filmeEl);
    });
});