//const uuidv1 = require("uuid/v1");
const bcrypt = require("bcrypt");

function BcryptUtils() {
  const bu = {};

  // -------------------------------
  // Methods related to accounts
  // -------------------------------
  bu.Accounts = {};

  // generating a hash
  bu.Accounts.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  };

  // checking if password is valid
  bu.Accounts.validPassword = (user, password) =>
    bcrypt.compareSync(password, user.password);

  bu.Accounts.associate = function (models) {
    bu.Accounts.hasMany(models.Items, {
      foreignKey: "owner_id",
      onDelete: "cascade",
    });
  };

  bu.Accounts.associate = function (models) {
    bu.Accounts.hasMany(models.Transactions, {
      foreignKey: "renter_id",
    });
  };

  return bu;
}

module.exports = BcryptUtils();
