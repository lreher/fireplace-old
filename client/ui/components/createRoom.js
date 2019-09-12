module.exports = function(fastn, app) {
  return fastn("div",
    {
      display: fastn.binding("onRoom", function(onRoom) {
        return !onRoom
      })
    },
    fastn("h2", "Create Room"),
    fastn("form",
      fastn("input", {
        placeholder: "Room Name: "
      })
      .on("input", function(event, scope) {
        scope.set("name", event.target.value)
      }),
      fastn("input", {
        placeholder: "Room Password: ",
        type: "password"
      })
      .on("input", function(event, scope) {
        scope.set("password", event.target.value)
      }),
      fastn("button", "Create")
    )
    .attach({})
    .on("submit", function(event, scope) {
      event.preventDefault()
      app.rooms.createRoom(scope.get("."))
      this.attach({})
    })
  )
}
