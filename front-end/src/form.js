import { transcribeAudio } from "./transcribe";
import { startLoading, stopLoading, loadingMessage } from "./loading";
import { getVideoId, loadVideo } from "./youtube-api";
import axios from 'axios';
import { renderText } from "./render";

const form = document.querySelector('#form');

form.addEventListener("submit", async e => {
    e.preventDefault();

    try {
        loadingMessage("Iniciando a aplicação");
        startLoading();

        const formData = new FormData(form);
        const url = formData.get('url');
        await loadVideo(url);

        loadingMessage("Conectando com o backend");
        await axios.get('https://video-transcription-api.vercel.app/audio?v=' + getVideoId(url));

        const data = await transcribeAudio();
        renderText(data);
    } catch (error) {
        console.log('[SUBMIT_ERROR]', error);
    } finally {
        stopLoading();
    }
});

// Obtém referências aos elementos de input e ícone
const input = document.getElementById("url");
const clearIcon = document.querySelector(".ph-x-circle");

// Adiciona um evento de clique ao ícone
clearIcon.addEventListener("click", function () {
    input.value = ""; // Define o valor do input como uma string vazia
});
