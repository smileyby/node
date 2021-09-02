const user = {
  name: '<script>'
}

const result = `<h2>${user.name}</h2>`;
const vm = require('vm');

const templateMap = {
  templateA: '`<h2>${include("templateB")}</h2>`',
  templateB: '<p>hahahahahah</p>'
}

const context = { 
  user,
  include: function(name){
    return templateMap[name]()
  },
  helper: function(){},
  _: function(markup){
    if (!markup) return '';
    return String(markup)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/'/g, '&#39;')
      .replace(/"/g, '&quot;')
  } 
}

console.log(vm.runInNewContext('`<h2>${_(user.name)}</h2>`', context))