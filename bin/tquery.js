#!/usr/bin/env node

var argv	= process.argv.slice(2);
if( argv[0] === 'init' ){
	var dstDir	= process.cwd();
	doInit(dstDir, function(){
		console.log('tQuery project initialized at', dstDir)
	});
}else if( argv[0] === 'install' ){
	var pluginName	= argv[1];
	var tqueryPath	= argv[2]	|| process.env['TQUERYPATH'];
	if( !tqueryPath ){
		console.log('tquerypath MUST be specified')
		process.exit();
	}
	doInstall(tqueryPath, pluginName, function(pluginPath){
		console.log('plugins', pluginName, 'installed in', pluginPath);
	});
}else if( argv[0] === 'help' || argv[0] === '-h' || argv[0] === '--h' ||  argv[0] === undefined ){
	console.log('tquerytool: command line tool for tquery.js - http://jeromeetienne.github.com/tquery/')
	console.log('')
	console.log('\ttquery help\t: display the inline help.')
	console.log('\ttquery init\t: copy a tquery boilerplate in the current directory.')
	console.log('\ttquery install\t: "aPlugin tqueryPath" install a plugin')
	console.log('\t\t', "export TQUERYPATH=~/path/to/your/tquerycopy")
	console.log()
}else{
	console.warn('unknown command:', argv[0])
}

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

function doInstall(tqueryDir, pluginName, onSuccess){
	var srcPath	= require('path').join(tqueryDir, 'plugins', pluginName)
	var dstPath	= require('path').join('vendor/tquery', pluginName)
	var cmdline	= "cp -a "+escapeshell(srcPath)+" "+escapeshell(dstPath);
	console.log('execute', cmdline)

	require('child_process').exec(cmdline, function (error, stdout, stderr) {
		// handle error
		if( error !== null ){
			console.log('exec error:', cmdline, ':', error);
			return;
		}
		// notify caller
		onSuccess && onSuccess(dstPath);
	});
	
	function escapeshell( cmd ){
		return '"'+cmd.replace(/(["\s'$`\\])/g,'\\$1')+'"';
	};
}

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

function doInit(dstDir, onSuccess){
	var srcDir	= __dirname + '/initFiles';
	// make directories
	['vendor', 'vendor/tquery'].forEach(function(dirname){
		var dirPath	= require('path').join(dstDir, dirname)
		require('fs').mkdirSync( dirPath );
	})
	// copy files
	var files2Copy	= ['index.html', 'Makefile', 'README.md'];
	files2Copy.push('vendor/tquery/tquery-bundle.js')
	files2Copy.forEach(function(filename){
		var srcPath	= require('path').join(srcDir, filename)
		var dstPath	= require('path').join(dstDir, filename)
		copyFile(srcPath, dstPath);	
	})
	// notify the caller
	onSuccess	&& onSuccess();

	// download tquery-bundle.js from the internet 
	// - why not local ? to get the lastest ?
	// - isnt that premature ?
	// var url		= 'https://raw.github.com/jeromeetienne/tquery/master/build/tquery-bundle.js';
	// downloadFile(url, path.join(srcDir,'vendor/tquery/tquery-bundle.js'), function(){
	// 	onSuccess && onSuccess();	
	// })
	
	return;
	
	function copyFile(srcFname, dstFname){
		var content	= require('fs').readFileSync(srcFname, 'utf8');
		require('fs').writeFileSync(dstFname, content, 'utf8');
	}
	function downloadFile(srcUrl, dstFname, onSuccess){
		var options	= require('url').parse(srcUrl);
		require('https').get(options, function(res){
			var outStream	= require('fs').createWriteStream(srcUrl, [options])
			res.on('data', function(buffer){
				outStream.write(buffer);
			}).on('end', function(){
				//console.log('file downloaded')
				onSuccess && onSuccess()
			});
		});
	}
}

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

function build(){
	var filename	= 'planets.html';

	console.log('getting main.js from', filename)
	var mainjsStr	= getMainjsFromHtml(filename)
	require('fs').writeFileSync('main-dev.js', mainjsStr, 'utf8');

	// compile main-prod.js from main-dev.js using r.js
	console.log('compiling main.js')
	var cmdline	= "r.js -o name=main-dev out=main-prod.js baseUrl=. mainConfigFile='main-dev.js'"
	require('child_process').exec(cmdline, function(error, stdout, stderr){
		console.log('stdout: ' + stdout);
		console.log('stderr: ' + stderr);
		if( error !== null ){
			console.log('exec error: ' + error);
		}

		console.log('generating index-prodplus.html')
		buildProdPlus('main-prod.js', 'index-prodplus.html');
	});	
}


//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

function buildProdPlus(mainjsFname, htmlFname){
	var output	= '';
	output		+= "<!doctype html>\n"
	output		+= "<body><script>\n"
	output		+= require('fs').readFileSync('../require.js', 'utf8');
	output		+= require('fs').readFileSync(mainjsFname, 'utf8');
	output		+= "</script></body>\n"
	require('fs').writeFileSync(htmlFname, output, 'utf8');
}


/**
 * Extract main.js from a typycal html - works based on assumptions on my own coding style
*/
function getMainjsFromHtml(filename){
	var text	= require('fs').readFileSync(filename, 'utf8');
	var lines	= text.split('\n');
	// skip all up to <script>$ included	
	for(var i = 0; i < lines.length; i++ ){
		var matches	= lines[i].match(/<script>[ \t]*$/);	
		if( matches )	break;
	}
	for(; i >= 0; i--)	lines.shift()
	// skip all after ^</script> included	
	for(var i = lines.length-1; i >= 0; i-- ){
		var matches	= lines[i].match(/^[ \t]*<\/script>[ \t]*$/);	
		if( matches )	break;
	}
	for(var i = lines.length-1 - i; i >= 0; i-- )	lines.pop();
	// return result
	return lines.join('\n');
}
