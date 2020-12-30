const processCommand = (cmd) => {
  const primRegex = /!\w+/g;
  const secondaryRegex = /-\w+/g;
  const prefix = cmd.match(primRegex);
  const property = cmd.match(secondaryRegex);
  return { prefix, property };
};

module.exports = {
  processCommand: processCommand,
};
