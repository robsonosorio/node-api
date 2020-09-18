module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'nodeapi',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
