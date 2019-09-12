var cpjax = require("cpjax")

module.exports = function(app) {
  return function (settings, callback) {
    cpjax({
      dataType: "json",
      ...settings,
      url: `${app.apiUrl}${settings.url}`
    }, function(error, result) {
      if (error) {
        try {
          error = JSON.parse(error.message)
        } catch (e) {

        }
      }

      callback(error, result)
    })
  }
}
