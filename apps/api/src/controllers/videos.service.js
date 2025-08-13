const repo = require("../repositories/videos.repo");

exports.list = () => repo.list();
exports.get  = (id) => repo.get(id);
