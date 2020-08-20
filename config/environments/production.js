module.exports = {
	PORT: (process.env.PORT || 81),
	DATABASE_URL: (process.env.DATABASE_URL || 'postgres://postgres:root@localhost:5432/testusersdb'),
  SECRET: (process.env.SECRET || 'h3sqq%pb#dHh^XcU8&Uj8brVS_*$LGHW'),
  JWT_EXPIRATION: (process.env.JWT_EXPIRATION || 86400)
};
