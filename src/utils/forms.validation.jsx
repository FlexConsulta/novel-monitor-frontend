export default class Form {
  static FormValidation(form) {
    const formsControls = [...form];
    let errorCode = 0;

    function setInvalid(code, input, msg) {
      errorCode = code;
      input.classList.add("is-invalid");
      if (input.nextSibling.type === "button") {
        input.nextSibling.nextSibling.innerHTML = "Contato Invalido!";
      } else {
        input.nextSibling.innerHTML = msg;
      }
    }

    formsControls.forEach((input) => {
      // Validação campo obrigatório && Vazio

      if (input.required && input.value === "") {
        setInvalid(1, input, "Esse campo é obrigatório");
      } else {
        switch (input.dataset.mformat || input.closest("div").dataset.mformat) {
          // Validação do email inputado no formulário
          case "email":
            if (!Form.validateEmail(input.value))
              setInvalid(2, input, "O formato do email está incorreto!");
            break;
          case "phone":
            if (!Form.validatePhone(input.value))
              setInvalid(3, input, "O formato do Telefone está incorreto! ex: (00) 00000-0000");
            break;
          case "cnpj":
            if (!Form.validateCNPJ(input.value))
              setInvalid(4, input, "O formato do CNPJ está incorreto!");
            break;
          // Validação do CPF inputado no formulário
          case "cpf":
            if (!Form.validateCPF(input.value))
              setInvalid(3, input, "O formato do CPF está incorreto!");
            break;

          default:
            return;
        }
      }
    });

    // Envio da notificação de erro
    switch (errorCode) {
      case 1:
        throw new Error("Tem campos vazios que são obrigatórios!");
      case 2:
        throw new Error("O formato do email está incorreto!");
      case 3:
        throw new Error("O formato do Telefone está incorreto! ex: (00) 00000-0000");
      case 4:
        throw new Error("O formato do CNPJ está incorreto!");
      case 5:
        throw new Error("O formato do CPF está incorreto!");

      default:
        return true;
    }
  }
  static neutro(input) {
    input.target.classList.remove("is-invalid");
    input.target.style.color = "inherit";
  }

  // Validação do email
  static validateEmail(value) {
    const re =
      /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(value).toLowerCase()) ? true : false;
  }

  // Igual
  static isMatch(valueA, valueB) {
    if (valueA === valueB) return true;
    return false;
  }

  static passwordStrength(value) {
    const re =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (re.test(value)) return true;
    return false;
  }

  static validatePhone(value) {
    if (value[value.length - 1] === " ") {
      value = value.substring(0, value.length - 1);
    }
    var regex = new RegExp(/^\([0-9]{2}\) [0-9]?[0-9]{5}-[0-9]{4}$/);
    return regex.test(value);
  }
  // Validação CNPJ
  static validateCNPJ(cnpj) {
    cnpj = cnpj.replace(/[^\d]+/g, "");

    if (cnpj === "") return false;

    if (cnpj.length !== 14) return false;

    // Elimina CNPJs invalidos conhecidos
    if (
      cnpj === "00000000000000" ||
      cnpj === "11111111111111" ||
      cnpj === "22222222222222" ||
      cnpj === "33333333333333" ||
      cnpj === "44444444444444" ||
      cnpj === "55555555555555" ||
      cnpj === "66666666666666" ||
      cnpj === "77777777777777" ||
      cnpj === "88888888888888" ||
      cnpj === "99999999999999"
    )
      return false;

    // Valida DVs
    let tamanho = cnpj.length - 2;
    let numeros = cnpj.substring(0, tamanho);
    let digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2) pos = 9;
    }
    let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado !== digitos.charAt(0)) return false;

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2) pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado !== digitos.charAt(1)) return false;

    return true;
  }

  // Validação do CPF
  static validateCPF(value) {
    if (!(value === '')) {
      const validator = /^(([0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2})|([0-9]{11}))$/;
      return validator.test(value);
    }
    return true

  }
}
