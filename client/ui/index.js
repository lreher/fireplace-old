
module.exports = function(fastn, app) {
  var ui = fastn("div",
    fastn("h1", "FirePlace"),
    require("./components/createRoom")(fastn, app),
    require("./components/viewRoom")(fastn, app),
  )

  ui.attach(app.state)
  ui.render()

  window.addEventListener("DOMContentLoaded", function() {
    document.body.appendChild(ui.element)
  })
}
