module.exports = function(config) {
  var tables = {
    rooms: [],
    roomSongs: [],
    spotifySongs: [
      {
        name: 'my Song1',
        duration: 300,
        id: "1"
      },
      {
        name: 'my Song1',
        duration: 320,
        id: "2"
      },
      {
        name: 'my Song3',
        duration: 280,
        id: "3"
      },
      {
        name: 'my Song4',
        duration: 250,
        id: "4"
      },
      {
        name: 'my Song5',
        duration: 310,
        id: "5"
      }
    ]
  }

  function create(tableName, row, callback) {
    row.id = parseInt(Math.random()*1e12).toString().padStart(12, '0')
    tables[tableName].push(row)

    callback(null, row)
  }

  function get(tableName, id, callback) {
    callback(null, tables[tableName].find(row => row.id === id))
  }

  var queryComparators = {
    "=": (item, value) => item === value,
    "<": (item, value) => item < value,
    ">": (item, value) => item > value,
    "<=": (item, value) => item <= value,
    ">=": (item, value) => item >= value,
    "!=": (item, value) => item !== value
  }

  function query(tableName, queryDefinition, callback) {
    // console.log(queryDefinition)
    // console.log(tables)
    var results = queryDefinition.reduce(function(result, step) {
      return result.filter(row => queryComparators[step[1]](row[step[0]], step[2]))
    }, tables[tableName])
    // console.log(results)
    callback(null, results)
  }

  return {
    create: create,
    get: get,
    query: query
  }
}
