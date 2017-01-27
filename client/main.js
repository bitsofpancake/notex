// Run `npm run compile` to recompile

const ReactDOM = require('react-dom');
const NotexReact = require('../notex-react.js');

window.render = function render(doc) {
	// If we're already at the bottom, scroll to the bottom.
	// Possibly non-cross-browser!
	var atBottom = window.scrollY + document.documentElement.clientHeight === document.documentElement.scrollHeight;

	ReactDOM.render(NotexReact.render(doc), document.getElementById('main'), function () {
		if (atBottom)
			window.scrollTo(0, document.documentElement.scrollHeight);
	});
	
	const h1 = document.querySelector('.h1 > .inline');
	document.title = h1 ? h1.innerText : 'Untitled';
}

const socket = new WebSocket('ws://' + location.host);
socket.onmessage = function (event) {
	render(JSON.parse(event.data));
};
