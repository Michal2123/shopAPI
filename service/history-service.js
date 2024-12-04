const getUserHistory = async () => {
  await setTimeout(() => {}, 3000);
  return "Get History";
};

const postUserHistory = async () => {
  await setTimeout(() => {}, 3000);
  return "Post History";
};

module.exports = { getUserHistory, postUserHistory };
