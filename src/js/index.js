document.addEventListener("DOMContentLoaded", function () {

    const form = document.querySelector(".generator-form");
    const descricaoInput = document.getElementById("description");
    const codigoHtml = document.getElementById("html-code");
    const codigoCss = document.getElementById("css-code");
    const secaoPreview = document.getElementById("preview-section");

    form.addEventListener("submit", async function (evento) {
        evento.preventDefault(); //Evita o carregamento da página

        const descricao = descricaoInput.value.trim();

        if (!descricao) {
            return;
        }

        mostrarCarregamento(true);

        try {
            const resposta = await fetch(
                "https://diasalana.app.n8n.cloud/webhook/fundo-magico",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ descricao })
                }
            );

            const dados = await resposta.json();

            codigoHtml.textContent = dados.html || "";
            codigoCss.textContent = dados.css || "";

            secaoPreview.style.display = "block";
            secaoPreview.innerHTML = dados.html || "";


            let tagEstilo = document.getElementById("estilo-dinamico");
            if (tagEstilo) {
                tagEstilo.remove();
            }

            if (dados.css) {
                tagEstilo = document.createElement("style");
                tagEstilo.id = "estilo-dinamico";
                tagEstilo.textContent = dados.css;
                document.head.appendChild(tagEstilo);
            }

        } catch (error) {
            console.error("Erro ao enviar a requisição:", error);
            codigoHtml.textContent = "Erro ao gerar o HTML. Tente novamente";
            codigoCss.textContent = "Erro ao gerar o CSS. Tente novamente.";
            secaoPreview.innerHTML = "";
            

        } finally {
            mostrarCarregamento(false);
        }

    });

    function mostrarCarregamento(estaCarregando) {
        const botaoEnviar = document.getElementById('generate-btn');

        if (estaCarregando) {
            botaoEnviar.textContent = "Carregando background...";
            botaoEnviar.disabled = true;
        } else {
            botaoEnviar.textContent = "Gerar background mágico";
            botaoEnviar.disabled = false;
        }
    }

});
