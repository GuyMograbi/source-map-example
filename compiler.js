var fs = require('fs')
var mappingsAreInline = true
var content = fs.readFileSync('./main.txt').toString();
var compiledLines = content.split('\n').map((line) => {
    return `console.log('${line}');\n`
})

// generate inline sourcemap
var inlineGenerator = require('inline-source-map')();
var inlineMappings = [1,2,3,4,5,6].map((index)=>{
    return {original: {line: index, column:1}, generated: {line:index, column:1}}
})

inlineGenerator.addMappings('main.txt',inlineMappings)
var inlineMappingsUrl = inlineGenerator.inlineMappingUrl()

if ( mappingsAreInline ){
    compiledLines.push(inlineMappingsUrl)
}else {
    compiledLines.push('//# sourceMappingURL=main.map.js')
}
fs.writeFileSync('./main.js', '\n' +  compiledLines.join(''))

// {"version":3,"sources":["main.js"],"names":["console","log"],"mappings":"AAAAA,QAAQC,IAAI,QACZD,SAAQC,IAAI,QACZD,SAAQC,IAAI,OACZD,SAAQC,IAAI,KACZD,SAAQC,IAAI,KACZD,SAAQC,IAAI","file":"main.min.js"}
// now lets build the source maps


// file: is the output file I generate
var sourceMap = require('source-map')
var SourceMapGenerator = sourceMap.SourceMapGenerator
var gen = new SourceMapGenerator({file:'main.js'});
[1,2,3,4,5,6].forEach(function(index){
    gen.addMapping({
        source:'main.txt',
        generated: { line: index, column: 1}, original: { line: index, column:1}, names: ['console','log']
    })
})



fs.writeFileSync('main.map.js',gen.toString())
console.log(gen.toString())


