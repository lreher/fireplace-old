module.exports = function(fastn, app) {
  return fastn("div",
    {
      display: fastn.binding("onRoom")
    },
    fastn("h2", fastn.binding("currentRoom.name")),
    fastn("form",
      fastn("input", {
        value: fastn.binding("name"),
        placeholder: "Song Name: "
      })
      .on("input", function(event, scope) {
        scope.set("name", event.target.value)
      }),
      fastn("button", "Search")
    )
    .attach({})
    .on("submit", function(event, scope) {
      event.preventDefault()
      app.songs.searchSong(scope.get("name"))
      this.attach({})
    }),
    fastn("list", {
      items: fastn.binding("songSearchResults|*"),
      template: function() {
        return fastn("div",
          fastn.binding("item.name"),
          fastn("button", "Add Song")
          .on("click", function(event, scope) {
            app.songs.addSong(scope.get("item"))
          })
        )
      }
    }),
    fastn("h2", "Current Songs"),
    fastn("list", {
      items: fastn.binding("currentRoom.songs|*"),
      template: function() {
        return fastn("div",
          fastn.binding("item.name")
        )
      }
    })
  )
}
