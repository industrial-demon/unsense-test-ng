export const lettersRegex = /^[A-Za-z]+$/;
export const numbersRegex = /^\d+$/;
export const symbolsRegex = /^[^\w\s]+$/;

export const lettersAndNumbersRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/;
export const lettersAndSymbolsRegex =
/^(?=.*[a-zA-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).+$/

export const numbersAndSymbolsRegex =
  /^(?=\D*\d)(?=\d*\D)[\d$%&*+#\-./:<=>?@^_`|~]+$/;

export const lettersNumbersSynbolsRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^\w\s])[\w\s%$&*+#\-./:<=>?@^_`|~]+$/;
