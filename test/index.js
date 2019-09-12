var test = require("tape")
var got = require("got")
var config = require("config")
var createServer = require("../server")

test("create a room", function(t) {
  t.plan(3)

  var server = createServer(config)

  got({
    url: "http://localhost:8080/rooms",
    method: "post",
    json: true,
    body: {
      name: "my Room",
      password: "asdas$222asd"
    }
  }).then(function(result) {
    t.ok(typeof result.body.id === "string")
    delete result.body.id

    t.deepEqual(result.body, {
      name: "my Room"
    })
    server.close()
  })

  t.pass("Great news!")
})

test("get a room by name", function(t) {
  t.plan(2)

  var server = createServer(config)

  got({
    url: "http://localhost:8080/rooms",
    method: "post",
    json: true,
    body: {
      name: "my Room",
      password: "asdas$222asd"
    }
  }).then(function(result) {
    var id = result.body.id

    got({
      url: `http://localhost:8080/rooms/my%20Room`,
      method: "get",
      json: true
    }).then(function(result) {
      t.deepEqual(result.body, {
        id: id,
        name: "my Room"
      })

      server.close()
    })
  })

  t.pass("Great news!")
})


test("add a song to a room", function(t) {
  t.plan(3)

  var server = createServer(config)

  got({
    url: "http://localhost:8080/rooms/my%20Room/songs/my%20Song",
    method: "post",
    json: true,
    body: {
      name: "my Song",
      duration: 300,
      roomName: "my Room",
      spotifyID: "0123123",
    }
  }).then(function(result) {
    t.ok(typeof result.body.id === "string")
    delete result.body.id

    t.deepEqual(result.body, {
      name: "my Song",
      duration: 300,
      roomName: "my Room",
      spotifyID: "0123123"
    })

    server.close()
  })

  t.pass("Great news!")
})


test("get all songs in a room", async function(t) {
  t.plan(2)

  var server = createServer(config)

  await got({
    url: "http://localhost:8080/rooms/my%20Room/songs/my%20Song",
    method: "post",
    json: true,
    body: {
      name: "my Song1",
      roomName: "my Room",
      duration: 300,
      spotifyID: 123123
    }
  })

  await got({
    url: "http://localhost:8080/rooms/my%20Room/songs/my%20Song2",
    method: "post",
    json: true,
    body: {
      name: "my Song2",
      roomName: "my Room",
      duration: 300,
      spotifyID: 321321
    }
  })

  var result = await got({
    url: "http://localhost:8080/rooms/my%20Room/songs",
    method: "get",
    json: true,
  })

  var betterResult = result.body.map(function(item) {
    return {
      ...item,
      id: undefined
    }
  })

  t.deepEqual(betterResult, [
    {
      name: 'my Song1',
      duration: 300,
      roomName: 'my Room',
      spotifyID: 123123,
      id: undefined
    },
    {
      name: 'my Song2',
      duration: 300,
      roomName: 'my Room',
      spotifyID: 321321,
      id: undefined
    }
  ])

  server.close()

  t.pass("Great news!")
})

test("get spotify songs by name", function(t) {
  t.plan(2)

  var server = createServer(config)

  got({
    url: "http://localhost:8080/spotify/my%20Song1",
    method: "get",
    json: true
  }).then(function(result) {
    t.deepEqual(result.body, [
      {
        name: 'my Song1',
        duration: 300,
        id: 1
      },
      {
        name: 'my Song1',
        duration: 320,
        id: 2
      }
    ])

    server.close()
  })

  t.pass("Great news!")
})
