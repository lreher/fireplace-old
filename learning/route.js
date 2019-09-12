function getKeys() {
  
}

module.exports = function(routes) {
  return function route(scope, callback) {
    var url = scope.request.url
    var method = scope.request.method.toLowerCase()

    var matchingRouteName = Object.keys(routes).find(function(route) {
      var pattern = new RegExp(route.replace(/\/\:[^/?]+/))

      var tokenNames = route.

      return url.match(pattern)
    })
    var routeMethods = routes[matchingRouteName]

    if (!matchingRouteName || !(method in routeMethods)) {
      callback({
        code: 404,
        message: "Not found."
      })

      return
    }

    routeMethods[method](scope, callback)
  }
}
