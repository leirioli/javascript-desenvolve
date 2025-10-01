// Soma
const soma = (a, b) => a + b;

// Subtrai
const subtrai = (a, b) => a - b;

// Multiplica
const multiplica = (a, b) => a * b;

// Divide
const divide = (a, b) => a / b;

// MostraResultado
const mostraResultado = (num1, num2) => {
  console.log(`Soma entre ${num1} e ${num2}:`, soma(num1, num2));
  console.log(`Subtração entre ${num1} e ${num2}:`, subtrai(num1, num2));
  console.log(`Multiplicação entre ${num1} e ${num2}:`, multiplica(num1, num2));
  console.log(`Divisão entre ${num1} e ${num2}:`, divide(num1, num2));
};

// Testando
mostraResultado(10, 5);