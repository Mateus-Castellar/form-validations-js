// obter componentes do hmtl

const botaoCadastrarDados = document.querySelector('[name="cadastrar-dados"]');
const campoNomeCompleto = document.querySelector('[name="nomeCompleto"]');
const campoEmail = document.querySelector('[name="email"]');
const campoTelefone = document.querySelector('[name="telefone"]');
const campoNascimento = document.querySelector('[name="nascimento"]');
const campoDocumento = document.querySelector('[name="documento"]');

const campoCep = document.querySelector('[name="cep"]');
const campoRua = document.querySelector('[name="rua"]');
const campoBairro = document.querySelector('[name="bairro"]');
const campoCidade = document.querySelector('[name="cidade"]');
const campoEstado = document.querySelector('[name="estado"]');

campoNascimento.addEventListener('blur', (e) => {

	let dataNascimento = e.target.value;

	if (dataNascimento.length <= 0) return;

	const dataFormatada = dataNascimento.replace(/\D/g, "");

	if (aceitaApenasNumeros(dataFormatada) === false) {
		return alert('data inválida');
	}
});

campoNomeCompleto.addEventListener('blur', (e) => {

	let nomeCompleto = e.target.value;

	if (nomeCompleto.length <= 0) return;

	if (validarNumerosECaracteresEspeciais(nomeCompleto) === false) {
		return alert('informe apenas letras no campo Nome')
	}
});

campoEmail.addEventListener('blur', (e) => {

	let email = e.target.value;

	if (email.length <= 0) return;

	if (validarEmail(email) === false) {
		return alert('informe um email válido')
	};
});

campoCep.addEventListener('blur', (e) => {

	let cep = e.target.value;

	if (cep.length <= 0) return;

	if (cep.length !== 8) {
		return alert("informe um cep válido");
	};

	campoRua.value = "...";
	campoBairro.value = "...";
	campoCidade.value = "...";
	campoEstado.value = "...";

	setTimeout(() => {
		buscaCep(cep);
	}, 250);
});

campoDocumento.addEventListener('blur', (e) => {

	let cpf = e.target.value;

	if (cpf.length <= 0) return;

	if (validarCPF(cpf) === false) {
		alert('informe um cpf valido')
	}
});

async function buscaCep(cep) {
	const response = await fetch("https://viacep.com.br/ws/" + cep + "/json/");
	var data = await response.json();

	campoRua.value = data.logradouro;
	campoBairro.value = data.bairro;
	campoCidade.value = data.localidade;
	campoEstado.value = data.uf;
};

function validarCPF(cpf) {
	cpf = cpf.replace(/[^\d]+/g, '');
	if (cpf == '') return false;

	// Elimina CPFs invalidos conhecidos	
	if (cpf.length != 11 ||
		cpf == "00000000000" ||
		cpf == "11111111111" ||
		cpf == "22222222222" ||
		cpf == "33333333333" ||
		cpf == "44444444444" ||
		cpf == "55555555555" ||
		cpf == "66666666666" ||
		cpf == "77777777777" ||
		cpf == "88888888888" ||
		cpf == "99999999999")
		return false;

	// Valida 1o digito	
	add = 0;
	for (i = 0; i < 9; i++)
		add += parseInt(cpf.charAt(i)) * (10 - i);
	rev = 11 - (add % 11);
	if (rev == 10 || rev == 11)
		rev = 0;
	if (rev != parseInt(cpf.charAt(9)))
		return false;
	// Valida 2o digito	
	add = 0;
	for (i = 0; i < 10; i++)
		add += parseInt(cpf.charAt(i)) * (11 - i);
	rev = 11 - (add % 11);
	if (rev == 10 || rev == 11)
		rev = 0;
	if (rev != parseInt(cpf.charAt(10)))
		return false;
	return true;

	Cada
};

function validarEmail(email) {
	const regexEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i;
	return regexEmail.test(email);
}

function validarCaracteresEspeciais(texto) {
	const regexCaracteres = /^([a-zA-Z0-9 .&'-]+)$/;
	return regexCaracteres.test(texto);
}

function validarNumerosECaracteresEspeciais(texto) {
	const regexCaracteresENumeros = /^([a-zA-Z .&'-]+)$/;;
	return regexCaracteresENumeros.test(texto);
}

function aceitaApenasNumeros(texto) {
	const numeros = /^([0-9]+)$/;
	return numeros.test(texto);
}

const handleMascaraCpf = (event) => {
	let input = event.target;
	input.value = MascaraCpf(input.value)
}

const MascaraCpf = (value) => {
	if (!value) return "";
	value = value.replace(/\D/g, "")
	value = value.replace(/(\d{3})(\d)/, "$1.$2")
	value = value.replace(/(\d{3})(\d)/, "$1.$2")
	value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2")
	return value;
}

const handleMascaraTelefone = (event) => {
	let input = event.target;
	input.value = MascaraTelefone(input.value);
}

const MascaraTelefone = (value) => {
	if (!value) return "";
	value = value.replace(/\D/g, '');
	value = value.replace(/(\d{2})(\d)/, "($1) $2");
	value = value.replace(/(\d)(\d{4})$/, "$1-$2");
	return value
}

function mascaraData(val) {
	var pass = val.value;
	var expr = /[0123456789]/;

	for (i = 0; i < pass.length; i++) {
		// charAt -> retorna o caractere posicionado no índice especificado
		var lchar = val.value.charAt(i);
		var nchar = val.value.charAt(i + 1);

		if (i == 0) {
			// search -> retorna um valor inteiro, indicando a posição do inicio da primeira
			// ocorrência de expReg dentro de instStr. Se nenhuma ocorrencia for encontrada o método retornara -1
			// instStr.search(expReg);
			if ((lchar.search(expr) != 0) || (lchar > 3)) {
				val.value = "";
			}

		} else if (i == 1) {

			if (lchar.search(expr) != 0) {
				// substring(indice1,indice2)
				// indice1, indice2 -> será usado para delimitar a string
				var tst1 = val.value.substring(0, (i));
				val.value = tst1;
				continue;
			}

			if ((nchar != '/') && (nchar != '')) {
				var tst1 = val.value.substring(0, (i) + 1);

				if (nchar.search(expr) != 0)
					var tst2 = val.value.substring(i + 2, pass.length);
				else
					var tst2 = val.value.substring(i + 1, pass.length);

				val.value = tst1 + '/' + tst2;
			}

		} else if (i == 4) {

			if (lchar.search(expr) != 0) {
				var tst1 = val.value.substring(0, (i));
				val.value = tst1;
				continue;
			}

			if ((nchar != '/') && (nchar != '')) {
				var tst1 = val.value.substring(0, (i) + 1);

				if (nchar.search(expr) != 0)
					var tst2 = val.value.substring(i + 2, pass.length);
				else
					var tst2 = val.value.substring(i + 1, pass.length);

				val.value = tst1 + '/' + tst2;
			}
		}

		if (i >= 6) {
			if (lchar.search(expr) != 0) {
				var tst1 = val.value.substring(0, (i));
				val.value = tst1;
			}
		}
	}

	if (pass.length > 10)
		val.value = val.value.substring(0, 10);
	return true;
}