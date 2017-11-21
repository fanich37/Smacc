;(function (root, factory) {
	if(typeof define === 'function' && define.amd) {
		define([], factory(root));
	} else if(typeof exports === 'object') {
		module.exports = factory(root);
	} else {
		root.Smacc = factory(root);
	}
})(typeof global !== 'undefined' ? global : window || this.window || this.global, function (root) {
	'use strict';

	window.Smacc = Smacc || {};

	const defaultClassess = {
		smacc: 'smacc',
		content: 'smacc-content',
		contentOpen: 'smacc_open'
	};

	function Smacc(settings) {
		
		if (typeof settings === 'string') {
			if (settings.charAt(0) === '.') {
				this.smacc = document.getElementsByClassName(settings.slice(1))[0];
			} else if (settings.charAt(0) === '#') {
				this.smacc = document.getElementById(settings.slice(1));
			} else {
				throw new Error('Check the selector.');
			}
		}

		init.call(this);
	}

	function init() {
		this.smacc.classList.add(defaultClassess.smacc);
		const defaultSettings = {
			transition: '.3s'
		};
		const content = this.smacc.nextElementSibling;

		content.classList.add(defaultClassess.content);
		content.style.overflow = 'hidden';
		content.style.maxHeight = 0;
		content.style.transition = defaultSettings.transition;
		
		addEvent.call(this);

	}

	function addEvent() {
		
		this.smacc.addEventListener('click', function (e) {
			e.preventDefault();
			e.stopPropagation();
			const contentHeight = this.nextElementSibling.scrollHeight;
			if (this.className.indexOf('_open') > 1) {
				this.classList.remove(defaultClassess.contentOpen);	
				this.nextElementSibling.style.maxHeight = 0;
			}else {
				this.classList.add(defaultClassess.contentOpen);
				this.nextElementSibling.style.maxHeight = `${contentHeight}px`;
			}
		});

	}

	return Smacc;
});