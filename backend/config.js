const jwtSecret =  '6a5d1f68as189c1asd31c98ad74f$ä¨ü123^01230dfasdklöfj asjfklö ä$das-füadfc$äsdä-$ad maklfjolu89ujpoadfädüafcnadszucfbhjk9m vkldf mlökl';

const signOptions = {expiresIn: "1d", audience :"self", issuer : "bank"};
const validateOptions = {secret: jwtSecret, audience :"self", issuer : "bank"};

let inMemory = false;
module.exports = { jwtSecret, signOptions, validateOptions, inMemory};
