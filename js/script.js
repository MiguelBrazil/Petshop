// Atualiza a data e a hora exibidas no site
function atualizaDataHora() {

    var data = new Date();

    var dataHora =
        data.toLocaleDateString() + " - " + data.toLocaleTimeString();

    document.getElementById("horaAtual").innerHTML = dataHora;
}

// Executa a função imediatamente ao abrir a página
atualizaDataHora();

// Atualiza a data e a hora a cada 1 segundo
setInterval(atualizaDataHora, 1000);

// Procura o formulário de cadastro
var formulario = document.getElementById("formCadastro");

// O código abaixo só é executado na página de cadastro
if (formulario != null) {

    formulario.addEventListener("submit", function(event) {

        // Impede que a página seja recarregada ao enviar o formulário
        event.preventDefault();

        // Busca os dados preenchidos pelo usuário
        var nomeCliente = document.getElementById("nomeCliente").value;
        var nomePet = document.getElementById("nomePet").value;

        var servico = document.querySelector(
            'input[name="servico"]:checked'
        ).value;

        var atendimento = document.querySelector(
            'input[name="atendimento"]:checked'
        ).value;

        var agendamento = document.getElementById("agendamento").value;

        // Calcula o valor do serviço
        var valor = 0;

        if (servico == "Banho") {
            valor = 50;
        }

        if (servico == "Tosa") {
            valor = 70;
        }

        if (atendimento == "Tele-busca") {
            valor = valor + 15;
        }
        // Impede agendamentos em datas e horários passados
        var campoAgendamento = document.getElementById("agendamento");

        if (campoAgendamento != null) {

            var agora = new Date();

            agora.setMinutes(
                agora.getMinutes() - agora.getTimezoneOffset()
            );

            campoAgendamento.min = agora
                .toISOString()
                .slice(0, 16);
        }

        // Converte a data para um formato mais fácil de ler
        var dataAgendamento = new Date(agendamento);

        var dataFormatada = dataAgendamento.toLocaleString("pt-BR");

        // Monta a mensagem
        var mensagem =
            "Agendamento confirmado! " +
            nomeCliente +
            ", o serviço de " +
            servico +
            " para " +
            nomePet +
            " foi agendado para " +
            dataFormatada +
            ". Forma de atendimento: " +
            atendimento +
            ". Valor total: R$ " +
            valor.toFixed(2).replace(".", ",") +
            ".";

        // Exibe a mensagem na página
        var caixaMensagem =
            document.getElementById("mensagemAgendamento");

        caixaMensagem.textContent = mensagem;

        caixaMensagem.classList.remove("d-none");
    });
}