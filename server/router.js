const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  app.get('/getToken', mid.requiresSecure, controllers.Account.getToken);
  app.get('/getGames', mid.requiresLogin, controllers.Gamer.getGamer);
  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);
  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);
  app.get('/logout', mid.requiresLogin, controllers.Account.logout);
  app.get('/maker', mid.requiresLogin, controllers.Gamer.makerPage);
  app.post('/maker', mid.requiresLogin, controllers.Gamer.make);
  app.get('/account', mid.requiresLogin, controllers.Account.accountPage);
  app.get('/change', mid.requiresLogin, controllers.Account.passwordChange);
  app.get('/stats', mid.requiresLogin, controllers.Account.statsPage);
  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
};

module.exports = router;
