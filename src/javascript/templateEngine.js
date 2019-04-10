var Wrapper = function(code, options) {
  let wrapper = '';
  Object.keys(options).forEach(key => {
    wrapper += `var ${key} = this['${key}'];\n`;
  });
  wrapper += code;
  return new Function(wrapper.replace(/[\r\t\n]/g, '')).apply(options);
};

var TemplateEngine = function(html, options = {}) {
  var re = /<%([^%>]+)?%>/g,
    reExp = /(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g,
    code = 'var __command=[];\n',
    cursor = 0,
    match;
  var add = function(line, js) {
    js
      ? (code += line.match(reExp) ? line + '\n' : '__command.push(' + line + ');\n')
      : (code += line != '' ? '__command.push("' + line.replace(/"/g, '\\"') + '");\n' : '');
    return add;
  };
  while ((match = re.exec(html))) {
    add(html.slice(cursor, match.index))(match[1], true);
    cursor = match.index + match[0].length;
  }
  add(html.substr(cursor, html.length - cursor));
  code += 'return __command.join("");';
  return Wrapper(code, options);
};
