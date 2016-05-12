var markdown = require('ssb-markdown')
var h = require('hyperscript')
var u = require('../util')
//render a message

exports.message_content = function (data, sbot) {
  if(!data.value.content || !data.value.content.text) return

  var root = data.value.content.root
  var re = !root ? null : h('span', 're:',
    u.decorate(exports.message_link, root, function (d, e, v) { return d(e, v, sbot) })
  )

  var content = h('div')
  var d = h('div', re, content)

  var mentions = {}
  if(Array.isArray(data.value.content.mentions))
  data.value.content.mentions.forEach(function (link) {
    if(link.name) mentions["@"+link.name] = link.link
  })

  content.innerHTML =
    markdown.block(data.value.content.text, {toUrl: function (id) {
      return '#'+(mentions[id]?mentions[id]:id)
    }})
  return d
}

exports.message_link = []





