var Utils = {
	yesnoBoolean: function (str) {
		var str = str.toLowerCase();
		return (str == "yes" || str == "y")? true : false;
	}
};

module.exports = Utils;